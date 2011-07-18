(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Slides = (function() {
    function Slides() {
      var section, _i, _len, _ref;
      this.currentSlide = 1;
      this.deck = $('#deck');
      this.slideHash = location.hash;
      this.slideCount = $('#deck > section').size();
      _ref = $('#deck > section');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        section = _ref[_i];
        $(section).attr('id', "slide" + (_i + 1)).addClass('slide');
      }
      if (this.slideHash && parseInt(this.slideHash.substring(1), 10) <= this.slideCount) {
        this.currentSlide = parseInt(this.slideHash.replace('#', ''), 10);
      }
      $('html').bind('keydown', $.proxy(this, 'keyControls'));
      window.addEventListener('resize', this.resize, false);
      document.body.className = 'full';
      this.resize();
      this.showSlide(this.currentSlide);
    }
    Slides.prototype.resize = function() {
      var sx, sy;
      sx = document.body.clientWidth / window.innerWidth;
      sy = document.body.clientHeight / window.innerHeight;
      return document.body.style.WebkitTransform = 'scale(' + (1 / Math.max(sx, sy)) + ')';
    };
    Slides.prototype.showSlide = function(id) {
      this.deck.find('.slide-selected').removeClass('slide-selected');
      $("#slide" + id).addClass('slide-selected');
      return location.hash = id;
    };
    Slides.prototype.prev = function() {
      if (this.currentSlide > 1) {
        this.currentSlide--;
        return this.showSlide(this.currentSlide);
      }
    };
    Slides.prototype.next = function() {
      if (this.currentSlide < this.slideCount) {
        this.currentSlide++;
        return this.showSlide(this.currentSlide);
      }
    };
    Slides.prototype.startOver = function() {
      var action, _i, _len, _ref;
      _ref = $('.action-on');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        $(action).removeClass().addClass('action').hide();
      }
      this.currentSlide = 1;
      return this.showSlide(this.currentSlide);
    };
    Slides.prototype.showActions = function() {
      var actions;
      actions = $('.slide-selected').find('.action');
      if (actions.length > 0) {
        return actions.first().removeClass('action').addClass('action-on').fadeIn(250);
      } else {
        return this.next();
      }
    };
    Slides.prototype.keyControls = function(event) {
      switch (event.keyCode) {
        case 33:
        case 37:
        case 38:
          return this.prev();
        case 32:
        case 34:
        case 39:
        case 40:
          return this.showActions();
      }
    };
    return Slides;
  })();
}).call(this);
