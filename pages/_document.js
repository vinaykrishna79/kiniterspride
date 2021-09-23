import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <CustomScripts />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

const CustomScripts = () => {
  return (
    <>
      <head
        dangerouslySetInnerHTML={{
          __html:
            `<meta name="author" content="www.knitterspride.com">
                  <meta name="page-topic" content="Knitter's Pride Needles">
                  <meta name="copyright" content="Knitter's Pride">
                  <meta name="robots" content="index, follow">
                  <meta name="rating" content="safe for kids">
                  <meta name="googlebot" content="index, follow ">
                  <meta name="yahooSeeker" content=" index, follow ">
                  <meta name="msnbot" content=" index, follow ">
                  <meta name="allow-search" content="yes">
                  <meta name="revisit-after" content="daily">
                  <meta name="distribution" content="global">
                  <meta name="expires" content="never">
                  <meta name="language" content="english">
                  <!-- Global site tag (gtag.js) - Google Analytics -->
                  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-24920181-1"></script>
                  <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-24920181-1');
                  </script>                  
                  
                
                  <link rel="manifest" href="favicon/manifest.json" />
                  <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
                  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
                  <link rel="alternate" type="application/json" href="/feed.json" />
                
                  <meta name="msapplication-TileColor" content="#ffffff" />
                
                  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                
                  <meta name="theme-color" content="#ffffff" />`+
            '<link rel="stylesheet" href="/Assets/css/font-awesome.min.css" />' +
            '<link rel="stylesheet" href="https://knitterspride-prod.s3.amazonaws.com/testImage/homeCss.css" />' + 
            '<script src="/Assets/js/bootstrap.min.js"></script>' +           
            '<script src="/Assets/js/popper.min.js"></script>' +
            '<script src="https://knitpro-prod.s3.amazonaws.com/testImage/homeJs.js"></script>' +
            '<script src="/Assets/js/FileSaver.js"></script>' +
            '<script src="/Assets/js/jquery-3.5.1.min.js"></script>' +
            '<script src="/Assets/js/owl.carousel.min.js"></script>' + 
            `<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
                  <meta name="google-site-verification" content="XeIeHd7_y1mcgXEPseq8T9MmcPMZWBlWUbgJkGvpMAA" />
                <script type="text/javascript">
                  var isMegaMenuLoaded = false;
                  $(document).ready(function () {
                    if (!isMegaMenuLoaded) {
                      setInterval(function () { loadhover(); }, 3000);
                    }

                  });

                  function loadhover() {
                    if (!isMegaMenuLoaded) {
                      $(".menu-large").hover(function () {

                        $(".hover-show").addClass("active");
                      }, function () {
                        $(".hover-show").removeClass("active");
                      });
                      $(".megamenu li").click(function () {
                        $(".hover-show").removeClass("active");
                      });
                      isMegaMenuLoaded = true;
                    }
                  }

                </script>
                <script type="text/javascript">
                  var isMenuLoaded = false;
                  $(document).ready(function () {
                    if (!isMenuLoaded) {
                      setInterval(function () { loadclick(); }, 3000);
                    }

                  });

                  function loadclick() {
                    if (!isMenuLoaded) {
                      $('.acnav__label').click(function () {
                        var label = $(this);
                        var parent = label.parent('.has-children');
                        var list = label.siblings('.acnav__list');

                        if (parent.hasClass('is-open')) {
                          list.slideUp('fast');
                          parent.removeClass('is-open');
                        }
                        else {
                          list.slideDown('fast');
                          parent.addClass('is-open');
                        }
                      });
                      isMenuLoaded = true;
                    }
                  }
                </script>

                <script type="text/javascript">
                  function loadclick() {
                    if (!isMenuLoaded) {
                      $('.acnav__label').click(function () {
                        var label = $(this);
                        var parent = label.parent('.has-children');
                        var list = label.siblings('.acnav__list');

                        if (parent.hasClass('is-open')) {
                          list.slideUp('fast');
                          parent.removeClass('is-open');
                        }
                        else {
                          list.slideDown('fast');
                          parent.addClass('is-open');
                        }
                      });

                      $(".menunav").click(function () {
                      $(".mobilenavover").addClass("mobiledivshow");
                    });

                    $(".mobilenavclose").click(function () {
                      $(".mobilenavover").removeClass("mobiledivshow");
                    });

                      $("#search").click(function () {
                      $(".searchmainwrap").addClass("seachshow");
                      $("body").addClass("no-hidden");
                    });

                    $(".closesearch").click(function () {
                      $(".searchmainwrap").removeClass("seachshow");
                      $("body").removeClass("no-hidden");
                    });


                    $("#search").click(function () {
                      $(".overdiv").addClass("overdivshow");
                    });



                    $("#search1").click(function () {
                      $(".searchmainwrap").addClass("seachshow");
                    });

                    $(".closesearch").click(function () {
                      $(".searchmainwrap").removeClass("seachshow");
                    });


                    $("#search1").click(function () {
                      $(".overdiv").addClass("overdivshow");
                    });



                    $(".closesearch").click(function () {
                      $(".overdiv").removeClass("overdivshow");
                    });
                      isMenuLoaded = true;
                    }
                  }
                </script>

                <script>
                  $("#header").load("header.html");
                  $("#footer").load("footer.html");

                </script>
                <script type="text/javascript">
                  $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();

                    $('.header-overlay').css({
                      opacity: function () {
                        var elementHeight = $(this).height();
                        return 1 - (elementHeight - scrollTop) / elementHeight;
                      }
                    });
                  });



                </script>

                <script type="text/javascript">
                  $(window).scroll(function () {
                    if ($(this).scrollTop() > 50) {
                      $('header').addClass('haderfix');
                    } else {
                      $('header').removeClass('haderfix');
                    }
                  });

                </script>

                  <script type="text/javascript">
                    $(window).scroll(function () {
                      if ($(this).scrollTop() > 50) {
                        $("header").addClass("haderfix");
                      } else {
                        $("header").removeClass("haderfix");
                      }
                    });
                  </script>


                  <script>
                    $('.carousel .vertical .item').each(function () {
                      var next = $(this).next();
                      if (!next.length) {
                        next = $(this).siblings(':first');
                      }
                      next.children(':first-child').clone().appendTo($(this));

                      for (var i = 1; i < 2; i++) {
                        next = next.next();
                        if (!next.length) {
                          next = $(this).siblings(':first');
                        }

                        next.children(':first-child').clone().appendTo($(this));
                      }
                    });
                  </script>
                  <script>
                  $(document).ready(function(){
                      $("select").change(function(){
                          $(this).find("option:selected").each(function(){
                              var optionValue = $(this).attr("value");
                              if(optionValue){
                                  $(".needle-box").not("." + optionValue).hide();
                                  $("." + optionValue).show();
                              } else{
                                  $(".needle-box").hide();
                              }
                          });
                      }).change();
                  });
                  </script>
                  <script>
                  $(window).scroll(function () {
                      if ($(this).scrollTop() > 50) {
                        $('#back-to-top').fadeIn();
                      } else {
                        $('#back-to-top').fadeOut();
                      }
                    });
                    // scroll body to 0px on click
                    $('#back-to-top').click(function () {
                      $('body,html').animate({
                        scrollTop: 0
                      }, 400);
                      return false;
                    });

                  </script>
  
                  <script>
                  $(document).ready(function () {
                    setTimeout(() => {
                      $("#uniqueid").owlCarousel({
                        items: 3,
                        loop: false,
                        mouseDrag: false,
                        touchDrag: false,
                        pullDrag: false,
                        rewind: true,
                        autoplay: false,
                        // margin: 0,
                        nav: true,
                        dots: true,
                      });
                    }, 1200)
                  });
                  </script>

                    <!--default-->

                    <script type="text/javascript">
                      $('.acnav__label').click(function () {
                      var label = $(this);
                      var parent = label.parent('.has-children');
                      var list = label.siblings('.acnav__list');
                    
                      if ( parent.hasClass('is-open') ) {
                        list.slideUp('fast');
                        parent.removeClass('is-open');
                      }
                      else {
                        list.slideDown('fast');
                        parent.addClass('is-open');
                      }
                    }); 
                    </script>
                    <script>
                        $("#header").load("header.html");
                        $("#footer").load("footer.html");
                    
                    </script>
                    <script type="text/javascript">
                      $(window).scroll(function() {
                      var scrollTop = $(this).scrollTop();
                    
                      $('.header-overlay').css({
                        opacity: function() {
                          var elementHeight = $(this).height();
                          return 1 - (elementHeight - scrollTop) / elementHeight;
                        }
                      });
                    
                    $(window).scroll(function() {
                      var scroll = $(window).scrollTop();
                      $(".innerimg").css({
                        transform: 'translate3d(0%, -'+(scroll/100)+'%, 0) scale('+(100 + scroll/5)/100+')',
                      });
                    });
                    
                    
                    });
                    </script> 
                    <script type="text/javascript">
                      $(document).ready(function(){
                      $("#search").click(function(){
                        $(".searchmainwrap").addClass("seachshow");
                      });
                    
                    $(".closesearch").click(function(){
                        $(".searchmainwrap").removeClass("seachshow");
                      });
                    
                    
                    $("#search").click(function(){
                        $(".overdiv").addClass("overdivshow");
                      });
                    
                    
                    
                    $("#search1").click(function(){
                        $(".searchmainwrap").addClass("seachshow");
                      });
                    
                    $(".closesearch").click(function(){
                        $(".searchmainwrap").removeClass("seachshow");
                      });
                    
                    
                    $("#search1").click(function(){
                        $(".overdiv").addClass("overdivshow");
                      });
                    
                    
                    
                    $(".closesearch").click(function(){
                        $(".overdiv").removeClass("overdivshow");
                      });
                    
                    
                    $(".menunav").click(function(){
                        $(".mobilenavover").addClass("mobiledivshow");
                      });
                    
                    $(".mobilenavclose").click(function(){
                        $(".mobilenavover").removeClass("mobiledivshow");
                      });
                    
                    
                    });
                    </script>
                    <script type="text/javascript">
                              $(window).scroll(function(){
                                  if ($(this).scrollTop() > 50) {
                                    $('header').addClass('haderfix');
                                  } else {
                                    $('header').removeClass('haderfix');
                                  }
                              });
                              
                      </script>
                      <script>
                        wow = new WOW(
                          {
                            animateClass: 'animated',
                            offset:100,
                            callback:     function(box) {
                              console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                            }
                          }
                        );
                        wow.init();
                        document.getElementById('moar').onclick = function() {
                          var section = document.createElement('section');
                          section.className = 'section--purple wow fadeInUp';
                          this.parentNode.insertBefore(section, this);
                        };
                      </script>
          `
        }} />
    </>
  )
}