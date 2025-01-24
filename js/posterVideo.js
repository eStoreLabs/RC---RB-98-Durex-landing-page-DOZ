const posterImage = document.querySelector('.es-poster-image');
const playerContainer = document.querySelector('#YTplayer');

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: '92aWiL_wZyg',
      playerVars: {
        autoplay: 0,
        controls: 1,
        disablekb: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0
      }
    });
  }
  
  function showPlayer() {
    posterImage.style.display = 'none'; // Hide the poster image
    playerContainer.style.display = 'block'; // Show the player
    player.playVideo(); // Play the video
  }
  
  posterImage.addEventListener('click', showPlayer);