const Mode = require ('./mode');
const Mam = require ('@iota/mam');
const { isTrytes } = require ('@iota/validators')
const { asciiToTrytes } = require('@iota/converter');

/** 
 * Class representing the actual state of a stream 
 * @class
*/
class State {


    /**
     * 
     * @param {string|null} seed - The seed of the state
     * @param {string|null} root - The index root of the stream
     * @param {int} security - the security level of the stream
     * @param {string} mode - the mode of the stream
     * @param {string|null} sideKey - optionally the sideKey for encrypting and decrypting messages
     * @type {State} the created state
     */
    constructor (seed = null, root = null, security = 2, mode = Mode.PUBLIC, sideKey = null) {
        this._seed = seed;
        this._root = root;
        this._security = security;
        this._mode = mode;
        this._sideKey = sideKey === null ? null : asciiToTrytes (sideKey);

        this.start = 0;
        this._index = 0;
        this._count = 1;
        this._nextCount = this._count;
        this._timeout = 5000;
        this._nextRoot = this._root;
    }

    /**
     * @type {object} – the state formatted as mam.client.js compatible object
     */
    get MamState () {
        return {
            subscribed: this.Subscribed,
            channel: this.Channel,
            seed: this.Seed,
        };
    }

    /**
     * @param {object} mamState - the state object returned by the mam.client.js library
     */
    set MamState (mamState) {
        //ignore mamState.subscribed
        
        //set seed
        this.Seed = mamState.seed;

        //set channel
        this.SideKey = mamState.channel.side_key;
        this.Mode = mamState.channel.mode;
        this.NextRoot = mamState.channel.next_root;
        this.Security = mamState.channel.security;
        this.Start = mamState.channel.start;
        this.Count = mamState.channel.count;
        this.NextCount = mamState.channel.next_count;
        this.Index = mamState.channel.index;
    }

    /**
     * @type {array} - subscribed channels (not used in this implementation)
     */
    get Subscribed () {
        //We do not use this propoerty like in the bibliothek from iota, because we therefore use also the channel-properties. In our library only one channel/stream can be used either for publishing or receiving, but not for receiving multiple channels!
        return [];
    }

    /**
     * @type {object} Channel - the channel object of this state
     */
    get Channel () {
        return {
            side_key: this.SideKey,
            mode: this.Mode,
            next_root: this.NextRoot,
            security: this.Security,
            start: this.Start,
            count: this.Count,
            next_count: this.NextCount,
            index: this.Index, 
        };
    }


    /**
     * @type {string} the seed used in this state
     */
    get Seed () {
        return this._seed;
    }

    /**
     * @param {string} value - set the seed that should be used with this state 
     */
    set Seed (value) {
        this._seed = value;
    }

    /**
     * @type {string} the index root of this state
     */
    get Root () {
        if (this._root === null) {
            this._root = Mam.getRoot (this.MamState);
        }
        return this._root;
    }

    /**
     * @param {string} value - set the index root of this state
     */
    set Root (value) {
        this._root = value;
    }

    /**
     * @type {string} the next root used for attatching new messages
     */
    get NextRoot () {
        return this._nextRoot;
    }

    /**
     * @param {string} value - set the next root used for attatching new messages
     */
    set NextRoot (value) {
        this._nextRoot = value;
    }

    /**
     * @type {int} the security level of this tate
     */
    get Security () {
        return this._security;
    }

    /**
     * @param {int} value - set the security level of this state
     */
    set Security (value) {
        this._security = value;
    }


    /**
     * @type {string} the mode of this state
     */
    get Mode () {
        return this._mode;
    }

    /**
     * @param {string} value set the mode of this state
     */
    set Mode (value) {
        this._mode = value;
    }


    /**
     * @type {string|null} the optional sideKey for encrypting or decrypting messages
     */
    get SideKey () {
        return this._sideKey;
    }

    /**
     * @param {string|null} value - set the optional sideKey for encrypting or decrypting messages
     */
    set SideKey (value) {
        if (value !== null) {
            if (!isTrytes (value, 81)) {
                this._sideKey = asciiToTrytes (value.replace(/9+$/gi, '')).padEnd (81, '9');
            } else {
                this._sideKey = value.substr (0, 81);
            }
        } else {
            this._sideKey = null;
        }
    }


    /**
     * @type {int} the start of this state
     */
    get Start () {
        return this._start;
    }

    /**
     * @param {int} value set the start of this state
     */
    set Start (value) {
        this._start = value;
    }


    /**
     * @type {int} the index of this state
     */
    get Index () {
        return this._index;
    }

    /**
     * @param {int} value set the index of this state
     */
    set Index (value) {
        this._index = value;
    }


    /**
     * @type {int} the count of this state
     */
    get Count () {
        return this._count;
    }

    /**
     * @param {int} value set the count of this state
     */
    set Count (value) {
        this._count = value;
    }


    /**
     * @type {int} the nextCount of this state
     */
    get NextCount () {
        return this._nextCount;
    }

    /**
     * @param {int} value set the nextCount of this state
     */
    set NextCount (value) {
        this._nextCount = value;
    }


    /**
     * @type {int} the timeout of this state
     */
    get Timeout () {
        return this._timeout;
    }

    /**
     * @param {int} value set the timeout of this state
     */
    set Timeout (value) {
        this._timeout = value;
    }

}

module.exports = State;