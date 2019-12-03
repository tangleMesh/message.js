const { TMProvider, Stream, Message, IOTAProvider } = require ("../index");
const { ApiAuthentificator } = require ("@tanglemesh/api-client.js");

(async () => {
      try {

            // Set credentials for using the tangleMesh:api
            const apiIdentifier = "315F5B4E62DBFA7A2DA57D88FAA016A9",
                  apiSecret = "49535045477F2EBDE0C3D05C1556A3925C5A6A2B93D2255A7DBF6F8EEC96AB1D",
                  channelId = "8ef56408-37fd-4024-bc11-36e00cb9ede3";
            const apiAuth = new ApiAuthentificator (apiIdentifier, apiSecret, "some-test-mam-application");

            // Create message provider
            const provider = new TMProvider ("https://node02.iotatoken.nl:443", apiAuth, channelId);
            // const provider = new IOTAProvider ("https://nodes.thetangle.org:443");

            // Create the message stream
            const seed = "BBBBOK9TYGDOBSAKRCGMDSDFVHOQXMM9HWLQZPHYAZBIPDMZWPXJLSRQDSPWULQGAWQWQFEQQ9CI9XAY9";
            const stream = await Stream.createPublisherStream (provider, seed);



            // You can also get automatically noticed, when a new message arrives through the tangle. Therefore you only need to use the `stream.subscribe` method.
            // As a first parameter this method simply takes a callback, which will be called for each new message that arrives. The messages will arrive in the same order they get published, because of the nature of MAM messaging.
            // This method only takes one argument, with the specific message that arrived.

            const callback = (message) => {
                  //Simply log each new message that arrives
                  console.log ("STREAM", message.Message, message.Type, message.Publisher, message.Timestamp);
            };

            // After setting up you callback method, you only need to subscribe to the stream you want to receive new messages from.
            // You can add as many subscriptions to the stream you want, if you need to process each message differently.

            stream.subscribe (callback);

      } catch (e) {
            console.error ("ERROR", e);
      }
})();