(function ($) {
  var $classes = {
    FsrHolder: 'fsr-holder',
    FsrImage: 'image-full',
  };
  $(document).ready(function() {
    //console.log('Ready');
    //RenderBackground.init();
    $(document).activeNavigation(".sections-nav");
    animateClasses();
    fullscreener($('.' + $classes.FsrImage));
    $('.sections-nav').vLine();
    $('.content-section').removeClass("hidden").addClass("fadeIn");
    //SectionFullpage();
    jQuery(".parallax").paroller({ factor: '-0.1', type: 'foreground', direction: 'vertical' });
    //jQuery(".parallax-menu").paroller({ factor: '1', type: 'foreground', direction: 'vertical' });

    var doodle = document.querySelector('css-doodle');

    window.addEventListener('scroll', _.throttle(function () {
      window.requestAnimationFrame(function () {
        doodle.update();
      });
    }, 250));

  });
  $(document).on('pjax:success', function () {
    //console.log('state change');
    $(document).activeNavigation(".sections-nav");
    animateClasses();
    fullscreener($('.' + $classes.FsrImage));
    $('.sections-nav').vLine();
    $('.content-section').removeClass("hidden").addClass("fadeIn");
    //SectionFullpage();
  });
  // Sets a image as a background on its parent.
  function fullscreener(_container) {
    _container.each(function () {
      var _this = $(this);
      //debugger;
      var _src = _this.attr('src');
      var _srcset = _this.attr('srcset');
      if (_srcset != null) {
        var screenWidth = $win.width();
        var src_arr = _parse_srcset(_srcset);
        for (var i in src_arr) {
          if (src_arr[i].width >= screenWidth) {
            _src = src_arr[i].url;
            break;
          }
        }
      }
      _this.parent().addClass($classes.FsrHolder).attr('style', 'background-image: url(' + _src + ');');
    });
  }
  function SectionFullpage() {
    if($('#content').length){
      $('#content').fullpage({
        navigation: false,
        bigSectionsDestination: 'top',
        responsiveWidth: 992,
      });
    }
  }
  // Basic Slider
  function kittySlide() {
    var kitty = function () {
      var slides = $('#cats li'), active = slides.filter('.active');
      if (!active.length) {
        active = slides.last();
      }
      active.addClass('active');
      var next = active.next().length ? active.next() : slides.first();
      next.css('opacity', 0).addClass('active').animate({ opacity: 1 }, function () {
        active.removeClass('active last-active');
      });
    };
    setInterval(kitty, 3000);
  };
  /*
  * Add a CSS3 animation class to an element only when it's in the viewport.
  * The class is taken from the attribute data-animate.
  * es: data-animate='className' become class='className' when in viewport
  */
  function animateClasses(){
    var top = $(window).scrollTop()+$(window).height();
    $('[data-animate]').each(function(){
      if($(this).offset().top < top){
        $(this).addClass($(this).attr('data-animate'));
      }
    });
  };


})(jQuery);

lightbox.option({
  'resizeDuration': 200,
  'wrapAround': true
})
var pjax = new Pjax({
  elements: "a.pjax", // default is "a[href], form[action]"
  selectors: ["title", "#content"],
  cacheBust: false
})
