express = require 'express'
request = require 'request'

app = express.createServer()

io = require('socket.io').listen(app)
io.enable('browser client minification');

app.configure 'development', ->
    app.use express.static __dirname + '/views'

app.listen 9999

clients =
	slideshow: null
	pointer: null

io.sockets.on 'connection', (socket) ->
	
	socket.on 'set_mode', (mode) ->
		clients[mode] = socket
		clients[mode].emit "#{mode}_instruction", "Registered as #{mode}"
		
	socket.on 'action', (action) ->
		if clients.slideshow
			clients.slideshow.emit 'perform_action', action