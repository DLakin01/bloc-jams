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
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if(currentlyPlayingSongNumber !== $songNumber) {
      //Takes care of null case and another-song case, sets pause button until something else happens
      setSong($songNumber);
      currentSoundFile.play();
      console.log(currentSoundFile);
      $(this).html(pauseButtonTemplate);
      updatePlayerBarSong();
    }
    else if(currentlyPlayingSongNumber === $songNumber) {
      //If currently playing song is clicked, restores play button and sets currently playing song to null
      if(currentSoundFile.isPaused()) {
        currentSoundFile.play();
        $(this).html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
      }
      else {
        currentSoundFile.pause();
        $(this).html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
      }
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

var nextSong = function() {
  var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  var lastSongNumber = currentlyPlayingSongNumber;
  currentIndex++;
  if(currentIndex >= currentAlbum.songs.length) {
    currentIndex = 0;
  }
  setSong(currentIndex + 1);
  currentSoundFile.play();
  updatePlayerBarSong();
  $('.main-controls .play-pause').html(playerBarPauseButton);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function() {
  var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  var lastSongNumber = currentlyPlayingSongNumber;
  currentIndex--;
  if(currentIndex < 0) {
    currentIndex = currentAlbum.songs.length - 1;
  }
  setSong(currentIndex + 1);
  currentSoundFile.play();
  updatePlayerBarSong();
  $('.main-controls .play-pause').html(playerBarPauseButton);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};

var togglePlayFromPlayerBar = function() {
  var $songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  if(currentSoundFile.isPaused()) {
    $songNumberCell.html(pauseButtonTemplate);
    $(this).html(playerBarPauseButton);
    currentSoundFile.play();
  }
  else {
    $songNumberCell.html(playButtonTemplate);
    $(this).html(playerBarPlayButton);
    currentSoundFile.pause();
  }
};

var updatePlayerBarSong = function(event) {
  $(".currently-playing .song-name").text(currentSongFromAlbum.title);
  $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $(".currently-playing .artist-name").text(currentAlbum.artist);
  $(".main-controls .play-pause").html(playerBarPauseButton);
};

var setSong = function(songNumber) {
if(currentSoundFile) {
  currentSoundFile.stop();
}
  currentlyPlayingSongNumber = songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: ['mp3'],
    preload: true
  });
  setVolume(currentVolume)
};

var setVolume = function(volume) {
  if(currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
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
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playerControl = $('.main-controls .play-pause');

$(document).ready(function() {
  setCurrentAlbum(albumBonIver);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playerControl.click(togglePlayFromPlayerBar);
});
