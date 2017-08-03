var collectionItemTemplate =
  '<div class="collection-album-container column fourth">'
+ '   <img src="assets/images/album_covers/22aMillion.jpeg">'
+ '   <div class="collection-album-info caption">'
+ '       <a class="album-name" href="album.html">22, A Million</a>'
+ '       <br>'
+ '       <a href="album.html">Bon Iver</a>'
+ '       <br>'
+ '       14 songs'
+ '       <br>'
+ '     </p>'
+ '   </div>'
+ '</div>'
 window.onload = function() {
   var collectionContainer = document.getElementsByClassName('album-covers')[0];
   collectionContainer.innerHTML = '';
   for(var i = 0; i<12; i++) {
    collectionContainer.innerHTML += collectionItemTemplate;
   }
 }
