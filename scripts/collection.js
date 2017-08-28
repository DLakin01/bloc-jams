var albumList = [albumBonIver, albumFooFighters, albumSufjan];

var buildCollectionTemplate = function(album, size) {
  var template =
  '<div class="collection-album-container column' + size + '">'
  + '   <img class="album-image" src="' + album.albumArtUrl + '">'
  + '   <div class="collection-album-info caption">'
  + '       <a class="album-name" href="' + album.albumURL + '">' + album.title + '</a>'
  + '       <br>'
  + '       <a class="album-artist" href="' + album.albumURL + '">' + album.artist + '</a>'
  + '   </div>'
  + '</div>';

  return template;
};


$(window).load(function() {

    var $collectionContainer = $('.album-covers');
    $collectionContainer.empty();

    for(var i = 0; i<albumList.length; i++) {
      var $newThumbnail = buildCollectionTemplate(albumList[i], ' third ');
      $collectionContainer.append($newThumbnail);
    }
 });
