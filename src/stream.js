const Mam = require('@iota/mam');

const Mode = require ('./mode');
const State = require ('./state');
const Message = require ('./message');

/** 
 * Class representing the actual state of a stream 
 * @class
*/
class Stream {

    /**
     * Creates a new ListenerStream for reading new MAM messages
     * @async
     * @param {Provider} messageProvider - the url to a fullnode the messages should get attatched to
     * @param {string} root - the index root of the stream
     * @param {string} mode - the mode of the stream
     * @param {int} security - the security level of the stream
     * @param {string|null} sideKey - the optional sideKey for encrypting and decrypting messages
     * @type {Stream} the created listener stream
     */
    static async createListenerStream (messageProvider, root, mode = Mode.PUBLIC, security = 2, sideKey = null) {
        const stream = new Stream (messageProvider, null, mode, security, sideKey);
        stream.State.Root = root;
        await stream.init ();
        return stream;
    }

    /**
     * Creates a new PublisherStream for sending and reading new MAM messages
     * @async
     * @param {Provider} messageProvider - the url to a fullnode the messages should get attatched to
     * @param {string} seed - the seed of the stream
     * @param {string} mode - the mode of the stream
     * @param {int} security - the security level of the stream
     * @param {string|null} sideKey - the optional sideKey for encrypting and decrypting messages
     * @type {Stream} the created publisher stream
     */
    static async createPublisherStream (messageProvider, seed, mode = Mode.PUBLIC, security = 2, sideKey = null) {
        const stream = new Stream (messageProvider, seed, mode, security, sideKey);
        await stream.Provider.createStream (stream);
        await stream.init ();
        return stream;
    }

    /**
     * Initializes a already existing Stream for sending and reading new MAM messages
     * @async
     * @param {Provider} messageProvider - the url to a fullnode the messages should get attatched to
     * @param {string} seed - the seed of the stream
     * @param {string} mode - the mode of the stream
     * @param {int} security - the security level of the stream
     * @param {string|null} sideKey - the optional sideKey for encrypting and decrypting messages
     * @type {Stream} the initialized publisher stream
     */
    static async initializePublisherStream (messageProvider, seed, mode = Mode.PUBLIC, security = 2, sideKey = null) {
        const stream = new Stream (messageProvider, seed, mode, security, sideKey);
        await stream.init ();
        return stream;
    }

    /**
     * Creates a new stream object
     * @constructor
     * @param {Provider} messageProvider - the url to a fullnode the messages should get attatched to
     * @param {string} seed - the seed of the stream
     * @param {string} mode - the mode of the stream
     * @param {int} security - the security level of the stream
     * @param {string|null} sideKey - the optional sideKey for encrypting and decrypting messages
     * @type {Stream} the created stream object without updated stream
     */
    constructor (messageProvider, seed = null, mode = Mode.PUBLIC, security = 2, sideKey = null) { 
        this._provider = messageProvider;
        //Create new empty state
        this._state = new State ();
        this._state.MamState = Mam.init ({
            provider: this._provider.Provider,
            attachToTangle: this._provider.AttatchToTangle === null ? undefined : this._provider.AttatchToTangle,
        }, seed, security);
        
        //instead of calling Mam.changeMode, we set the parameters directy in the state object
        this._state.SideKey = sideKey;
        this._state.Mode = mode;
        // this._state.MamState = Mam.changeMode (this._state.MamState, mode, sideKey === null ? undefined : this._state.SideKey);
    }

    /**
     * Initializing the latest MAM-State of the stream
     * @async
     */
    async init () {
        //Update the mamState and everything
        await this.Provider.updateState (this);
    }

    //Get the mode, if this stream is only a receiving stream or if this stream can also send messages
    /**
     * @type {boolean} returns if this stream can also publish messages
     */
    get isPublisher () {
        return this.State.Seed !== null && this.State.Root !== null;
    }

    /**
     * @type {Provider} returns the actual provider of this stream
     */
    get Provider () {
        return this._provider;
    }

    /**
     * @type {State} returns the current state of this stream
     */
    get State () {
        return this._state;
    }

    /**
     * @param {State} state - sets the state of this stream
     */
    set State (state) {
        this._state = state;
    }

    /**
     * Fetch messages from the tangle or a storage provider
     * @async
     * @param {Object} filters - the filters that should be applied for fetching MAM messages
     * @param {string|null} filters.fromRoot - the root since which the messages should be fetched from
     * @param {int|null} filters.start - start value for pagination, skip `start` messages
     * @param {int|null} filters.limit - the maximum number of messages that should get fetched
     * @param {string|null} filters.type - the type of the messages that should get fetched
     * @param {string|null} filters.orderByDate - the ordering of the messages `asc` (ascending) or `desc` (descending)
     * @type {Message[]} the fetched messages 
     */
    async fetchMessages (filters = {}) {
        const messages = await this.Provider.fetchMessages (this, filters);
        return messages;
    }

    /**
     * Send message objects to the tangle
     * @async
     * @param  {...Message} messages - the message objects that should get published
     * @type {Message[]} the published messages
     */
    async sendMessages (...messages) {
        if (!this.isPublisher) {
            throw new Error ("@tanglemesh/message.js/stream.js: You can't send any messages on a listener-stream!");
        }
        const publishedMessages = await this.Provider.publishMessages (this, ...messages);
        return publishedMessages;
    }

    /**
     * Delete the stream and notify all listeners
     * @async
     */
    async deleteStream () {
        if (!this.isPublisher) {
            throw new Error ("@tanglemesh/message.js/stream.js: You can't delete a listener-stream!");
        }
        const deletionMessages = await this.sendMessages (
            Message.createMessage (
                this,
                {
                    message: "deleted stream",
                },
                Message.TYPE_DELETION
            ),
        );
        return deletionMessages [0];
    }

    /**
     * Subscribe to a stream to get notified when new messages arrives
     * @param {function} callback - the method which should be called, when a new message arrives. Takes the message as argument 
     * @param {string|null} fromRoot - the root since which messages should get subscribed
     * @param {int|null} timeout - the timeout of the interval the messages should get fetched
     */
    subscribe (
        callback = (message = null) => message, 
        fromRoot = null,
        timeout = null
    ) {
        if (fromRoot === null) {
            fromRoot = this.State.NextRoot;
        }
        //use the timeout from the state object (default: 5000ms)
        setTimeout (async () => {
            //Fetch all new messages (without any filters, but all)
            const messages = await this.fetchMessages ({
                fromRoot,
            });
            for (const message of messages) {
                callback (message);
            }
            if (messages.length >= 1) {
                fromRoot = this.State.NextRoot;
            }
            return this.subscribe (callback, fromRoot, timeout);
        }, timeout === null ? this.State.Timeout : timeout);
    }

};

module.exports = Stream;
