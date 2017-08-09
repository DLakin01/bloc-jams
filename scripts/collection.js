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

var setAlbumCollection = function() {
  var albumTitle = document.getElementsByClassName('album-name')[0];
  var albumArtist = document.getElementsByClassName('album-artist')[0];
  var albumImage = document.getElementsByClassName('album-image')[0];
  var albumContainer = document.getElementsByClassName('collection-album-container')[0];
  albumContainer.innerHTML = '';
  for(var i = 0; i < albumList.length; i++) {
    albumContainer.innerHTML += createCollectionItem(albumList[i].albumArtUrl, albumList[i].title, albumList[i].artist);
  };
};

var createCollectionItem = function(image, title, artist) {
  var template =
  '<div class="collection-album-container column third">'
+ '   <img class="album-image" src="' + image + '">'
+ '   <div class="collection-album-info caption">'
+ '       <a class="album-name" href="album.html">' + title + '</a>'
+ '       <br>'
+ '       <a class="album-artist" href="#">' + artist + '</a>'
+ '   </div>'
+ '</div>';

  return template;
}


window.onload = function() {
   //var collectionContainer = document.getElementsByClassName('album-covers')[0];
   //collectionContainer.innerHTML = '';
   setAlbumCollection();
 };
