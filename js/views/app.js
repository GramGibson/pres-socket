(function() {
  $(function() {
    var mode, slides, socket;
    socket = io.connect('http://192.168.1.84:9999/');
    mode = null;
    slides = null;
    $('#select_mode > div').click(function() {
      mode = $(this).attr('class');
      return $('#select_mode').animate({
        'margin-top': '-15em'
      }, 300, function() {
        $('#select_mode').hide();
        if (mode === 'pointer') {
          $('#pointer_controls').fadeIn();
        } else {
          slides = new Slides();
        }
        return socket.emit('set_mode', mode);
      });
    });
    $('#pointer_controls > div').click(function() {
      return socket.emit('action', $(this).attr('class'));
    });
    return socket.on('perform_action', function(action) {
      switch (action) {
        case 'next':
          return slides.showActions();
        case 'prev':
          return slides.prev();
        case 'startOver':
          return slides.startOver();
      }
    });
  });
}).call(this);
