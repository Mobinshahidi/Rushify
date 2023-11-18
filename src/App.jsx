import { useState } from 'react';
import './App.css';

function App() {
	const [speed, setSpeed] = useState(1);
	const speedHandler = () => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTabId = tabs[0].id;
			chrome.tabs.sendMessage(activeTabId, { action: 'changePlaybackSpeed', speed });
		  });
	};
	return (
		<>
			<h1>Video Speed Control</h1>
			<p>Current speed : {speed}</p>
			<input
				type="number"
				step="0.1"
				value={speed}
				onChange={(e) => {
					setSpeed(parseFloat(e.target.value));
				}}
			/>
			<button onClick={speedHandler}>Change Speed</button>
		</>
	);
}

export default App;
