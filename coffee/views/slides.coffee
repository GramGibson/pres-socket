root = exports ? this

class root.Slides
	constructor: ->
		@currentSlide = 1
		@deck = $('#deck')
		@slideHash = location.hash
		@slideCount = $('#deck > section').size()

		$(section).attr('id', "slide#{_i + 1}").addClass('slide') for section in $('#deck > section')

		if @slideHash && parseInt(@slideHash.substring(1), 10) <= this.slideCount
			@currentSlide = parseInt(@slideHash.replace('#', ''), 10)
		
		$('html').bind('keydown', $.proxy(this, 'keyControls'))
		
		window.addEventListener('resize', @resize, false)
		document.body.className = 'full'
		@resize()
		@showSlide(@currentSlide)
		
	resize: ->
		sx = document.body.clientWidth / window.innerWidth
		sy = document.body.clientHeight / window.innerHeight

		document.body.style.WebkitTransform = 'scale(' + (1/Math.max(sx, sy)) + ')'
	
	showSlide: (id) ->
		@deck.find('.slide-selected').removeClass('slide-selected')
		$("#slide#{id}").addClass('slide-selected')
		location.hash = id
	
	prev: ->
		if @currentSlide > 1 
			@currentSlide--
			@showSlide(@currentSlide)
	
	next: ->
		if @currentSlide < @.slideCount
			@currentSlide++
			@showSlide(@currentSlide)
		
	startOver: ->
		$(action).removeClass().addClass('action').hide() for action in $('.action-on')
		@currentSlide = 1
		@showSlide(@currentSlide)
			
	showActions: ->
		actions = $('.slide-selected').find('.action')

		if actions.length > 0
			actions.first().removeClass('action').addClass('action-on').fadeIn(250)
		else
			@next()
	
	keyControls: (event) ->
		switch event.keyCode
			when 33, 37, 38 then @prev()
			when 32, 34, 39, 40 then @showActions()