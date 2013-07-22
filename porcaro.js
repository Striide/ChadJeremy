(function( $, undefined ) {

  $.widget("porcaro.adaptivemenu", {
    _create: function(){
      $("#mobile_nav").html($("#main_nav").html());
    }
  });

  $.widget("porcaro.fixheight", {
    _create: function(){
      var wgt = this;

      fixHeights($(".page-unit"));

      window.addEventListener("resize",function()
      {
        if (window.resizingporcaro !== undefined)
        {
          clearTimeout(window.resizingporcaro);
        }
        window.resizingporcaro = setTimeout(function(){
          fixHeights($(".page-unit"));
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
