(function() {
  var app, clients, express, io, request;
  express = require('express');
  request = require('request');
  app = express.createServer();
  io = require('socket.io').listen(app);
  io.enable('browser client minification');
  app.configure('development', function() {
    return app.use(express.static(__dirname + '/views'));
  });
  app.listen(9999);
  clients = {
    slideshow: null,
    pointer: null
  };
  io.sockets.on('connection', function(socket) {
    socket.on('set_mode', function(mode) {
      clients[mode] = socket;
      return clients[mode].emit("" + mode + "_instruction", "Registered as " + mode);
    });
    return socket.on('action', function(action) {
      if (clients.slideshow) {
        return clients.slideshow.emit('perform_action', action);
      }
    });
  });
}).call(this);
