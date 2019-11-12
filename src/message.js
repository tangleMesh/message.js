const { ApiAuthentificator, ApiClient } = require ("@tanglemesh/api-client.js");
const MAM = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

module.exports = class Message {

    constructor (apiAuthentificator) {
        if (!(apiAuthentificator instanceof ApiAuthentificator)) {
            throw new Error ("Message.js: The apiAuthentificator must be a valid instance of ApiAuthentificator from package \"@tanglemesh/api-client.js\"!");
        }
        this.apiClient = new ApiClient ({
            apiAuthentificator: apiAuthentificator,
        });
        this.state = null;
        this._root = null;
    }

    set State (state) {
        this.state = state;
    }

    get State () {
        return this.state;
    }

    get Root () {
        return this._root;
    }

    get ActualRoot () {
        return MAM.getRoot (this.State);
    }

    get Mode () {
        return this.State.channel.mode;
    }

    get _SideKey () {
        this.State.channel.side_key;
    }

    _changeMode (mode, sideKey) {
        this.State = MAM.changeMode (this.State, mode, sideKey);
    }

    _initMamClient (seed, provider = "https://node-iota.org:14267", security = 2) {
        this.State = MAM.init({
            provider,
        }, seed, security);
        this._root = this.ActualRoot;
    }


    async test () {
        
        this._initMamClient ("AVL9DDMRFQFOJLLTSAP9CUGHWSDAHCQF9AWBCEOXXXOWZXSBFXBYOL99LJLIMPYATEKAPJXKZMPTBZVSP");
        this._changeMode ("public");

        await this._sendMessage ("TEST", "TESTTAG");
        await this._fetchMessages ();

    }

    async _sendMessage (message, tag) {

        const mamMessage = MAM.create(this.State, asciiToTrytes (message));
        //mamMessage = {state, payload, root, address};
        this.State = mamMessage.state;

        console.log ("mamMessage", mamMessage);


        const transactionObjects = await MAM.attach(
            mamMessage.payload, 
            mamMessage.address, 
            3, // depth
            14, // minWeightMagnitude, 
            asciiToTrytes (tag).substr (0, 27)
        );
        console.log ("transactionObjects", transactionObjects, mamMessage.address, mamMessage.root, this.Root, this.State);

        await this._fetchMessages (mamMessage.root);

    }

    async _fetchMessages (limit = 100) {
        setTimeout (async () => {
            let mamMessages = await MAM.fetch(this.Root, this.Mode, this._SideKey, null, limit);
            mamMessages.decodedMessages = [];
            console.log (mamMessages);

            for (const mamMessage of mamMessages.messages) {
                mamMessages.decodedMessages.push (trytesToAscii (mamMessage));
            }

            console.log (mamMessages);

        }, 15000);
    }

    _decodeMessage () {
        const mamMessage = MAM.decode(payload, sideKey, root);
        //mamMessage = {state, payload, root};
        this.State = mamMessage.state;
    }
    

}