const { TMProvider, IOTAProvider } = require ("../index");
const { ApiAuthentificator } = require ("@tanglemesh/api-client.js");

(async () => {
      try {

            // The tangleMesh:message.js library uses a so called provider to publish MAM-Messages
            // In the first version there are two providers avaliable to use: IOTAProvider and TMProvider
            // You can of course implement your own provider by extending our src/providers/provider.js class

            // IOTAProvider
            // the IOTAProvider simply uses the tangle for it's actions. You can publish and fetch MAM-messages from and to the tangle.
            // You only need to provide a provider-url which is any available full-node

            let provider = new IOTAProvider ("https://node02.iotatoken.nl:443");

            // It's also possible to attatch a publisher name to your provider. This publisher name will be attatched to any message published with this provider
            // You can of course add your own AttatchToTangle-Method, if you want to outsource the proof of work

            const attatchToTangle = compute.attatchToTangle ("channel-id"); //e.g. you can use the tangleMesh/compute.js library: https://www.npmjs.com/package/@tanglemesh/compute.js
            provider = new IOTAProvider (
                "https://node02.iotatoken.nl:443", // provider url (iota full-node)
                "@tangleMesh/message.js", // publisher name
                attatchToTangle, // attatchToTangle method
                3, // depth
                14 // minWeightMagnitude
            );



            // TMProvider
            // the tangleMesh provider can be used to get some more features like persisting messages or more filtering options on fetching messages
            // as it's core, this provider does also rely on the tangle from iota, but set's a layer above, for e.g. storing transactional messages, that should be kept for a longer time
            // because this provider uses the tangleMesh:api, you need to provide your api credentials
            // because this provider works with the tangle, you also need to provide a provider url

            // Set credentials for using the tangleMesh:api
            const apiIdentifier = "315F5B4E62DBFA7A2DA57D88FAA016A9",
                  apiSecret = "49535045477F2EBDE0C3D05C1556A3925C5A6A2B93D2255A7DBF6F8EEC96AB1D",
                  channelId = "8ef56408-37fd-4024-bc11-36e00cb9ede3";
            const apiAuth = new ApiAuthentificator (
                apiIdentifier, 
                apiSecret, 
                "@tangleMesh/message.js" // publisher name
            );

            // After the initialization of the tangleMesh:api credentials, the initialization of the provider is as easy as the following call:

            provider = new TMProvider (
                "https://node02.iotatoken.nl:443", // provider url (iota full-node)
                apiAuth, // api authentification for the tangleMesh:api
                channelId // channel-id of the channel, the small fees should get fetched from (a small storage charge for persisting messages)
            );

      } catch (e) {
            console.error ("ERROR", e);
      }
})();