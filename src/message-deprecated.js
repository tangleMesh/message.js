const { ApiAuthentificator, ApiClient } = require ("@tanglemesh/api-client.js");
const MAM = require('@iota/mam');
const LZString = require ('lz-string');
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

        // await this._sendMessage ("TEST", "TESTTAG");
        // await this._fetchMessages ();

        // const message = "some test message that has some longer message with this message you can decode and encodesome test message that has some longer message with this message you can decode and encodesome test message that has some longer message with this message you can decode and encode";
        // const encodedMessage = this._encodeMessage (message);

        console.log (message, encodedMessage, message.length, encodedMessage.length);

    }

    async _sendMessage (message, tag) {

        const mamMessage = MAM.create(this.State, this._encodeMessage (message));
        //mamMessage = {state, payload, root, address};
        this.State = mamMessage.state;

        const transactionObjects = await MAM.attach(
            mamMessage.payload, 
            mamMessage.address, 
            3, // depth
            14, // minWeightMagnitude, 
            asciiToTrytes (tag).substr (0, 27)
        );

        await this._fetchMessages (mamMessage.root);

    }

    async _fetchMessages (limit = 100) {
        let mamMessages = await MAM.fetch(this.Root, this.Mode, this._SideKey, null, limit);
        let decodedMessages = [];
    
        for (const mamMessage of mamMessages.messages) {
            decodedMessages.push (this._decodeMessage (mamMessage));
        }

        return decodedMessages;
    }

    _encodeMessage (message) {
        //If message is object => convert to string
        if (typeof message !== "string") {
            message = JSON.stringify (message);
        }

        //Compress string
        message = LZString.compressToBase64 (message);

        //Convert to trytes
        message = asciiToTrytes (message);

        return message;
    }

    _decodeMessage (message) {
        //Decode the message, decrypt if it is encrypted
        const mamMessage = MAM.decode(message, this._SideKey, this.Root);
        //mamMessage = {state, payload, root};
        message = mamMessage.payload;

        //Convert trytes back to ascii
        message = trytesToAscii (message);

        //Decompress string
        message = LZString.decompressFromBase64 (message);

        //Convert back to object, if it is one
        try {
            message = JSON.parse (message);
        } catch (e) {
            //Do nothing, this message simply is a string
        }
        
        this.State = mamMessage.state;
    }
    

}