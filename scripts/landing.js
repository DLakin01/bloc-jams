var animatePoints = function() {
     var revealPoint = function() {
        $(this).css({
          opacity: 1,
          transform: 'scale(0.8) translateY(0)',
          "border-color": 'white',
          "border-style": 'solid inset',
      });
    };

//The following function is dependent on utilites.js

       $.each($('.point'), revealPoint);
 };

$(window).load(function() {
  if ($(window).height > 950) {
    animatePoints();
  }

  var $scrollDistance = $('.selling-points').offset().top - $(window).height() + 100;
  $(window).scroll(function(event) {
    if($(window).scrollTop() >= $scrollDistance) {
      animatePoints();
    }
  });
});
