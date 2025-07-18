// Background script for Chrome extension

// Listen for extension icon click
chrome.action.onClicked.addListener(async () => {
  try {
    // Get current active window's active tab.
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentWindow = await chrome.windows.get(currentTab.windowId);

    // Calculate position to center the popup
    const width = 900;
    const height = 400;
    const left = Math.round(currentWindow.left + (currentWindow.width - width) / 2);
    const top = Math.round(currentWindow.top + (currentWindow.height - height) / 2);
    
    // Get current tab's title and URL
    const tabTitle = encodeURIComponent(currentTab.title || '');
    const tabUrl = encodeURIComponent(currentTab.url || '');

    // Create URL with query parameters
    const popupUrl = `popup.html?title=${tabTitle}&url=${tabUrl}`;

    // Create a new popup window with specified dimensions and position
    await chrome.windows.create({
      url: popupUrl,
      type: 'popup',
      width: width,
      height: height,
      left: left,
      top: top
    });
  } catch (error) {
    console.error('Error opening popup:', error);
  }
});