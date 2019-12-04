const packageJson = require ('../../package.json');

/**
 * Class representing the interface of a Provider
 * @class
 */
class Provider {

    /**
     * Create a new Provider object
     * @constructor
     * @param {string} provider - the url of the fullnode that should handle communication with the tangle
     * @param {string} publisher - the name of the publisher attatched to all messages, where the publisher does not get overwritten
     * @param {function} attatchToTangle - a function outsourcing or overwriting the attatchToTangle method
     * @type {Provider} - the created provider
     */
    constructor (provider, publisher = null, attatchToTangle = null) {
        this._provider = provider;
        this._attatchToTangle = attatchToTangle;
        this._publisher = publisher === null ? packageJson.name : publisher;
    }

    /**
     * Creating a stream or storing the stream details (but never publish the sideKey or seed!)
     * @async
     * @param {Stream} messageStream 
     */
    async createStream (messageStream) {
        //DO something…
    }

    /**
     * Update the state of the stream to it's latest state
     * @async
     * @param {Stream} messageStream - the stream the message should get published to
     */
    async updateState (messageStream) {
        let state = messageStream.State;

        //Must be implemented by the provider

        messageStream.State = state;
    }

    /**
     * Publish one or multiple messages to the tangle
     * @async
     * @param {Stream} messageStream - the stream the message should get published to
     * @param  {...Message} messages - the published messages
     * @type {Message[]} the published messages
     */
    async publishMessages (messageStream, ...messages) {
        let state = messageStream.State;

        //Must be implemented by the provider

        messageStream.State = state;
        return messages;
    }

    /**
     * Fetch messages from the tangle or a permanent storage
     * @async
     * @param {Stream} messageStream
     * @param {Object} filters - the filters that should be applied for fetching MAM messages
     * @param {string|null} filters.fromRoot - the root since which the messages should be fetched from
     * @param {int|null} filters.start - start value for pagination, skip `start` messages
     * @param {int|null} filters.limit - the maximum number of messages that should get fetched
     * @param {string|null} filters.type - the type of the messages that should get fetched
     * @param {string|null} filters.orderByDate - the ordering of the messages `asc` (ascending) or `desc` (descending)
     * @type {Message[]} the fetched messages 
     */
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

module.exports = Provider;