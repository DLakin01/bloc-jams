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
    var $songNumber = $(this).attr('data-song-number');
    if(currentlyPlayingSongNumber !== null) {
      //Restores the number of the previously played song
      var currentlyPlayingCell = getSongNumberCell($songNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if(currentlyPlayingSongNumber !== $songNumber) {
      //Takes care of null case and another-song case, sets pause button until something else happens
      $(this).html(pauseButtonTemplate);
      setSong($songNumber);
      updatePlayerBarSong();
    }
    else if(currentlyPlayingSongNumber === $songNumber) {
      //If currently playing song is clicked, restores play button and sets currently playing song to null
      $(this).html(playButtonTemplate);
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
      $('.main-controls .play-pause').html(playerBarPlayButton);
    }
  };

  var onHover = function(event) {
    var $songNumberCell = $(this).find('.song-item-number');
    var $number = $songNumberCell.attr('data-song-number');
    if($number !== currentlyPlayingSongNumber) {
      $songNumberCell.html(playButtonTemplate);
    }
  };
  var offHover = function(event) {
    var $songNumberCell = $(this).find('.song-item-number');
    var $number = $songNumberCell.attr('data-song-number');
    if($number !== currentlyPlayingSongNumber) {
      $songNumberCell.html($number)
    }
    //console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
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

var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
}

var songChange = function() {
  var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  var lastSongNumber = currentlyPlayingSongNumber;
  if($(this) = $nextButton) {
    currentIndex++;
    if(currentIndex >= currentAlbum.songs.length) {
      currentIndex = 0;
    }
  }
  else if($(this) = $previousButton) {
    currentIndex--;
    if(currentIndex < 0) {
      currentIndex = currentAlbum.songs.length - 1;
    }
  }
  setSong(currentIndex + 1);
  updatePlayerBarSong();
  $('.main-controls .play-pause').html(playerBarPauseButton);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
}

var updatePlayerBarSong = function(event) {
  $(".currently-playing .song-name").text(currentSongFromAlbum.title);
  $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $(".currently-playing .artist-name").text(currentAlbum.artist);
  $(".main-controls .play-pause").html(playerBarPauseButton);
};

var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumFooFighters);
  $previousButton.click(songChange);
  $nextButton.click(songChange);
});
