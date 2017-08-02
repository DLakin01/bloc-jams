var animatePoints = function() {

     var points = document.getElementsByClassName('point');

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

/*animatePoints();*/
