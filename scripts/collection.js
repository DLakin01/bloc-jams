var albumBonIver = {
  title: "22, A Million",
  artist: "Bon Iver",
  label: "Jagjaguwar",
  year: "2016",
  albumArtUrl: 'assets/images/album_covers/22aMillion.jpeg',
  songs: [
    {title: "22 (OVER S∞∞N)", duration: "2:48"},
    {title: "10 d E A T h b R E a s T ⚄ ⚄", duration: "2:24"},
    {title: "715 - CR∑∑KS", duration: "2:12"},
    {title: "33 \"GOD\"", duration: "3:33"},
    {title: "29 #Strafford APTS", duration: "4:05"},
  ]
};

var albumFooFighters = {
  title: "Color and the Shape",
  artist: "Foo Fighters",
  label: "Roswell/Capitol",
  year: "1997",
  albumArtUrl: "assets/images/album_covers/ColorAndTheShape.jpeg",
  songs: [
    {title: "Doll", duration: "1:23"},
    {title: "Monkey Wrench", duration: "3:51"},
    {title: "Hey, Johnny Park!", duration: "4:08"},
    {title: "My Poor Brain", duration: "3:33"},
    {title: "Everlong", duration: "4:11"}
  ]
};

var albumSufjan = {
  title: "Come On! Feel the Illinoise!",
  artist: "Sufjan Stevens",
  label: "Asthmatic Kitty Records",
  year: "2005",
  albumArtUrl: 'assets/images/album_covers/Illinoise.jpeg',
  songs: [
    {title: "Concerning the UFO Sighting near Highland, Illinois", duration: "2:08"},
    {title: "The Black Hawk War", duration: "2:14"},
    {title: "Come On! Feel the Illinoise!", duration: "6:45"},
    {title: "John Wayne Gacy, Jr.", duration: "3:19"},
    {title: "Jacksonville", duration: "5:24"}
  ]
};

var albumList = [albumBonIver, albumFooFighters, albumSufjan];

/*var setAlbumCollection = function(album) {
  var albumTitle = album.title;
  var albumArtist = album.artist;
  var albumImage = album.albumArtUrl;
  buildCollectionTemplate(albumTitle, albumArtist, albumImage);
  return
};*/

var buildCollectionTemplate = function(album) {
  var template =
  '<div class="collection-album-container column third">'
+ '   <img class="album-image" src="' + album.albumArtUrl + '">'
+ '   <div class="collection-album-info caption">'
+ '       <a class="album-name" href="album.html">' + album.title + '</a>'
+ '       <br>'
+ '       <a class="album-artist" href="#">' + album.artist + '</a>'
+ '   </div>'
+ '</div>';

  return template;
};


$(window).load(function() {
   var $collectionContainer = $('.album-covers');
   $collectionContainer.empty();

   for(var i = 0; i<albumList.length; i++) {
     var $newThumbnail = buildCollectionTemplate(albumList[i]);
     $collectionContainer.append($newThumbnail);
   }
 });
