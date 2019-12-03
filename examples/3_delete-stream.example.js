const { TMProvider, Stream, IOTAProvider } = require ("../index");
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



            // You can not only create streams but also deleted previous generated streams. 
            // When deleting a stream, you close this stream, so you are not able to send new messages to this stream or receiving any messages.
            // Note: Because the previously messages are sent to the tangle, a permanode of iota could keep the old messages and your receivers could fetch messages that are published before the deletion.
            // To delete a stream, you can simply call `stream.deleteStream ()` which will send a deletion message to you stream which will tell you audience, that this stream has been closed and no new messages will be published anymore.

            const deletionMessage = await stream.deleteStream ();
            console.log ("deleteStream", deletionMessage, deletionMessage.Message);

      } catch (e) {
            console.error ("ERROR", e);
      }
})();