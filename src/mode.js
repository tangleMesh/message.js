/** 
 * Class representing the different modes of a stream 
 * @class
*/
class Mode {

    /**
     Represents the public mode of a Stream
     */
    static get PUBLIC () {
        return "public";
    }

    /**
     Represents the private mode of a Stream
     */
    static get PRIVATE () {
        return "private";
    }

    /**
     Represents the restricted mode of a Stream
     */
    static get RESTRICTED () {
        return "restricted";
    }

}

module.exports = Mode;