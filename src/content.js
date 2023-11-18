
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'changePlaybackSpeed') {
	  const videoElement = document.querySelector('video');
	  if (videoElement) {
		videoElement.playbackRate = request.speed;
	  }
	}
  });
  