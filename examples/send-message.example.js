const { TMProvider, Stream, Message, IOTAProvider } = require ("../index");
const { ApiAuthentificator } = require ("@tanglemesh/api-client.js");

(async () => {

      try {

            // Set credentials for using the tangleMesh:api
            // const apiIdentifier = "7DE635ECF529629BA113571D2A288598",
            //       apiSecret = "A4BEF4E7CE564EDD2BD8141F1D6546S567F659DC8F30D9918B2F17C387BD7B60",
            //       channelId = "7458d984-47ea-4ee1-bfbc-e3016a233f35";
            // const apiAuth = new ApiAuthentificator (apiIdentifier, apiSecret);

            // Create message provider
            // const provider = new TMProvider ("https://nodes.thetangle.org:443", apiAuth);
            const provider = new IOTAProvider ("https://nodes.thetangle.org:443");

            //Create the message stream
            // const stream = await Stream.createPublisherStream (provider, "KPIKOK9TYGDOBSAKRCGMDSDFVHOQXMM9HWLQZPHYAZBIPDMZWPXJLSRQDSPWULQGAWQWQFEQQ9CI9XAY9");
            const stream = await Stream.initializePublisherStream (provider, "KPIKOK9TYGDOBSAKRCGMDSDFVHOQXMM9HWLQZPHYAZBIPDMZWPXJLSRQDSPWULQGAWQWQFEQQ9CI9XAY9");

            // Publish Message
            // const message = Message.createMessage (stream, {some: "test", nr: 3}, Message.TYPE_TRANSACTIONAL);
            // const publishedMessages = await stream.sendMessages (
            //       message
            // );
            // console.log ("publishedMessages", publishedMessages);

            //Fetch Messages
            const fetchedMessages = await stream.fetchMessages ({
                  fromRoot: stream.State.Root,
                  limit: 1
            });
            console.log ("fetchedMessages", fetchedMessages);
            for (const fetchedMessage of fetchedMessages) {
                  console.log (fetchedMessage.Message, fetchedMessage.Type, fetchedMessage.Publisher, fetchedMessage.Timestamp);
            }

      } catch (e) {
            console.error ("ERROR", e);
      }

})();