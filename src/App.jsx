import React, { useState, useEffect } from "react";

function App() {
  const [speed, setSpeed] = useState(1);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.tabs.sendMessage(
        activeTabId,
        { action: "checkVideoPresence" },
        (response) => {
          setHasVideo(response.hasVideo);
        }
      );
    });
  }, []);

  const speedHandler = () => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
          action: "changePlaybackSpeed",
          speed,
        });
      });
    } catch (error) {
      console.error("Error in speedHandler:", error);
    }
  };

  return (
    <>
      <div className="w-64 h-64 font-mono font-bold">
        <h1 className="flex text-[#183A37] text-xl font-bold justify-start m-5">
          Rushify
        </h1>
        {hasVideo ? (
          <div>
            <div className="flex flex-row justify-center items-center m-7 font-extrabold">
              <input
                className="border-2 rounded mr-2 w-24 h-[38px]"
                type="number"
                step="0.1"
                value={speed}
                onChange={(e) => {
                  e.target.value ? setSpeed(parseFloat(e.target.value)) : null;
                }}
              />
              {speed !== 0 && (
                <button
                  className="my-6 p-2 ml-2 border-2 w-24 h-[38px] rounded border-[#183A37] bg-[#183A37] text-white hover:bg-[#04151F] hover:border-[#04151F]"
                  onClick={speedHandler}
                >
                  Change!
                </button>
              )}
            </div>
            <p className="flex justify-center m-4 text-sm font-bold">
              Speed : {speed}
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center my-20 mx-6 text-lg">
            <p className="">
              It seems no video is here!
            </p>
          </div>
        )}
        <div className="flex justify-center items-center text-md text-[#183A37] mt-6">
          <a href="https://mobinshahidi.netlify.app" target="blank">mobin shahidi</a>
        </div>
      </div>
    </>
  );
}

export default App;
