# message.js
@tangleMesh/message.js is a simple package to publish and fetch messages through the IOTA tangle.

This package is a simple but porwerful wrapper for the [mam.client.js](https://github.com/iotaledger/mam.client.js). You can send different types of messages like transactional or promotional messages. You are also able to fetch messages with a small set of filters.

## Installation
This is an npm-package and you can add it to your project by using npm with:

    npm install @tangleMesh/message.js


## Usage
Below you find a minimum usage example on how to use our message-library. First you need to import the required packages. Afterwards you can create a provider and a stream. With your created message-stream you can then send and fetch messages. Every message will be sent and fetched to and from the tangle, regardless of which provider you are using.

    const { IOTAProvider, Stream, Mode, Message } = require ("@tanglemesh/message.js");
    const { ApiAuthentificator } = require ("@tanglemesh/api-client.js");

    (async () => {

        //Create a provider that should be used as middleware to the tangle
        const provider = new IOTAProvider ("https://nodes.thetangle.org:443");

        //Create a new stream for publishing and receiving messages
        let stream = await Stream.createPublisherStream (
                provider, // your message provider that should be used for all actions made with this stream
                "XXXXOK9TYGDOBSAKRCGMDSDFVHOQXMM9HWLQZPHYAZBIPDMZWPXJLSRQDSPWULQGAWQWQFEQQ9CI9XAY9", // your seed
        );

        //Create a new Message to publish
        const message = Message.createMessage (
            stream,
            "some example message"
        );

        //Publish the previously created message
        const publishedMessages = await stream.sendMessages (message);

        //Fetch all new messages and output them
        const fetchedMessages = await stream.fetchMessages ();
        for (const fetchedMessage of fetchedMessages) {
            console.log (fetchedMessage.Message, fetchedMessage.Type, fetchedMessage.Publisher, fetchedMessage.Timestamp);
        }

    })();

## Basic explanations
This packages contains some different classes that you need to know, to use it properly.

### Provider
One importent component of this package are the providers. In this version there are two working providers available:

* `IOTAProvider`
* `TMProvider`

You can use both of these providers to send and fetch messages through the tangle. If you'd like to create your own provider, you can simply create your own provider class by extending the class `provider`.

    const { Provider } = require ("@tanglemesh/message.js");

    class OwnProvider extends Provider {…}

To create a working own provider, you can have a look into our provided providers that you can find in [./src/providers](./src/providers).
But normally the two providers mentioned above should work for you in most cases.

A provider works as a middleware to correctly send and fetch messages. The `IOTAProvider` therefore uses the "native" tangle and simply passes your messages to the tangle and fetches it from there. If you'd like to have a more advanced featureset you can use the `TMProvider`. Therefore you need an account and a api credentials from [https://tangle-mesh.io/](https://tangle-mesh.io/). This provider stores even older messages that could get pruned by a local snapshot of your fullnode. With this provider you have also some additional filters to fetch mam-messages. But more on this later on.

A Provider basically has four different methods, that you can use:

* `createStream ()` - create a new stream
* `updateState ()` - update the stream to it's newest state, even if you have created the stream on another client for example
* `publishMessages ()` - send messages to the tangle
* `fetchMessages ()` - fetch messages with some filtering options

This is everything a provider does for you. And even better: in most use cases you do not even have to call this messages on your own, because the stream will do that for you. You only have to initialize the providers as follows:

    //Using the IOTAProvider
    const { IOTAProvider } = require ("@tanglemesh/message.js");

    const iotaProvider = new IOTAProvider ("https://node02.iotatoken.nl:443");


    //Using the TMProvider
    const { TMProvider } = require ("@tanglemesh/message.js");
    const { ApiAuthentificator } = require ("@tanglemesh/api-client.js");

    // Set credentials for using the tangleMesh:api
    const apiIdentifier = "315F5B4E62DBFA7A2DA57D88FAA016A9",
            apiSecret = "49535045477F2EBDE0C3D05C1556A3925C5A6A2B93D2255A7DBF6F8EEC96AB1D",
            channelId = "8ef56408-37fd-4024-bc11-36e00cb9ede3";
    const apiAuth = new ApiAuthentificator (apiIdentifier, apiSecret);

    const tmProvider = new TMProvider ("https://node02.iotatoken.nl:443", apiAuth, "channelid");

The most important parameter that every provider has is the `fullnode-url` that you can set to any fullnode you have access to.

### Mode
A second small building block in this package is the `Mode` class. In MAM messaging there are three different modes for sending and receiving messages. This class simply represents the three different methods:

    const { Mode } = require ("@tanglemesh/message.js");

    const publicMode = Mode.PUBLIC;
    const privateMode = Mode.PRIVATE;
    const restrictedMode = Mode.RESTRICTED;

### Stream
A stream is the core component of this package. A stream simply is a specified channel of MAM messages on the tangle. You can use a stream to publish and receive messages. There are two different types of streams:

* ListenerStream
* PublisherStream

Like the names suggest is the PublisherStream for sending **and** receiving messages. The ListerStream on the other hand can only fetch messages of a channel.

For a ListenerStream you only need the `provider` (fullnode api-url), one of the above `mode`s, the `root` of the stream and optionally a `sideKey` for:

    const { Stream } = require ("@tanglemesh/message.js");

    const stream = await Stream.createListenerStream (
        provider, // your message provider that should be used for all actions made with this stream
        root,
        mode,
        security,
        sideKey
    );

To create a new PublisherStream you have to call the method `Stream.createPublisherStream` with you `provider` (fullnode api-url), your `seed` (will only stored locally on your device regardless of the provider!), the `mode` and optionally the `sideKey` for encrypting and decrypting messages.

    const { Stream } = require ("@tanglemesh/message.js");

    const stream = await Stream.createPublisherStream (
        provider, // your message provider that should be used for all actions made with this stream
        seed,
        mode,
        security,
        sideKey
    );

If you have already create a PublisherStream and you want to initialize the stream with an up to date state, you have to call the method `Stream.initializePublisherStream`. With this method you should use the same properties that you used previously with the above method.

    const { Stream } = require ("@tanglemesh/message.js");

    const stream = await Stream.initializePublisherStream (
        provider, // your message provider that should be used for all actions made with this stream
        seed,
        mode,
        security,
        sideKey
    );

All these three methods will create a `stream`-object for you, that you can now use for further actions:

* `fetchMessages`
* `sendMessages`
* `deleteStream`
* `subscribe`

You can find more about these methods below or in our examples. The stream object will always update it's state when receiving or publishing messages. Therefore you are always in the latest state of your stream, when using a `stream`-object.

### State
The [mam.client.js](https://github.com/iotaledger/mam.client.js) from the iota foundations has introduced a state object that is used for publishing and receiving messages. Our State object is a simple interface for this state object, that makes it easier for our other components to use this state. You can get the state object of your stream by calling `stream.State`, if you'd like to get some information about the current state. But normally this State is only used internally in our other classes or the providers.

### Messages
The last but not least component is the `Message` class. Each MAM message is represented by a own message object. You can create own messages like in the following example:

    const { Message } = require ("@tanglemesh/message.js");

    const message = Message.createMessage (
        stream,
        {
            "some": "example",
            "test": 1.3
        },
        Message.TYPE_PROMOTIONAL
    );

You get the same message object by fetching messages with your stream. A Message has always a specific type:

* Transactional (`Message.TYPE_TRANSACTIONAL`) - a message with higher priority, that get's stored for a longer period of time when using the `TMProvider`
* Promotional (`Message.TYPE_PROMOTIONAL`) - a temporary message, that lasts only until the next local snapshot of your fullnode
* Deletion (`Message.TYPE_DELETION`) - a message that singnals that this stream got deleted

Also a message contains always the `message.Trytes` that get send to the tangle, when publishing it. You can also read the `message.Message`, the `message.Type`, the `message.Transactions`, if this message got already attatched to the tangle, the `message.Publisher` and also a `message.Timestamp`. You can read more about it's properties and methods below. 


## Methods
You can read more about the available classes and methods in our [Documentation](DOCUMENTATION.md).


## Examples
For more examples just have a look on the [/examples](/examples) directory. There you will find examples explaining how to use this package step by step.

Run any example you like with the following command:

    node examples/1_provider.example.js

But these examples does only execute correctly, if you set up your own correct configuration values.

## Contact / Support
For requests or questions simply create an issue on [our repository](https://github.com/tangleMesh/message.js) or [contact us](https://tangle-mesh.io/contact) with our contact form.
