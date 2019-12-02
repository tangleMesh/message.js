const Provider = require ('./provider');
const IOTAProvider = require ('./IOTA.provider');
const Message = require ('../message');
const { ApiAuthentificator, ApiClient } = require ("@tanglemesh/api-client.js");

module.exports = class TMProvider extends Provider {

    constructor (provider, apiAuthentificator, channelId, attatchToTangle = null) {
        super (provider, apiAuthentificator.applicationName, attatchToTangle);
        this._iotaProvider = new IOTAProvider (provider, apiAuthentificator.applicationName, attatchToTangle);
        this._channelId = channelId;

        if (!(apiAuthentificator instanceof ApiAuthentificator)) {
            throw new Error ("Message.js: The apiAuthentificator must be a valid instance of ApiAuthentificator from package \"@tanglemesh/api-client.js\"!");
        }
        
        this._apiClient = new ApiClient ({
            apiAuthentificator: apiAuthentificator,
        });
    }

    async createStream (messageStream) {
        // Make request to the tangleMesh:api and create a channel (which will automatically set up a storage for this message stream/channel)
        const result = await this._apiClient.post (
            "/messages/streams",
            {
                mode: messageStream.State.Mode,
                root: messageStream.State.Root,
                security: messageStream.State.Security,
                sideKey: messageStream.State.SideKey,
                provider: messageStream.Provider.Provider,
            }
        );
        //Validate result, should be okay, if no Error has been thrown ;)
    }

    async updateState (messageStream) {
        //Fetch the latest MessageUpdate of the MessageStream and set the state accordingly (should be free!) from the tangleMesh:api
        const result = await this._apiClient.get (
            "/messages/streams/root/" + messageStream.State.Root
        );
        //this method should return the MessageStream and also the latest MessageUpdate (with the newest State)
        //update messageStream.State with the values
        const messageUpdate = result.messageUpdate;
        messageStream.State.NextRoot = messageUpdate.nextRoot;
        messageStream.State.Start = messageUpdate.start;
        messageStream.State.Count = messageUpdate.count;
        messageStream.State.NextCount = messageUpdate.nextCount;
        messageStream.State.Index = messageUpdate.index;

        return messageStream.State;
    }

    async publishMessages (messageStream, ...messages) {
        let state = messageStream.State;

        //Simply create a message and publish it via the IOTAprovider, because our service will automatically track these messages via a tangleMesh:service
        await this._iotaProvider.publishMessages (messageStream, ...messages); 

        messageStream.State = state;
        return messages;
    }

    async fetchMessages (messageStream, filters = {
        fromRoot: null, // fetch all the messages from this root (but pagination, type and orderByDate does still work in addition with this filter!)
        start: null, // start of pagination
        limit: null, // start of pagination
        type: null, // can be "transactional" or "promotional"
        orderByDate: "desc", // can be "desc" (descending) or "asc" (ascending)
    }) {
        // messages = request to tangleMesh:api to fetch the correct messages (only transactional, or promotional, …)
        // Fetch the messages with the applied filters via the tangleMesh:api. The Benefit is, that you have not to go through the complete stream-tree, but simply fetch the messages you need.
        // Also you do not have only the temporary messages until the next snapshot, but you have all historical data of this stream. (Only a small fee will be applied on reading messages.)
        const result = await this._apiClient.get (
            "messages/root/" + messageStream.State.Root + "/messages",
            {
                channelId: this._channelId,
                start: filters.start ? filters.start : undefined,
                limit: filters.limit ? filters.limit : undefined,
                fromRoot: filters.fromRoot ? filters.fromRoot : undefined,
                orderByDate: filters.orderByDate ? filters.orderByDate : undefined,
                type: filters.type ? filters.type : undefined,
            }
        );

        const messages = [];
        for (const message of result.results) {
            messages.push (
                new Message (messageStream, message.trytes)
            );
        }

        //Update state
        if (messages.length >= 1) {
            messageStream.State.NextRoot = result.results [result.results.length - 1].nextRoot;
            messageStream.State.Start = messageStream.State.Start + messages.length;
        }

        return messages;
    }

};