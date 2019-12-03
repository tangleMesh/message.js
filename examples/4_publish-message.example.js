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



            // In tangleMesh/message.js you do only send previously created Messages
            // To create a message you need to provide some parameters which will describe your message sent to the tangle

            // Your message can be a number, string, array or object. (internaly these values will be stringified with `JSON.stringify ()`)

            let content = "string value";
            content = 99.99;
            content = [
                "some",
                "array"
            ];
            content = {
                val: "some easy object",
                key: 45,
            };

            // There are three different message types which can be used to send messages: 
            // Message.TYPE_TRANSACTIONAL (default) - a permanent message that will be stored securely and has a higher priority, so there is a much higher change that you listeners will receive this message and you are able to fetch this message, even after multiple snapshots
            // Message.TYPE_PROMOTIONAL - a temporary message that will be pruned after each snapshot (stays only available on permanodes), there is a high change, that your listeners will receive this message, but it is not guaranteed
            // Message.TYPE_DELETION - this type of message will automatically be sent, when using the `Stream.deleteStream ()`. this message type deletes the stream and notifies all listener, that there will be no messages on this stream anymore.

            const type = Message.TYPE_TRANSACTIONAL;

            // To create a new Message you simply pass your stream, to which you want to publish your message, the content and the type of the message to the `Message.createMessage` method.

            const message = Message.createMessage (
                stream,
                content,
                type
            )

            // Now you can send or multiple messages via the `stream.sendMessages` method. This way, the stream publishes the message(s) to your stream with your selected provider of the stream

            const publishedMessages = await stream.sendMessages (
                  message,
                  // additionalMessage,
                  // additionalMessage,
            );
            console.log ("publishedMessages", publishedMessages);

      } catch (e) {
            console.error ("ERROR", e);
      }
})();