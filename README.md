socketio-map-example
====================

A small example showing how to update a [Mapbox](https://www.mapbox.com/) map
using [Socket.io](http://socket.io/) on [Express](http://expressjs.com/).

There is also an [Express.io](http://express-io.org/) branch if would prefer
using that.

Install
-------

$ npm install

Start server
------------

$ npm start

Usage
-----

Go to localhost:3000 and get up a map of my town. For best effect, you could
open up two browsers showing the same map. In a browser javascript
console, you can add a new marker by issuing this command:

````javascript
socket.emit('marker:create', {type: 'theatre', lat: 63.3, lon: 10.5});
````

You can also update the map with new markers using a regular HTTP POST
request (using Postman or wget or …), like this:

````
http://localhost:3000/api/add/theatre/
{lat: 63.2, lon: 10.4}
````

In Postman, you either need to set header `content-type=application/json` and
put `{lat: 63.2, lon: 10.4}` in the *raw* field, or you can set `lat` and
`lon` as form fields after choosing *x-www-form-urlencoded*.

API-key
-------

This is meant as a small sample project that should work out of the box using
as few commands as possible. So please change my Mapbox API key (and replace
by your own key at line 33 in views/index.hbs) key before you change anything else.

Getting your own API key is as easy as creating a new map at the [Mapbox
website](https://www.mapbox.com/). After registering, the map is available,
and you can start using it by replacing my key with your key.

License
-------

Released under the [MIT
license](https://github.com/sigurdga/socketio-map-example/blob/master/LICENSE)
