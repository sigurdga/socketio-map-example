#!/usr/bin/env node
var http = require('http'),
    path = require('path'),
    express = require('express'),
    socketio = require('socket.io'),
    hbs = require('express-hbs'),
    app = express(),
    server = http.createServer(app),
    io = socketio.listen(server),
    port = 3000;

app.configure(function () {
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.engine('hbs', hbs.express3());
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'views'));

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500);
        res.render('500', {
            status: err.status || 500,
            error: err.message
        });
    });

    // -- 404 status
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404', {
            status: 404,
            error: 'file not found',
            url: req.url
        });
    });
});
server.listen(port, function(){
    console.log("Express server listening on port %d", port);
});

io.sockets.on('connection', function (socket) {
    socket.on('marker:create', function (data) {
        console.log(data.type, data.lat, data.lon);
        io.sockets.emit('call', {markers: [{type: data.type, lat: data.lat, lon: data.lon}]});
    });
});

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/api/markers', function (req, res) {
    return res.json(200, {
        markers: [{
            type: 'pitch',
            lat: 63.4,
            lon: 11.4
        }]
    });
});
app.post('/api/add/:type/', function (req, res) {
    io.sockets.emit('call', {markers: [{type: req.params.type, lat: req.body.lat, lon: req.body.lon}]});
    return res.json(200, {});
});
