
# Rushify 

Rushify is a browser extension for Chrome and Firefox that allows users to change the playback speed of the currently playing video on a webpage. This extension detects if a video is present on the active tab and allows users to adjust the playback speed through a simple interface. You can change the playback speed up to 16x.


## Features 

- Detects if a video is present on the current webpage.
- Simple and intuitive user interface.
- Allows the user to change the playback speed of the video up to 16x.



## Installation

1. Clone or download the repository to your local machine.

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build-extension
```
4. Load the extension in your browser:

**For Chrome:**
- Open Chrome and go to chrome://extensions/.
- Enable "Developer mode" by clicking the toggle switch in the top right corner.
- Click "Load unpacked" and select the build folder of your project.

**For Firefox:**
1. Open Firefox.
2. Navigate to `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on...".
4. Select the `manifest.json` file from the extension's `build` directory (or the directory containing the `manifest.json` and other extension files if you are not using a build step).

    
## Usage

1. Navigate to any webpage with a video.
2. Click on the Rushify extension icon in your browser's toolbar.
3. If a video is detected, you can see the current playback speed and change it using the input field and the "Change!" button.
4. If no video is detected, a message will be displayed indicating that no video is present.


## Contributing
Contributions to the project are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on GitHub.
## License

This project is licensed under the [MIT License](https://github.com/Mobinshahidi/Rushify/blob/master/LICENSE).

