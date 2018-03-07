/*
* Add a CSS3 animation class to an element only when it's in the viewport.
* The class is taken from the attribute data-animate.
* es: data-animate='className' become class='className' when in viewport
*
*/
function animateClasses(){
    var top = $(window).scrollTop()+$(window).height();
    $('[data-animate]').each(function(){
        if($(this).offset().top < top){
            $(this).addClass($(this).attr('data-animate'));
        }
    });
};

//cats slideshow
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

function fullscreener(_container) {
    _container.each(function () {
        var _this = $(this);
        //debugger;
        var _src = _this.attr('src');
        var _srcset = _this.attr('srcset');
        if (_srcset != null)
        {
            var screenWidth = $win.width();
            var src_arr = _parse_srcset(_srcset);
            for (var i in src_arr)
            {
                if (src_arr[i].width >= screenWidth)
                {
                    _src = src_arr[i].url;
                    break;
                }
            }
        }
        _this.parent().addClass($classes.FsrHolder).attr('style', 'background-image: url(' + _src + ');');
    });
}

(function ($) {
  $.fn.activeNavigation = function(selector) {
      var pathname = window.location.pathname
      var hrefs = []
      $(selector).find("a").each(function(){
          if (pathname.indexOf($(this).attr("href")) > -1)
              hrefs.push($(this))
      })
      if (hrefs.length) {
          hrefs.sort(function(a,b){
              return b.attr("href").length - a.attr("href").length
          })
          hrefs[0].closest('li').addClass("active").siblings().removeClass("active");
      }
  };

    var $document = $(document);
    if (!History.enabled) {
        return false;
    }
    var root = History.getRootUrl();
    $.expr.filters.internal = function (elem) {
        return (elem.hostname == window.location.hostname && /(\/|\.html)$/i.test(elem.pathname)) || false;
    };
    function find_all($html, selector) {
        return $html.filter(selector).add($html.find(selector));
    }
    function parse_html(html) {
        return $($.parseHTML(html, document, true));
    }
    function parse_response(html) {
        var
        head = /<head[^>]*>([\s\S]+)<\/head>/.exec(html),
        body = /<body[^>]*>([\s\S]+)<\/body>/.exec(html),
        $head = head ? parse_html(head[1]) : $(),
        $body = body ? parse_html(body[1]) : $(),
        title = $.trim(find_all($head, 'title').last().html()),
        $content = $.trim(find_all($body, '#content').first().html());
        return {
            'title': title,
            '$content': $content
        }
    }

    $document.ready(function () {
        // Pace.on("done", function(){$(".content-section").removeClass("hidden").addClass("fadeIn");});
        animateClasses();
        fullscreener($('.image-full'));
        $("a.lightbox").colorbox({ transition:"elastic", maxWidth:"98%", maxHeight:"98%" });
        $('.sections-nav').vLine();
        $('.content-section').removeClass("hidden").addClass("fadeIn");
        $(document).activeNavigation(".sections-nav");
        $document.on('click', 'a:internal', function (event) {
            if (event.which == 2 || event.ctrlKey || event.metaKey) {
                return true;
            }
            History.pushState(null, null, $(this).attr('href'));
            event.preventDefault();
            return false;
        });
    });
    $(window).on('statechange', function () {
        var
        url = History.getState().url,
        rel = url.replace(root, '/');

        $.get(rel).done(function (date) {
            var response = parse_response(date);

            if (!response.$content.length) {
                document.location.href = url;

                return false;
            }

            var $content = $('#content');
            var url = window.location.pathname;

            if (response.title.length) {
                $('title').last().html(response.title);
            }

            $content
            .fadeOut(100)
            .promise()
            .done(function () {
                $content.html(response.$content).fadeIn(100);
                // Pace.on("done", function(){$(".content-section").removeClass("hidden").addClass("fadeIn");});
                animateClasses();
                fullscreener($('.image-full'));
                $("a.lightbox").colorbox({ transition:"elastic", maxWidth:"98%", maxHeight:"98%" });
                // portfolioShowcase();
                $('.sections-nav').vLine();
                $(document).activeNavigation(".sections-nav");
                $('.content-section').removeClass("hidden").addClass("fadeIn");
            });
        }).fail(function () {
            document.location.href = url;
            return false;
        });
    });
})(jQuery);
