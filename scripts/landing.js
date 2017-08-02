var points = document.getElementsByClassName('point');

var animatePoints = function() {
     var revealPoint = function() {
       for(var i = 0; i < points.length; i++) {
         points[i].style.opacity = 1;
         points[i].style.transform = "scale(0.8, 0.8) translateY(0)";
         points[i].style.msTransform = "scale(0.8, 0.8) translateY(0)";
         points[i].style.WebkitTransform = "scale(0.8, 0.8) translateY(0)";
         points[i].style.borderStyle = "solid inset";
         points[i].style.borderColor = "#FFF";
       };
    }

    revealPoint();
 };

window.onload = function() {
  if (window.innerHeight > 950) {
    animatePoints(points);
  }

  var sellingPoints = document.getElementsByClassName('point')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
  window.addEventListener('scroll', function(event) {
    if(/*document.documentElement.scrollTop ||*/ document.body.scrollTop >= scrollDistance) {
      animatePoints(points);
    }
  });
}
