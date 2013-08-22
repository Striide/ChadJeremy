(function( $, undefined ) {

  $.widget("porcaro.adaptivemenu", {
    _create: function(){
      $("#mobile_nav").html($("#main_nav").html());
    }
  });

  $.widget("porcaro.animatedScroll", {
    _create: function()
    {
      that = this;
      $(this.element).click(function(evt)
      {
        id = $(this).attr("href");
        that.scroller(id);
        evt.stopPropagation();
      });
    },
    scroller: function (target)
    {
      var target_location = $(target).position();
      var current_location = $('body').scrollTop();

      var speed = target_location.top - current_location;
      if (speed < 0 ) {
         speed = speed * -1;
      }

      if (speed > 1350) {
        speed = 1350;
      }

      $('body','html').animate({scrollTop: target_location.top}, speed);
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

})( jQuery );
