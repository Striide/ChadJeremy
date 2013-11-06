(function( $, undefined ) {

  $.widget("porcaro.adaptivemenu", {
    _create: function(){
      $("#mobile_nav").html($("#main_nav").html());

      /*
      this is a partial working version of the collapse
      mobile menu collapsing AND having the page scroll to the right section...
      doesn't work very well in mobile
      */
      // /*
      $('#mobile_nav a').on('click', function()
      {
        window.triggered_target = $(this).attr("href");
        $(".btn-navbar").click();
      });

      $("div.nav-collapse").on("hidden",function()
      {
        // unpleasant duplication from below
        if (window.triggered_target)
        {
          setTimeout(function(){
            var target = window.triggered_target;
            var target_location = $(target).position();

            $('body').animate({scrollTop: target_location.top - 110 + 1}, 200);
            window.triggered_target = null;
          },100);
        }
      });
      // */
    }
  });

  $.widget("porcaro.scrollmenu", {
    options: { height_fix: 110 },
    _create: function()
    {
      that = this;
      $(this.element).click(function(evt)
      {
        console.log('scrollclick');
        id = $(this).attr("href");
        that.scroller(id);
        evt.stopPropagation();
        return false;
      });
    },
    scroller: function (target)
    {
      var target_location = $(target).position();
      var this_height_fix_passer = this.options.height_fix + 1;

      if(!is_homepage_currently_displayed()) {
        hide_special_content_elements();
        scroller_timeout = 700;
        
      } else {
        scroller_timeout = 0;
      }



      setTimeout(function() {
        target_location = $(target).position();
        $('html,body').animate({scrollTop:  target_location.top - this_height_fix_passer}, 200);
      }, scroller_timeout);
        

        /*
        doesn't seem to work right
        var _scrollto = target_location.top - 109;
        console.log(target_location.top, _scrollto);
        window.scrollTo(0,_scrollto);
        */
        
     
    }
  });

  $.widget("porcaro.fixheight", {
    _create: function(){
      var wgt = this;

      fixHeights($(".page-unit .inner-container"));

      window.addEventListener("resize",function()
      {
        if (window.resizingporcaro !== undefined)
        {
          clearTimeout(window.resizingporcaro);
        }
        window.resizingporcaro = setTimeout(function(){
          fixHeights($(".page-unit .inner-container"));
        },50);
      });
    }
  });

  function fixHeights(elements)
  {
    var wh = $(window).height();

    $(elements).each(function()
    {
      var eh = $(this).height();

      if (eh < wh)
      {
        $(this).css("min-height",wh).css("padding-bottom",0);
      }
      else if (eh == wh)
      {
        // nothing needed
      }
      else
      {
        $(this).css("padding-bottom",parseInt(wh/2));
      }
    });
  };

   $.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
      scrollTarget  : target,
      offsetTop     : 50,
      duration      : 500,
      easing        : 'swing'
    }, options);
    return this.each(function(){
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
      scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
        if (typeof callback == 'function') { callback.call(this); }
      });
    });
  }
})( jQuery );
