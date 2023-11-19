import React, { useState, useEffect } from 'react';

function App() {
	const [speed, setSpeed] = useState(1);
	const [hasVideo, setHasVideo] = useState(false);

	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTabId = tabs[0].id;
			chrome.tabs.sendMessage(
				activeTabId,
				{ action: 'checkVideoPresence' },
				(response) => {
					setHasVideo(response.hasVideo);
				},
			);
		});
	}, []);

	const speedHandler = () => {
		try {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const activeTabId = tabs[0].id;
				chrome.tabs.sendMessage(activeTabId, {
					action: 'changePlaybackSpeed',
					speed,
				});
			});
		} catch (error) {
			console.error('Error in speedHandler:', error);
		}
	};

	return (
		<>
			<div className="w-64 h-64">
				<h1 className="items-center flex text-lg font-bold justify-center m-5">
					Video Speed Control
				</h1>
				{hasVideo ? (
					<div>
						<p className="flex justify-center m-4 text-sm font-bold">
							Speed : {speed}
						</p>
						<div className="flex flex-col justify-between items-center m-7">
							<input
								className="border-2 rounded"
								type="number"
								step="0.1"
								value={speed}
								onChange={(e) => {
									e.target.value ? setSpeed(parseFloat(e.target.value)) : null;
								}}
							/>
							{speed !== 0 && (
								<button
									className="m-6 p-2 border-2 rounded border-lime-950 bg-lime-950 text-white hover:bg-lime-900 hover:border-lime-900"
									onClick={speedHandler}
								>
									Change Speed
								</button>
							)}
						</div>
					</div>
				) : (
					<p className='flex justify-center my-20 text-xl font-bold'>It seems no video is here.</p>
				)}
			</div>
		</>
	);
}

export default App;
