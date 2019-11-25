const Provider = require ('./provider');
const IOTAProvider = require ('./IOTA.provider');
const { ApiAuthentificator, ApiClient } = require ("@tanglemesh/api-client.js");

module.exports = class TMProvider extends Provider {

    constructor (provider, apiAuthentificator, attatchToTangle = null) {
        super (provider, apiAuthentificator.applicationName, attatchToTangle);
        this._iotaProvider = new IOTAProvider (provider, apiAuthentificator.applicationName, attatchToTangle);

        if (!(apiAuthentificator instanceof ApiAuthentificator)) {
            throw new Error ("Message.js: The apiAuthentificator must be a valid instance of ApiAuthentificator from package \"@tanglemesh/api-client.js\"!");
        }
        
        this.apiClient = new ApiClient ({
            apiAuthentificator: apiAuthentificator,
        });
    }

    async createStream (messageStream) {
        //Make request to the tangleMesh:api and create a channel
    }

    async updateState (messageStream) {
        let state = messageStream.State;

        //Must be implemented by the provider
        // state = //request to tangle-mesh-api
        // TODO

        messageStream.State = state;
    }



    async publishMessages (messageStream, ...messages) {
        let state = messageStream.State;

        //Must be implemented by the provider
        this._iotaProvider.publishMessages (...messages);
        //Finish, nothing more, because tangleMesh:api will fetch these messages automatically

        messageStream.State = state;
        return messages;
    }

    async fetchMessages (messageStream, filters = {}) {
        let state = messageStream.State;

        //Must be implemented by the provider
        let messages = [];
        // messages = request to tangle-mesh-api to fetch the correct messages (only transactional, or promotional, …)
        // TODO:

        messageStream.State = state;
        return messages;
    }

};