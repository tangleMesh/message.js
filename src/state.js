const Mode = require ('./mode');
const Mam = require ('@iota/mam');
const { isTrytes } = require ('@iota/validators')
const { asciiToTrytes } = require('@iota/converter');

module.exports = class State {

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

    get MamState () {
        return {
            subscribed: this.Subscribed,
            channel: this.Channel,
            seed: this.Seed,
        };
    }

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

    get Subscribed () {
        //We do not use this propoerty like in the bibliothek from iota, because we therefore use also the channel-properties. In our library only one channel/stream can be used either for publishing or receiving, but not for receiving multiple channels!
        return [];
    }

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


    get Seed () {
        return this._seed;
    }

    set Seed (value) {
        this._seed = value;
    }

    get Root () {
        if (this._root === null) {
            this._root = Mam.getRoot (this.MamState);
        }
        return this._root;
    }

    set Root (value) {
        this._root = value;
    }

    get NextRoot () {
        return this._nextRoot;
    }

    set NextRoot (value) {
        this._nextRoot = value;
    }


    get Security () {
        return this._security;
    }

    set Security (value) {
        this._security = value;
    }


    get Mode () {
        return this._mode;
    }

    set Mode (value) {
        this._mode = value;
    }


    get SideKey () {
        return this._sideKey;
    }

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


    get Start () {
        return this._start;
    }

    set Start (value) {
        this._start = value;
    }


    get Index () {
        return this._index;
    }

    set Index (value) {
        this._index = value;
    }


    get Count () {
        return this._count;
    }

    set Count (value) {
        this._count = value;
    }


    get NextCount () {
        return this._nextCount;
    }

    set NextCount (value) {
        this._nextCount = value;
    }


    get Timeout () {
        return this._timeout;
    }

    set Timeout (value) {
        this._timeout = value;
    }

}