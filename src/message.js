const LZString = require ('lz-string');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

/**
 * Class representing the a MAM message
 * @class
 */
class Message {

    /**
     * @type {string} the message type for Deletion
     */
    static get TYPE_DELETION () {
        return "deletion";
    }

    /**
     * @type {string} the message type for Promotional
     */
    static get TYPE_PROMOTIONAL () {
        return "promotional";
    }

    /**
     * @type {string} the message type for Transactional
     */
    static get TYPE_TRANSACTIONAL () {
        return "transactional";
    }

    constructor (messageStream, trytes) {
        this._messageStream = messageStream;
        this._trytes = trytes;
        this._transactions = [];
    }


    /**
     * Create a new MAM message
     * @async
     * @param {Stream} messageStream - the stream this message should get published in or fetched from
     * @param {string|int|Object|Array} message - the actual content that should get published
     * @param {string} type - the type of this message
     * @param {string|null} publisher - the publisher of this message
     * @type {Message} the created message
     */
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

    

    
    /**
     * @type {string} the message as trytes string
     */
    get Trytes () {
        return this._trytes;
    }

    /**
     * @type {Object} the raw message object
     */
    get Raw () {
        return Message._decodeMessage (this._trytes);
    }

    /**
     * @type {string|int|Object|Array} the actual content of the message
     */
    get Message () {
        return this.Raw.message;
    }

    /**
     * @type {Array} all transactions if this message is already attatched to the tangle
     */
    get Transactions () {
        return this._transactions;
    }

    set Transactions (transactions) {
        this._transactions = transactions;
    }

    /**
     * @type {string} the type of this message
     */
    get Type () {
        return this.Raw.type;
    }

    /**
     * @type {string} the publisher of this message
     */
    get Publisher () {
        return this.Raw.publisher;
    }

    /**
     * @type {Date} the timestamp of this message
     */
    get Timestamp () {
        return new Date (this.Raw.timestamp);
    }

};

module.exports = Message;
