//Import all the modules for computing
const Mode = require ("./src/mode");
const State = require ("./src/state");
const Message = require ("./src/message");
const Stream = require ("./src/stream");

const Provider = require ("./src/providers/provider");
const IOTAProvider = require ("./src/providers/IOTA.provider");
const TMProvider = require ("./src/providers/TM.provider");

//Export all the public modules added to the Methods in README.md
module.exports = {
    Mode,
    State,
    Message,
    Stream,

    Provider,
    IOTAProvider,
    TMProvider,
};