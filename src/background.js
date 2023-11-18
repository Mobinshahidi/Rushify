chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkVideoPresence') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          const activeTabId = activeTab.id;
          chrome.tabs.sendMessage(activeTabId, { action: 'changePlaybackSpeed', speed: request.speed }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Error: ', chrome.runtime.lastError);
            }
          });
        } else {
          console.error('Error: No active tab found.');
        }
      });
    }
  });