//Example album

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

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  +   '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
  +   '<td class="song-item-title">' + songName + '</td>'
  +   '<td class="song-item-duration">' + songLength + '</td>'
  + '</tr>';

  return template;
};

var setCurrentAlbum = function(album) {
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  albumSongList.innerHTML = '';
  for(var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumBonIver);

  songListContainer.addEventListener('mouseover', function(event) {
    if(event.target.parentElement.className === 'album-view-song-item') {
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      var songItem = getSongItem(event.target);
      if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });

   for(var i = 0; i < songRows.length; i++) {
     songRows[i].addEventListener('mouseleave', function(event) {
      this.firstChild.innerHTML = this.firstChild.getAttribute('data-song-number');
     });
     songRows[i].addEventListener('click', function(event) {
       clickHandler(event.target);
     });
   };

   /*songRows[0].addEventListener('click', function(event) {
     //console.log(event);
     findParentByClassName(event.target, 'song-item-number')
   });*/
};



var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    while (currentParent.className !== targetClass && currentParent.className !== null) {
        currentParent = currentParent.parentElement;
    }
    return currentParent;
};

var getSongItem = function(element) {
    switch(element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
        return findParentByClassName(element, 'song-item-number')
        break;
      case 'song-item-title':
      case 'song-item-duration':
        return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        break;
      case 'album-view-song-item':
        return element.querySelector('.song-item-number');
        break;
      case 'song-item-number':
        return element;
      default:
        return;
  };
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  if(currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem
  } else if(currentlyPlayingSong === songItem) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if(currentlyPlayingSong !== songItem) {
      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem;
  }
};
