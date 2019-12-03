const { TMProvider, Stream, IOTAProvider, Mode } = require ("../index");
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


            
            // You can create new message streams with any provider available like explained in ./provider.example.js
            // Before you can use the functionalities of a stream, you have to create one
            // Because this library is just an easy layer above the mam-messaging protocol, you have to initialize a new stream with you own private seed

            const seed = "BBBBOK9TYGDOBSAKRCGMDSDFVHOQXMM9HWLQZPHYAZBIPDMZWPXJLSRQDSPWULQGAWQWQFEQQ9CI9XAY9"; // please always keep your seed secret! (by using the tangleMesh:api your seed will never be sent to our servers!)

            // In MAM messaging there are three different modes for publishing messages: PUBLIC, PRIVATE and RESTRICTED
            // You can read more about these modes in this article: https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e

            const mode = Mode.PUBLIC; // Mode.PRIVATE | Mode.RESTRICTED

            // With the security paramter you can define the security level of your new message stream

            const security = 2;

            // If you use the Mode RESTRICTED, you have to provide also a so called sideKey which is the encryption secret for all you messages
            // With this sideKey, even if someone else can fetch any message of this stream, he is not able to decrypt the content

            const sideKey = null; // should be a valid string, if the mode is set to MODE.RESTRICTED


            //With all the above parameters prepared, you can simply call the asynchronous method `Stream.createPublisherStream`:

            let stream = await Stream.createPublisherStream (
                provider, // your message provider that should be used for all actions made with this stream
                seed,
                mode,
                security,
                sideKey
            );




            // If you have already created a stream with you seed and you need to initialize a stream already created elsewhere, you should use the method `Stream.initializePublisherStream`
            // This method takes the same parameters as the method above, but it does only initialize the stream with the latest state available but does not create a new stream

            stream = await Stream.initializePublisherStream (
                provider, // your message provider that should be used for all actions made with this stream
                seed,
                mode,
                security,
                sideKey
            )




            // With both methods above, you are able to fetch and send messages. Therefore the seed is needed in both methods.
            // But if you only want to read messages you do not need the seed, because this secret should only be avaliable on the sender client.
            // In order to initialize a listener stream, you can use the method `Stream.createListenerStream`

            // To authorize your listener stream you simply need the index root of your stream. This is the first root of your publisher stream.

            const root = "IKSWQEKIJGAVPEHCDYWNHQTXVCCQCHHWMLZ9POQRPBXOFWJCLO9CKDKUVVVTVFROHYIGOSSMQ9UNYDPQX";

            // If the mode of this stream is Mode.RESTRICTED, you also need the sideKey to decrypt the messages correctly

            stream = await Stream.createListenerStream (
                provider, // your message provider that should be used for all actions made with this stream
                root,
                mode,
                security,
                sideKey
            );


      } catch (e) {
            console.error ("ERROR", e);
      }
})();