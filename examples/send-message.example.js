const Message = require ("../index");
const { ApiAuthentificator } = require ("@tanglemesh/api-client.js");

(async () => {

      try {

            // Set credentials for using the tangleMesh:api
            const apiIdentifier = "7DE635ECF529629BA113571D2A288598",
                  apiSecret = "A4BEF4E7CE564EDD2BD8141F1D6546S567F659DC8F30D9918B2F17C387BD7B60",
                  channelId = "7458d984-47ea-4ee1-bfbc-e3016a233f35";
            const apiAuth = new ApiAuthentificator (apiIdentifier, apiSecret);

            // Create the `message` object for doing messaging tasks
            const message = new Message (apiAuth);

            await message.test ();

      } catch (e) {
            console.error ("ERROR", e);
      }


})();