## Classes

<dl>
<dt><a href="#State">State</a> : <code><a href="#State">State</a></code></dt>
<dd><p>Class representing the actual state of a stream</p>
</dd>
<dt><a href="#Mode">Mode</a></dt>
<dd><p>Class representing the different modes of a stream</p>
</dd>
<dt><a href="#Stream">Stream</a> : <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Class representing the actual state of a stream</p>
</dd>
<dt><a href="#Message">Message</a></dt>
<dd><p>Class representing the a MAM message</p>
</dd>
<dt><a href="#Provider">Provider</a> : <code><a href="#Provider">Provider</a></code></dt>
<dd><p>Class representing the interface of a Provider</p>
</dd>
</dl>

<a name="State"></a>

## State : [<code>State</code>](#State)
Class representing the actual state of a stream

**Kind**: global class  

* [State](#State) : [<code>State</code>](#State)
    * [new State(seed, root, security, mode, sideKey)](#new_State_new)
    * [.MamState](#State+MamState) : <code>object</code>
    * [.MamState](#State+MamState)
    * [.Subscribed](#State+Subscribed) : <code>array</code>
    * [.Channel](#State+Channel) : <code>object</code>
    * [.Seed](#State+Seed) : <code>string</code>
    * [.Seed](#State+Seed)
    * [.Root](#State+Root) : <code>string</code>
    * [.Root](#State+Root)
    * [.NextRoot](#State+NextRoot) : <code>string</code>
    * [.NextRoot](#State+NextRoot)
    * [.Security](#State+Security) : <code>int</code>
    * [.Security](#State+Security)
    * [.Mode](#State+Mode) : <code>string</code>
    * [.Mode](#State+Mode)
    * [.SideKey](#State+SideKey) : <code>string</code> \| <code>null</code>
    * [.SideKey](#State+SideKey)
    * [.Start](#State+Start) : <code>int</code>
    * [.Start](#State+Start)
    * [.Index](#State+Index) : <code>int</code>
    * [.Index](#State+Index)
    * [.Count](#State+Count) : <code>int</code>
    * [.Count](#State+Count)
    * [.NextCount](#State+NextCount) : <code>int</code>
    * [.NextCount](#State+NextCount)
    * [.Timeout](#State+Timeout) : <code>int</code>
    * [.Timeout](#State+Timeout)

<a name="new_State_new"></a>

### new State(seed, root, security, mode, sideKey)
the created state


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seed | <code>string</code> \| <code>null</code> | <code>null</code> | The seed of the state |
| root | <code>string</code> \| <code>null</code> | <code>null</code> | The index root of the stream |
| security | <code>int</code> | <code>2</code> | the security level of the stream |
| mode | <code>string</code> |  | the mode of the stream |
| sideKey | <code>string</code> \| <code>null</code> | <code>null</code> | optionally the sideKey for encrypting and decrypting messages |

<a name="State+MamState"></a>

### state.MamState : <code>object</code>
– the state formatted as mam.client.js compatible object

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+MamState"></a>

### state.MamState
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| mamState | <code>object</code> | the state object returned by the mam.client.js library |

<a name="State+Subscribed"></a>

### state.Subscribed : <code>array</code>
- subscribed channels (not used in this implementation)

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Channel"></a>

### state.Channel : <code>object</code>
Channel - the channel object of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Seed"></a>

### state.Seed : <code>string</code>
the seed used in this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Seed"></a>

### state.Seed
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | set the seed that should be used with this state |

<a name="State+Root"></a>

### state.Root : <code>string</code>
the index root of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Root"></a>

### state.Root
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | set the index root of this state |

<a name="State+NextRoot"></a>

### state.NextRoot : <code>string</code>
the next root used for attatching new messages

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+NextRoot"></a>

### state.NextRoot
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | set the next root used for attatching new messages |

<a name="State+Security"></a>

### state.Security : <code>int</code>
the security level of this tate

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Security"></a>

### state.Security
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | set the security level of this state |

<a name="State+Mode"></a>

### state.Mode : <code>string</code>
the mode of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Mode"></a>

### state.Mode
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | set the mode of this state |

<a name="State+SideKey"></a>

### state.SideKey : <code>string</code> \| <code>null</code>
the optional sideKey for encrypting or decrypting messages

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+SideKey"></a>

### state.SideKey
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>null</code> | set the optional sideKey for encrypting or decrypting messages |

<a name="State+Start"></a>

### state.Start : <code>int</code>
the start of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Start"></a>

### state.Start
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | set the start of this state |

<a name="State+Index"></a>

### state.Index : <code>int</code>
the index of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Index"></a>

### state.Index
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | set the index of this state |

<a name="State+Count"></a>

### state.Count : <code>int</code>
the count of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Count"></a>

### state.Count
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | set the count of this state |

<a name="State+NextCount"></a>

### state.NextCount : <code>int</code>
the nextCount of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+NextCount"></a>

### state.NextCount
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | set the nextCount of this state |

<a name="State+Timeout"></a>

### state.Timeout : <code>int</code>
the timeout of this state

**Kind**: instance property of [<code>State</code>](#State)  
<a name="State+Timeout"></a>

### state.Timeout
**Kind**: instance property of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | set the timeout of this state |

<a name="Mode"></a>

## Mode
Class representing the different modes of a stream

**Kind**: global class  

* [Mode](#Mode)
    * [.PUBLIC](#Mode.PUBLIC)
    * [.PRIVATE](#Mode.PRIVATE)
    * [.RESTRICTED](#Mode.RESTRICTED)

<a name="Mode.PUBLIC"></a>

### Mode.PUBLIC
Represents the public mode of a Stream

**Kind**: static property of [<code>Mode</code>](#Mode)  
<a name="Mode.PRIVATE"></a>

### Mode.PRIVATE
Represents the private mode of a Stream

**Kind**: static property of [<code>Mode</code>](#Mode)  
<a name="Mode.RESTRICTED"></a>

### Mode.RESTRICTED
Represents the restricted mode of a Stream

**Kind**: static property of [<code>Mode</code>](#Mode)  
<a name="Stream"></a>

## Stream : [<code>Stream</code>](#Stream)
Class representing the actual state of a stream

**Kind**: global class  

* [Stream](#Stream) : [<code>Stream</code>](#Stream)
    * [new Stream(messageProvider, seed, mode, security, sideKey)](#new_Stream_new)
    * _instance_
        * [.isPublisher](#Stream+isPublisher) : <code>boolean</code>
        * [.Provider](#Stream+Provider) : [<code>Provider</code>](#Provider)
        * [.State](#Stream+State) : [<code>State</code>](#State)
        * [.State](#Stream+State)
        * [.init()](#Stream+init)
        * [.fetchMessages(filters)](#Stream+fetchMessages) : [<code>Array.&lt;Message&gt;</code>](#Message)
        * [.sendMessages(...messages)](#Stream+sendMessages) : [<code>Array.&lt;Message&gt;</code>](#Message)
        * [.deleteStream()](#Stream+deleteStream)
        * [.subscribe(callback, fromRoot, timeout)](#Stream+subscribe)
    * _static_
        * [.createListenerStream(messageProvider, root, mode, security, sideKey)](#Stream.createListenerStream) : [<code>Stream</code>](#Stream)
        * [.createPublisherStream(messageProvider, seed, mode, security, sideKey)](#Stream.createPublisherStream) : [<code>Stream</code>](#Stream)
        * [.initializePublisherStream(messageProvider, seed, mode, security, sideKey)](#Stream.initializePublisherStream) : [<code>Stream</code>](#Stream)

<a name="new_Stream_new"></a>

### new Stream(messageProvider, seed, mode, security, sideKey)
Creates a new stream object


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| messageProvider | [<code>Provider</code>](#Provider) |  | the url to a fullnode the messages should get attatched to |
| seed | <code>string</code> | <code>null</code> | the seed of the stream |
| mode | <code>string</code> |  | the mode of the stream |
| security | <code>int</code> | <code>2</code> | the security level of the stream |
| sideKey | <code>string</code> \| <code>null</code> | <code>null</code> | the optional sideKey for encrypting and decrypting messages |

<a name="Stream+isPublisher"></a>

### stream.isPublisher : <code>boolean</code>
returns if this stream can also publish messages

**Kind**: instance property of [<code>Stream</code>](#Stream)  
<a name="Stream+Provider"></a>

### stream.Provider : [<code>Provider</code>](#Provider)
returns the actual provider of this stream

**Kind**: instance property of [<code>Stream</code>](#Stream)  
<a name="Stream+State"></a>

### stream.State : [<code>State</code>](#State)
returns the current state of this stream

**Kind**: instance property of [<code>Stream</code>](#Stream)  
<a name="Stream+State"></a>

### stream.State
**Kind**: instance property of [<code>Stream</code>](#Stream)  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | sets the state of this stream |

<a name="Stream+init"></a>

### stream.init()
Initializing the latest MAM-State of the stream

**Kind**: instance method of [<code>Stream</code>](#Stream)  
<a name="Stream+fetchMessages"></a>

### stream.fetchMessages(filters) : [<code>Array.&lt;Message&gt;</code>](#Message)
Fetch messages from the tangle or a storage provider

**Kind**: instance method of [<code>Stream</code>](#Stream)  

| Param | Type | Description |
| --- | --- | --- |
| filters | <code>Object</code> | the filters that should be applied for fetching MAM messages |
| filters.fromRoot | <code>string</code> \| <code>null</code> | the root since which the messages should be fetched from |
| filters.start | <code>int</code> \| <code>null</code> | start value for pagination, skip `start` messages |
| filters.limit | <code>int</code> \| <code>null</code> | the maximum number of messages that should get fetched |
| filters.type | <code>string</code> \| <code>null</code> | the type of the messages that should get fetched |
| filters.orderByDate | <code>string</code> \| <code>null</code> | the ordering of the messages `asc` (ascending) or `desc` (descending) |

<a name="Stream+sendMessages"></a>

### stream.sendMessages(...messages) : [<code>Array.&lt;Message&gt;</code>](#Message)
Send message objects to the tangle

**Kind**: instance method of [<code>Stream</code>](#Stream)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | [<code>Message</code>](#Message) | the message objects that should get published |

<a name="Stream+deleteStream"></a>

### stream.deleteStream()
Delete the stream and notify all listeners

**Kind**: instance method of [<code>Stream</code>](#Stream)  
<a name="Stream+subscribe"></a>

### stream.subscribe(callback, fromRoot, timeout)
Subscribe to a stream to get notified when new messages arrives

**Kind**: instance method of [<code>Stream</code>](#Stream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | the method which should be called, when a new message arrives. Takes the message as argument |
| fromRoot | <code>string</code> \| <code>null</code> | <code>null</code> | the root since which messages should get subscribed |
| timeout | <code>int</code> \| <code>null</code> | <code></code> | the timeout of the interval the messages should get fetched |

<a name="Stream.createListenerStream"></a>

### Stream.createListenerStream(messageProvider, root, mode, security, sideKey) : [<code>Stream</code>](#Stream)
Creates a new ListenerStream for reading new MAM messages

**Kind**: static method of [<code>Stream</code>](#Stream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| messageProvider | [<code>Provider</code>](#Provider) |  | the url to a fullnode the messages should get attatched to |
| root | <code>string</code> |  | the index root of the stream |
| mode | <code>string</code> |  | the mode of the stream |
| security | <code>int</code> | <code>2</code> | the security level of the stream |
| sideKey | <code>string</code> \| <code>null</code> | <code>null</code> | the optional sideKey for encrypting and decrypting messages |

<a name="Stream.createPublisherStream"></a>

### Stream.createPublisherStream(messageProvider, seed, mode, security, sideKey) : [<code>Stream</code>](#Stream)
Creates a new PublisherStream for sending and reading new MAM messages

**Kind**: static method of [<code>Stream</code>](#Stream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| messageProvider | [<code>Provider</code>](#Provider) |  | the url to a fullnode the messages should get attatched to |
| seed | <code>string</code> |  | the seed of the stream |
| mode | <code>string</code> |  | the mode of the stream |
| security | <code>int</code> | <code>2</code> | the security level of the stream |
| sideKey | <code>string</code> \| <code>null</code> | <code>null</code> | the optional sideKey for encrypting and decrypting messages |

<a name="Stream.initializePublisherStream"></a>

### Stream.initializePublisherStream(messageProvider, seed, mode, security, sideKey) : [<code>Stream</code>](#Stream)
Initializes a already existing Stream for sending and reading new MAM messages

**Kind**: static method of [<code>Stream</code>](#Stream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| messageProvider | [<code>Provider</code>](#Provider) |  | the url to a fullnode the messages should get attatched to |
| seed | <code>string</code> |  | the seed of the stream |
| mode | <code>string</code> |  | the mode of the stream |
| security | <code>int</code> | <code>2</code> | the security level of the stream |
| sideKey | <code>string</code> \| <code>null</code> | <code>null</code> | the optional sideKey for encrypting and decrypting messages |

<a name="Message"></a>

## Message
Class representing the a MAM message

**Kind**: global class  

* [Message](#Message)
    * _instance_
        * [.Trytes](#Message+Trytes) : <code>string</code>
        * [.Raw](#Message+Raw) : <code>Object</code>
        * [.Message](#Message+Message) : <code>string</code> \| <code>int</code> \| <code>Object</code> \| <code>Array</code>
        * [.Transactions](#Message+Transactions) : <code>Array</code>
        * [.Type](#Message+Type) : <code>string</code>
        * [.Publisher](#Message+Publisher) : <code>string</code>
        * [.Timestamp](#Message+Timestamp) : <code>Date</code>
    * _static_
        * [.TYPE_DELETION](#Message.TYPE_DELETION) : <code>string</code>
        * [.TYPE_PROMOTIONAL](#Message.TYPE_PROMOTIONAL) : <code>string</code>
        * [.TYPE_TRANSACTIONAL](#Message.TYPE_TRANSACTIONAL) : <code>string</code>
        * [.createMessage(messageStream, message, type, publisher)](#Message.createMessage) : [<code>Message</code>](#Message)

<a name="Message+Trytes"></a>

### message.Trytes : <code>string</code>
the message as trytes string

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message+Raw"></a>

### message.Raw : <code>Object</code>
the raw message object

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message+Message"></a>

### message.Message : <code>string</code> \| <code>int</code> \| <code>Object</code> \| <code>Array</code>
the actual content of the message

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message+Transactions"></a>

### message.Transactions : <code>Array</code>
all transactions if this message is already attatched to the tangle

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message+Type"></a>

### message.Type : <code>string</code>
the type of this message

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message+Publisher"></a>

### message.Publisher : <code>string</code>
the publisher of this message

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message+Timestamp"></a>

### message.Timestamp : <code>Date</code>
the timestamp of this message

**Kind**: instance property of [<code>Message</code>](#Message)  
<a name="Message.TYPE_DELETION"></a>

### Message.TYPE\_DELETION : <code>string</code>
the message type for Deletion

**Kind**: static property of [<code>Message</code>](#Message)  
<a name="Message.TYPE_PROMOTIONAL"></a>

### Message.TYPE\_PROMOTIONAL : <code>string</code>
the message type for Promotional

**Kind**: static property of [<code>Message</code>](#Message)  
<a name="Message.TYPE_TRANSACTIONAL"></a>

### Message.TYPE\_TRANSACTIONAL : <code>string</code>
the message type for Transactional

**Kind**: static property of [<code>Message</code>](#Message)  
<a name="Message.createMessage"></a>

### Message.createMessage(messageStream, message, type, publisher) : [<code>Message</code>](#Message)
Create a new MAM message

**Kind**: static method of [<code>Message</code>](#Message)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| messageStream | [<code>Stream</code>](#Stream) |  | the stream this message should get published in or fetched from |
| message | <code>string</code> \| <code>int</code> \| <code>Object</code> \| <code>Array</code> |  | the actual content that should get published |
| type | <code>string</code> |  | the type of this message |
| publisher | <code>string</code> \| <code>null</code> | <code>null</code> | the publisher of this message |

<a name="Provider"></a>

## Provider : [<code>Provider</code>](#Provider)
Class representing the interface of a Provider

**Kind**: global class  

* [Provider](#Provider) : [<code>Provider</code>](#Provider)
    * [new Provider(provider, publisher, attatchToTangle)](#new_Provider_new)
    * [.createStream(messageStream)](#Provider+createStream)
    * [.updateState(messageStream)](#Provider+updateState)
    * [.publishMessages(messageStream, ...messages)](#Provider+publishMessages) : [<code>Array.&lt;Message&gt;</code>](#Message)
    * [.fetchMessages(messageStream, filters)](#Provider+fetchMessages) : [<code>Array.&lt;Message&gt;</code>](#Message)

<a name="new_Provider_new"></a>

### new Provider(provider, publisher, attatchToTangle)
Create a new Provider object


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| provider | <code>string</code> |  | the url of the fullnode that should handle communication with the tangle |
| publisher | <code>string</code> | <code>null</code> | the name of the publisher attatched to all messages, where the publisher does not get overwritten |
| attatchToTangle | <code>function</code> | <code></code> | a function outsourcing or overwriting the attatchToTangle method |

<a name="Provider+createStream"></a>

### provider.createStream(messageStream)
Creating a stream or storing the stream details (but never publish the sideKey or seed!)

**Kind**: instance method of [<code>Provider</code>](#Provider)  

| Param | Type |
| --- | --- |
| messageStream | [<code>Stream</code>](#Stream) | 

<a name="Provider+updateState"></a>

### provider.updateState(messageStream)
Update the state of the stream to it's latest state

**Kind**: instance method of [<code>Provider</code>](#Provider)  

| Param | Type | Description |
| --- | --- | --- |
| messageStream | [<code>Stream</code>](#Stream) | the stream the message should get published to |

<a name="Provider+publishMessages"></a>

### provider.publishMessages(messageStream, ...messages) : [<code>Array.&lt;Message&gt;</code>](#Message)
Publish one or multiple messages to the tangle

**Kind**: instance method of [<code>Provider</code>](#Provider)  

| Param | Type | Description |
| --- | --- | --- |
| messageStream | [<code>Stream</code>](#Stream) | the stream the message should get published to |
| ...messages | [<code>Message</code>](#Message) | the published messages |

<a name="Provider+fetchMessages"></a>

### provider.fetchMessages(messageStream, filters) : [<code>Array.&lt;Message&gt;</code>](#Message)
Fetch messages from the tangle or a permanent storage

**Kind**: instance method of [<code>Provider</code>](#Provider)  

| Param | Type | Description |
| --- | --- | --- |
| messageStream | [<code>Stream</code>](#Stream) |  |
| filters | <code>Object</code> | the filters that should be applied for fetching MAM messages |
| filters.fromRoot | <code>string</code> \| <code>null</code> | the root since which the messages should be fetched from |
| filters.start | <code>int</code> \| <code>null</code> | start value for pagination, skip `start` messages |
| filters.limit | <code>int</code> \| <code>null</code> | the maximum number of messages that should get fetched |
| filters.type | <code>string</code> \| <code>null</code> | the type of the messages that should get fetched |
| filters.orderByDate | <code>string</code> \| <code>null</code> | the ordering of the messages `asc` (ascending) or `desc` (descending) |

