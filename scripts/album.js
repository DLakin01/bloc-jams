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

  var $row = $(template);

  var clickHandler = function() {
    var $songNumber = $row.find('.song-item-number');
    //var $dataNumber = $songNumber.attr('data-song-number');
    if(currentlyPlayingSong == null) {
      $songNumber.html(pauseButtonTemplate);
      currentlyPlayingSong = $songNumber
    }
    else if(currentlyPlayingSong == $songNumber) {
      currentlyPlayingSong = null;
      $songNumber.html(playButtonTemplate);
      console.log(currentlyPlayingSong);
    }
    else if(currentlyPlayingSong !== $songNumber) {
      currentlyPlayingSong.html = currentlyPlayingSong.attr('data-song-number');
      $songNumber.html(pauseButtonTemplate)
      currentlyPlayingSong = $songNumber;
    }
  };

  var onHover = function(event) {
    var $songNumberCell = $(this).find('.song-item-number');
    var $number = $songNumberCell.attr('data-song-number');
    if($number !== currentlyPlayingSong) {
      $songNumberCell.html(playButtonTemplate);
    }
  };
  var offHover = function(event) {
    var $songNumberCell = $(this).find('.song-item-number');
    var $number = $songNumberCell.attr('data-song-number');
    if($number !== currentlyPlayingSong) {
      $songNumberCell.html($number)
    }
    else if($number === currentlyPlayingSong) {
      $songNumberCell.html(pauseButtonTemplate);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  $albumSongList.empty();
  for(var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
  setCurrentAlbum(albumBonIver);

});
