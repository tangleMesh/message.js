const packageJson = require ('../../package.json');

module.exports = class Provider {

    constructor (provider, publisher = null, attatchToTangle = null) {
        this._provider = provider;
        this._attatchToTangle = attatchToTangle;
        this._publisher = publisher === null ? packageJson.name : publisher;
    }

    async createStream (messageStream) {
        //DO something…
    }

    async updateState (messageStream) {
        let state = messageStream.State;

        //Must be implemented by the provider

        messageStream.State = state;
    }

    async publishMessages (messageStream, ...messages) {
        let state = messageStream.State;

        //Must be implemented by the provider

        messageStream.State = state;
        return messages;
    }

    async fetchMessages (messageStream, filters = {}) {
        let state = messageStream.State;

        //Must be implemented by the provider
        let messages = [];

        messageStream.State = state;
        return messages;
    }


    get AttatchToTangle () {
        return this._attatchToTangle;
    }

    get Provider () {
        return this._provider;
    }

    get Publisher () {
        return this._publisher;
    }



};