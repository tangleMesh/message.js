const LZString = require ('lz-string');
const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

module.exports = class Message {

    static get TYPE_DELETION () {
        return "deletion";
    }

    static get TYPE_PROMOTIONAL () {
        return "promotional";
    }

    static get TYPE_TRANSACTIONAL () {
        return "transactional";
    }



    constructor (messageStream, trytes) {
        this._messageStream = messageStream;
        this._trytes = trytes;
        this._transactions = [];
    }



    static createMessage (messageStream, message, type = Message.TYPE_TRANSACTIONAL, publisher = null) {
        // --- Create structure for message
        /*
        Structure of a Mam-Message:
        {
            type: "deletion" | "promotional" | "transactional", 
            publisher: "person",
            timestamp: 172000000,
            message: "" | {} | [] | 0 | 0.0 (String, Number, Object, Array)
        }
        */
        message = {
            type: type,
            publisher: publisher === null ? messageStream.Provider.Publisher : publisher,
            timestamp: Date.now(),
            message,
        };
        return new Message (messageStream, Message._encodeMessage (message));
    }

    static _encodeMessage (message) {
        // --- Prepare message
        //Stringify message
        message = JSON.stringify (message);
        //Compress message
        message = LZString.compressToBase64 (message);
        //Convert message to trytes
        message = asciiToTrytes (message);

        return message;
    }

    static _decodeMessage (trytes) {
        //Convert trytes to message
        trytes = trytesToAscii (trytes);
        //Decompress message
        trytes = LZString.decompressFromBase64 (trytes);
        //Parse message
        trytes = JSON.parse (trytes);

        return trytes;
    }

    

    

    get Trytes () {
        return this._trytes;
    }

    get Raw () {
        return Message._decodeMessage (this._trytes);
    }

    get Message () {
        return this.Raw.message;
    }

    get Transactions () {
        return this._transactions;
    }

    set Transactions (transactions) {
        this._transactions = transactions;
    }

    get Type () {
        return this.Raw.type;
    }

    get Publisher () {
        return this.Raw.publisher;
    }

    get Timestamp () {
        return new Date (this.Raw.timestamp);
    }

};