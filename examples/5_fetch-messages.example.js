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



            // With a created stream you can always fetch new messages that got sent to this stream
            // With our tangleMesh/message.js library you can also fetch some historical messages that were send in the past
            // In order to modify the fetch request, you can simply pass some filters

            let filters = {}; 

            // One possible filter is `fromRoot`. If this parameter is skipped, you simply fetch all new messages published after your actually state.
            // If you want to fetch some older or newer messages, you can set up the root from which you want to receive messages.
            // Note: with the IOTAProvider, it could be possible that old messages got pruned because of a local snapshot of your provider. If you use the TMProvider, you can fetch all historical messages if you need to.

            filters.fromRoot = "IKSWQEKIJGAVPEHCDYWNHQTXVCCQCHHWMLZ9POQRPBXOFWJCLO9CKDKUVVVTVFROHYIGOSSMQ9UNYDPQX";

            // You can also pass the `limit` filter, to limit the messages fetched by the request. If this filter is skipped, you fetch all messages until the newest root.
            // If you pass a number as the limit filter, the next `fetchMessages` call will continue from the latest message fetched before, if no `fromRoot` is given.

            filters.limit = 100;




            // The above two filters are available with the "native" IOTAProvider and the TMProvider. The following filters are only avaliable with our second level solution and the TMProvider.

            // The `start` filter allows you to skip a specific number of messages outgoing from the fromRoot parameter or the latest state. If skipped, this filter will be 0.

            filters.start = 5;

            // With the filter `type` you are able to fetch only messages of a specific type. For example you can fetch only transactional messages (Message.TYPE_TRANSACTIONAL) or promotional messages (Message.TYPE_PROMOTIONAL).
            // If this filter is skipped, you fetch all types of messages.

            filters.type = Message.TYPE_TRANSACTIONAL;

            // You can also modify the order of the messages that get fetched by the filter `orderByDate`. This filter can be "desc" for a descending or "asc" for a ascending order.
            // The default order will be ascending.

            filters.orderByDate = "desc";





            // To finaly fetch the MAM messages, you can simply call the `stream.fetchMessages` method of the stream, you want to fetch messages from.
            
            const fetchedMessages = await stream.fetchMessages (filters);
            console.log ("fetchedMessages", fetchedMessages);
            for (const fetchedMessage of fetchedMessages) {
                // Output each message after another
                console.log (fetchedMessage.Message, fetchedMessage.Type, fetchedMessage.Publisher, fetchedMessage.Timestamp);
            }

      } catch (e) {
            console.error ("ERROR", e);
      }
})();