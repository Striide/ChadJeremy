(function( $, undefined ) {

  $.widget("porcaro.adaptivemenu", {
    _create: function(){
      $("#mobile_nav").html($("#main_nav").html());
    }
  });

  $.widget("porcaro.scrollmenu", {
    options: { height_fix: 30 },
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

      $('body').animate({scrollTop: target_location.top - this.options.height_fix}, 1000);
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
