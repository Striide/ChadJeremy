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
    options: { height_fix: 110 }, // todo: this should match the scrollspy number, which I think is 120
    _create: function()
    {
      that = this;
      $(this.element).click(function(evt)
      {
        id = $(this).attr("href");
        if (id == "#portfolio") {
            if (!is_homepage_currently_displayed()) {
              hide_special_content_elements(true);
            } 
          
          show_portfolio();
        } else {
          that.scroller(id);
          evt.stopPropagation();
        }
        
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

  $("#recognition-form button").unbind("click").bind("click",function(e){
    e.stopPropagation();
    var form = $(this).closest("form");
    $.ajax({
      'data': $(form).serialize(),
      'url': $(form).data('action'),
      'method': 'POST'
    }).success(function(){
      $("#recognition-form").hide();
      $("#recognition-success").show();
    });
    return false;
  });




})( jQuery );



    // portfolio scripts
      function hide_special_content_elements(hide_homepage) {
        var special_content_element = false;
        if ( document.getElementById('le_portfolio').style.display=='block'){
          special_content_element = 'le_portfolio';
        } else if ( document.getElementById('our_approach').style.display=='block' ) {
          special_content_element = 'our_approach';
        } else if ( document.getElementById('our_people').style.display == 'block') {
          special_content_element = 'our_people';
        }
       
       if (special_content_element) {
          document.getElementById(special_content_element).style.opacity = 0;
          setTimeout(function() {
            document.getElementById(special_content_element).style.display = 'none';
            document.getElementById('portfolio_stage').innerHTML = ''; // clears stage to refresh portfolio
            document.getElementById('homepage').style.opacity = 0;
            if (!hide_homepage) {
              setTimeout(function() {
                document.getElementById('homepage').style.display = 'block';
                document.getElementById('homepage').style.opacity = 1;
              }, 300);
            }
          }, 300);
        }
      }
      

      function show_portfolio() {

        document.getElementById('homepage').style.opacity = 0;
        setTimeout(function() {
          document.getElementById('homepage').style.display = 'none';
          if (document.getElementById('portfolios_list_view').style.display == 'block') {
            document.getElementById('portfolios_list_view').style.display = 'none';
            document.getElementById('portfolios').style.display = 'block';
          }
          document.getElementById('le_portfolio').style.display = 'block';
          document.getElementById('portfolio_stage').style.opacity = 0;
          setTimeout(function() {
            document.getElementById('le_portfolio').style.opacity = 1;
            $('body,html').animate({scrollTop: 0}, 300);
          }, 500);
        }, 300);

    
      }

      function show_portfolio_list_mobile() {
        document.getElementById('portfolios_list_view').style.display = 'none';
        document.getElementById('portfolios').style.display = 'block';
      }

      function portfolio_navigation(direction) {
        var target = null;
        var target_id = null;
        for (i=0; i<portfolio.length;i++) {
          if (portfolio[i] == current_portfolio_item) {
            target_id = i + direction; 
            if (target_id > (portfolio.length-1)) {
              target = portfolio[0];
            } else if (target_id < 0) {
              target = portfolio[portfolio.length-1];
            } else {
              target = portfolio[target_id];
            }
          }
        }
        show_portfolio_target(target);
      }


      function show_portfolio_target(target) {
        current_portfolio_item = target;
        $('body,html').animate({scrollTop: 0}, 500);
          document.getElementById('portfolio_stage').innerHTML = document.getElementById(target).innerHTML;
          document.getElementById('portfolio_stage').style.opacity =1;
           document.getElementById('portfolios').style.display = 'none';
          document.getElementById('portfolios_list_view').style.display = 'block';
      }

      function is_homepage_currently_displayed() {
        if (document.getElementById('homepage').style.display == 'block') {
          return true;
        } else {
          return false;
        }
      }


       // javascript based on show_portfolio to display approach content

      function show_approach() {
        document.getElementById('homepage').style.opacity = 0;
        setTimeout(function() {
          document.getElementById('homepage').style.display = 'none';
          document.getElementById('our_approach').style.display = 'block';
          setTimeout(function() {
            document.getElementById('our_approach').style.opacity = 1;
            $('body,html').animate({scrollTop: 0}, 300);
          }, 500);
        }, 300); 
      }

      function show_people() {
        document.getElementById('homepage').style.opacity = 0;
        setTimeout(function() {
          document.getElementById('homepage').style.display = 'none';
          document.getElementById('our_people').style.display = 'block';
          setTimeout(function() {
            document.getElementById('our_people').style.opacity = 1;
            $('body,html').animate({scrollTop: 0}, 300);
          }, 500);
        }, 300); 
      }

        $('.nav').click(function () { hide_special_content_elements() });
        $('.brand').click(function () { hide_special_content_elements() });
   
