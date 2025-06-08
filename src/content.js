
// Helper function to find a video element, either directly or within a Google Drive iframe.
function findVideoElement() {
  // First, try to find a direct video element on the page.
  let videoElement = document.querySelector('video');
  if (videoElement) {
    return videoElement;
  }

  // If no direct video element, search for Google Drive iframes.
  // These selectors target iframes whose src attribute suggests a Google Drive video.
  const driveIframe = document.querySelector('iframe[src*="drive.google.com/file/d/"], iframe[src*="drive.google.com/embeddedfolderview"]');
  if (driveIframe) {
    try {
      // Attempt to access the contentDocument of the iframe.
      // This may fail due to cross-origin restrictions if the iframe's content is from a different domain
      // and proper CORS headers are not set.
      const iframeDocument = driveIframe.contentDocument;
      if (iframeDocument) {
        videoElement = iframeDocument.querySelector('video');
        return videoElement; // Returns the video element or null if not found within the iframe
      }
    } catch (error) {
      console.error("Error accessing Google Drive iframe content:", error);
      // It's common to encounter errors here due to cross-origin policies.
    }
  }
  return null; // No video element found
}

// Helper function to set the playback speed of a video element.
function setPlaybackSpeed(videoElement, speed) {
  if (videoElement && typeof videoElement.playbackRate === 'number') {
    try {
      videoElement.playbackRate = speed;
    } catch (error) {
      console.error("Error setting playback rate:", error);
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'changePlaybackSpeed') {
    const videoElement = findVideoElement();
    if (videoElement) {
      setPlaybackSpeed(videoElement, request.speed);
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkVideoPresence') {
    const videoElement = findVideoElement();
    sendResponse({ hasVideo: videoElement !== null });
  }
});