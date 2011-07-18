$ ->
	socket = io.connect 'http://localhost:9999/'
	
	mode = null
	slides = null
	
	$('#select_mode > div').click ->
		mode = $(this).attr 'class'
		
		$('#select_mode').animate
			'margin-top': '-15em'
		, 300, ->
			$('#select_mode').hide()
			if mode == 'pointer'
				$('#pointer_controls').fadeIn()
			else
				slides = new Slides()
				
			socket.emit 'set_mode', mode

	$('#pointer_controls > div').click ->
		socket.emit 'action', $(this).attr 'class'

	socket.on 'perform_action', (action) ->
		switch action
			when 'next' then slides.showActions()
			when 'prev' then slides.prev()
			when 'startOver' then slides.startOver()
		
		
		
		
		