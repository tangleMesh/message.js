# message.js
A simple package to do messaging tasks for publishing to the tangle (eg. MAM)

This package provides you some computing features to outsource some computing intensive tasks like the `attatchToTangle` method many libraries of [iotaledger](https://github.com/iotaledger/) needs.
For more details have a look on [https://tangle-mesh.io](https://tangle-mesh.io).

## Installation
This is an npm-package and you can add it to your project by using npm with:

    npm install @tangleMesh/compute.js


## Usage

    import Compute from '@tanglemesh/compute.js';
    import { ApiAuthentificator } from "@tanglemesh/api-client.js";
    import { composeAPI } from "@iota/core";

    //Set credentials for using the tangleMesh:api
    const apiIdentifier = "api-identifier",
          apiSecret = "api-secret";
    const apiAuth = new ApiAuthentificator (apiIdentifier, apiSecret);

    //Create the `compute` object for doing computation tasks
    const compute = new Compute (apiAuth);

    // Initialize the iota compose api and use our compute-method(s)
    const iota = composeAPI ({
        provider: 'https://nodes.thetangle.org:443',
        compute: compute.attatchToTangle ("channel-id"),
    });


## Authorization / API key
In order to authorize your requests, you need to create an API key and secret at [https://tangle-mesh.io](https://tangle-mesh.io). The generated values can then be simply passed to the methods listed below.

## Methods

### attatchToTangle
This method can be used to overwrite the default `attatchToTangle` method from the [iotaledger](https://github.com/iotaledger/) packages.

    compute.attatchToTangle (channelId)

**Parameters:**
- channelId `string` - the channel id you want to pay your request with (the costs per request will be listed on [our website](https://tangle-mesh.io))

## Examples
For more examples just have a look on the [/examples](/examples) directory.

Run an example with the command:

    node examples/send-message.example.js

## Contact / Support
For requests or questions simply create an issue on [our repository](https://github.com/tangleMesh/compute.js) or [contact us](https://tangle-mesh.io/contact) with our form.







## Rough sketch

### MessageStream

You create a new MAM-Channel/TM-Stream

- you can decide to use the TM-Interface, or just the regular IOTA-MAM-Mode (possible other frameworks or services could also implement their own interface)
- for mam-simply a new state get's saved as object
- for TM a new channel get's created (MessageStream.create ()), or an existing one can be fetched with a static method MessageStream.open (…)

Within a MessageStream (independent from the provider (TM/IOTA)) you can do the following stuff:

- create stream and store it
- fetch messages with filtering
- send new message(s)
- delete stream (by sending a delete message)
- subsribe any stream, by it's root
- getter: .ApiAuthentificator

=> a MessageStream has two modes:

- read-only (subscriber) - only root is needed + optional sideKey
- publisher (subscriber & publisher) - root, seed and optional sideKey are needed



### Message

You can create new Messages/MAM

- regardless of the provider, you can create messages with one of the datatypes (string, number, object, array)
- the message-object is completely independent from the provider (IOTA, TM, …), because it only contains information but no publishing
    
Within a Message you can do the following stuff:

- create new message (_messageStream, message, type) - type [promotional, transactional], message [string, number, object, array] (mode, seed and sideKey get's fetched from the _messageStream)
- initialize a message (_messageStream, trytes)
- message.raw ()
- message.content ()
- some internal stuff for the _messageStream to publish and update state (get new root, get address, …)


### Provider

You can select one of the available Providers (IOTA, TM, …)

- a provider get's initialized always the same way, so there is a need of an interface!
- there are some methods that are required, and that should handle the publishing and reading of messages/streams
- a provider could also initialize another provider, to use also their functionality (eg. to push to TM and also to the Tangle, …)

A Provider should be able to to the following stuff:

- updateState (_messageStream)
- publishMessage (_messageStream, _message) : messages
- fetchMessages (_messageStream, filters) : messages


### State

This object is neutral and holds all the relevant informations of the mam-state

Informations to be kept:

- root
- index
- count
- next_count
- security
- mode
- side_key
- start 
- seed

These informations should be modifyable and fetchable. The state is only attatched to a MessageStream and should be kept save, because it holds very sensible and security relevant data.