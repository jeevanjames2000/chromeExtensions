chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openExtensionPopup") {
    chrome.action.openPopup();
  }
});
