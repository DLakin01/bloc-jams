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
      currentVolume = 50
      $('.seek-control .seek-bar .thumb').css({
        "opacity": "1"
      });
      $('.seek-control .seek-bar .fill').css({
        "opacity": "1"
      });
      $('.volume .fill').width(currentVolume + '%');
      $('.volume .thumb').css({
        "left": currentVolume + '%'
      });
      updateSeekBar();
      $(this).html(pauseButtonTemplate);
      updatePlayerBarSong();
    }
    else if(currentlyPlayingSongNumber === $songNumber) {
      //If currently playing song is clicked, restores play button and sets currently playing song to null
      if(currentSoundFile.isPaused()) {
        currentSoundFile.play();
        $('.seek-control .seek-bar .thumb').css({
          "opacity": "1"
        });
        $('.seek-control .seek-bar .fill').css({
          "opacity": "1"
        });
        updateSeekBar();
        $(this).html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
      }
      else {
        currentSoundFile.pause();
        $('.seek-control .seek-bar .thumb').css({
          "opacity": "0"
        });
        $('.seek-control .seek-bar .fill').css({
          "opacity": "0"
        });
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
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var albumPicker = function() {
  var queryData = new QueryData;
  if(queryData.albumID === '1') {
    setCurrentAlbum(albumBonIver);
  }
  else if(queryData.albumID === '2') {
    setCurrentAlbum(albumFooFighters);
  }
  else if(queryData.albumID === '3') {
    setCurrentAlbum(albumSufjan);
  }
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

var updateSeekBar = function() {
  if(currentSoundFile) {
    currentSoundFile.bind('timeupdate', function(event) {
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
  }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100;
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);
  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
};

var setUpSeekBars = function() {
  var $seekBars = $('.player-bar .seek-bar');
  $seekBars.click(function(event) {
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();
    var seekBarFillRatio = offsetX / barWidth;
    if($(this).parent().attr('class') == 'seek-control') {
      seek(seekBarFillRatio * currentSoundFile.getDuration());
    }
    else {
      setVolume(seekBarFillRatio * 100);
    }
    updateSeekPercentage($(this), seekBarFillRatio);
  });
  $seekBars.find('.thumb').mousedown(function(event) {
    var $seekBar = $(this).parent();
    $(document).bind('mousemove.thumb', function(event) {
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;
      if($(this).parent().attr('class') == 'seek-control') {
        seek(seekBarFillRatio * currentSoundFile.getDuration());
      }
      else {
        setVolume(seekBarFillRatio * 100);
      }
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
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
  $('.seek-control .seek-bar .thumb').css({
    "opacity": "1"
  });
  $('.seek-control .seek-bar .fill').css({
    "opacity": "1"
  });
  updateSeekBar();
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
  $('.seek-control .seek-bar .thumb').css({
    "opacity": "1"
  });
  $('.seek-control .seek-bar .fill').css({
    "opacity": "1"
  });
  updateSeekBar();
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
    $('.seek-control .seek-bar .thumb').css({
      "opacity": "1"
    });
    $('.seek-control .seek-bar .fill').css({
      "opacity": "1"
    });
  }
  else {
    $songNumberCell.html(playButtonTemplate);
    $(this).html(playerBarPlayButton);
    currentSoundFile.pause();
    $('.seek-control .seek-bar .thumb').css({
      "opacity": "0"
    });
    $('.seek-control .seek-bar .fill').css({
      "opacity": "0"
    });
  }
}

var updatePlayerBarSong = function(event) {
  $(".currently-playing .song-name").text(currentSongFromAlbum.title);
  $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $(".currently-playing .artist-name").text(currentAlbum.artist);
  $(".main-controls .play-pause").html(playerBarPauseButton);
};

var setSong = function(songNumber) {
if(currentSoundFile) {
  currentSoundFile.stop();
  $('.seek-control .seek-bar .thumb').css({
    "opacity": "0"
  });
  $('.seek-control .seek-bar .fill').css({
    "opacity": "0"
  });
}
  currentlyPlayingSongNumber = songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: ['mp3'],
    preload: true
  });
  setVolume(currentVolume)
};

var seek = function(time) {
  if(currentSoundFile) {
    currentSoundFile.setTime(time);
  }
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
  albumPicker();
  setUpSeekBars();
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playerControl.click(togglePlayFromPlayerBar)
});
