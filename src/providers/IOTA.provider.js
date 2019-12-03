const Provider = require ('./provider');
const Mam = require ('@iota/mam');
const Message = require ('../message');

module.exports = class IOTAProvider extends Provider {

    constructor (provider, publisher = null, attatchToTangle = null, depth = 3, minWeightMagnitude = 14) {
        super (provider, publisher, attatchToTangle);
        this._depth = depth;
        this._minWeightMagnitude = minWeightMagnitude;
    }

    async createStream (messageStream) {
        //Nothing has to be done, because the channel on iota will automatically be created when publishing the first message
    }

    async updateState (messageStream) {
        //Fetch all available messages to get the latest mam-state
        const fetchResult = await Mam.fetch (
            messageStream.State.Root, 
            messageStream.State.Mode, 
            messageStream.State.SideKey === null ? undefined : messageStream.State.SideKey,
        );
        messageStream.State.NextRoot = fetchResult.nextRoot;
        messageStream.State.Start = messageStream.State.Start + fetchResult.messages.length;

        // Return the updated state
        return messageStream.State;
    }

    async publishMessages (messageStream, ...messages) {
        //Set attatchToTangle method
        if (this._attatchToTangle !== null) {
            Mam.setAttachToTangle (this._attatchToTangle);
        }

        //Send the messages to the tangle
        for (const message of messages) {
            const mamMessage = Mam.create (messageStream.State.MamState, message.Trytes);
            // await Mam.attach(payload, address, depth, minWeightMagnitude, tag)
            // => mamMessage.state, mamMessage.payload, mamMessage.root, mamMessage.address
            message.Transactions = await Mam.attach (mamMessage.payload, mamMessage.address, this._depth, this._minWeightMagnitude);
            messageStream.State.MamState = mamMessage.state;
        }

        return messages;
    }

    async fetchMessages (messageStream, filters = {
        fromRoot: null,
        limit: null,
    }) {
        //Set provider if it was set
        if (this._provider !== null) {
            Mam.setIOTA (this._provider);
        }

        //Use the filters to modify the fetch-result
        filters.fromRoot = !filters.fromRoot ? messageStream.State.NextRoot : filters.fromRoot;
        filters.limit = !filters.limit ? undefined : filters.limit;
        
        // await Mam.fetch(root, mode, sidekey, callback, limit)
        // => nextRoot, messages
        const fetchResult = await Mam.fetch (
            filters.fromRoot,  
            messageStream.State.Mode, 
            messageStream.State.SideKey === null ? undefined : messageStream.State.SideKey,
            undefined,
            filters.limit
        );

        //Create the messages
        if (!Array.isArray (fetchResult.messages)) {
            throw new Error ("@tanglemesh/message.js/stream.js: Error fetching the messages of the stream!");
        }

        let messages = [];
        for (const message of fetchResult.messages) {
            messages.push (
                new Message (messageStream, message)
            );
        }

        //Update state
        if (messages.length >= 1) {
            messageStream.State.NextRoot = fetchResult.nextRoot;
            messageStream.State.Start = messageStream.State.Start + messages.length;
        }

        return messages;
    }

};