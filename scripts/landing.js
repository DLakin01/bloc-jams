var points = document.getElementsByClassName('point');

var animatePoints = function() {
     var revealPoint = function(point) {
        point.style.opacity = 1;
        point.style.transform = "scale(0.8, 0.8) translateY(0)";
        point.style.msTransform = "scale(0.8, 0.8) translateY(0)";
        point.style.WebkitTransform = "scale(0.8, 0.8) translateY(0)";
        point.style.borderStyle = "solid inset";
        point.style.borderColor = "#FFF";
       };

       for(var i = 0; i < points.length; i++) {
         revealPoint(points[i]);
       };
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
