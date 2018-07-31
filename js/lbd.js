(function ($) {
  'use strict';

  /*--------------------------
  preloader
  ---------------------------- */
  $(window).on('load', function () {
    var pre_loader = $('#preloader')
    pre_loader.fadeOut('slow', function () { $(this).remove(); });
  });	


  /*---------------------
  TOP Menu Stick
  --------------------- */
  var windows = $(window);
  var sticky = $('#sticker');

  windows.on('scroll', function () {
    var scroll = windows.scrollTop();
    if (scroll < 300) {
      sticky.removeClass('stick');
    } else {
      sticky.addClass('stick');
    }
  });


  /*----------------------------
  jQuery MeanMenu
  ------------------------------ */
    var mean_menu = $('div#dropdown');
    mean_menu.meanmenu();

  /*--------------------------
   scrollUp
  ---------------------------- */
  $.scrollUp({
    scrollText: '<i class="fas fa-angle-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
  });

  /*----------------------------
   Counter js active
  ------------------------------ */
  var count = $('.counter');
  count.counterUp({
    delay: 40,
    time: 3000
  });

  /*--------------------------
  Parallax
  ---------------------------- */
  var parallaxeffect = $(window);
  parallaxeffect.stellar({
    responsive: true,
    positionProperty: 'position',
    horizontalScrolling: false
  });


  /*--------------------------
       slider carousel
  ---------------------------- */
  var intro_carousel = $('.intro-carousel');
  intro_carousel.owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  /*----------------------------
      Contact form
  ------------------------------ */
  $("#contactForm").on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      formError();
      submitMSG(false, "Did you fill in the form properly?");
    } else {
      event.preventDefault();
      submitForm();
    }
  });
  function submitForm() {
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
      type: "POST",
      url: "assets/contact.php",
      data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
      success: function (text) {
        if (text === "success") {
          formSuccess();
        } else {
          formError();
          submitMSG(false, text);
        }
      }
    });
  }

  function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
  }

  function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated text-success";
    } else {
      var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

})(jQuery);