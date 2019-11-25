const Mam = require('@iota/mam');

const Mode = require ('./mode');
const State = require ('./state');
const Message = require ('./message');

module.exports = class Stream {

    static async createListenerStream (messageProvider, root, mode = Mode.PUBLIC, security = 2, sideKey = null) {
        const stream = new Stream (messageProvider, null, mode, security, sideKey);
        stream.State.Root = root;
        await stream.init ();
        return stream;
    }

    static async createPublisherStream (messageProvider, seed, mode = Mode.PUBLIC, security = 2, sideKey = null) {
        const stream = new Stream (messageProvider, seed, mode, security, sideKey);
        await stream.Provider.createStream (this);
        await stream.init ();
        return stream;
    }

    static async initializePublisherStream (messageProvider, seed, mode = Mode.PUBLIC, security = 2, sideKey = null) {
        const stream = new Stream (messageProvider, seed, mode, security, sideKey);
        await stream.init ();
        return stream;
    }

    constructor (messageProvider, seed = null, mode = Mode.PUBLIC, security = 2, sideKey = null) { 
        this._provider = messageProvider;
        //Create new empty state
        this._state = new State ();
        this._state.MamState = Mam.init ({
            provider: this._provider.Provider,
            attachToTangle: this._provider.AttatchToTangle === null ? undefined : this._provider.AttatchToTangle,
        }, seed, security);
        this._state.MamState = Mam.changeMode (this._state.MamState, mode, sideKey === null ? undefined : sideKey);
    }

    // Initialize the MAM-State and everything
    async init () {
        //Update the mamState and everything
        await this.Provider.updateState (this);
    }

    //Get the mode, if this stream is only a receiving stream or if this stream can also send messages
    get isPublisher () {
        return this.State.Seed !== null && this.State.Root !== null;
    }

    get Provider () {
        return this._provider;
    }

    get State () {
        return this._state;
    }

    set State (state) {
        this._state = state;
    }

    async fetchMessages (filters = {}) {
        const messages = await this.Provider.fetchMessages (this, filters);
        return messages;
    }

    async sendMessages (...messages) {
        if (!this.isPublisher) {
            throw new Error ("@tanglemesh/message.js/stream.js: You can't send any messages on a listener-stream!");
        }
        const publishedMessages = await this.Provider.publishMessages (this, ...messages);
        return publishedMessages;
    }

    async deleteStream () {
        if (!this.isPublisher) {
            throw new Error ("@tanglemesh/message.js/stream.js: You can't delete a listener-stream!");
        }
        const deletionMessages = await this.sendMessages (
            Message.createMessage (
                this,
                null,
                Message.TYPE_DELETION
            ),
        );
        return deletionMessages [0];
    }

    subscribe (
        callback = (messages = []) => messages, 
        timeout = null
    ) {
        //use the timeout from the state object (default: 5000ms)
        setTimeout (async () => {
            //Fetch all new messages (without any filters, but all)
            const messages = await this.fetchMessages ();
            return callback (messages);
        }, timeout === null ? this.State.Timeout : timeout);
    }

    






};