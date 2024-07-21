// listen to any updates in tabs
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    console.log("send message:", urlParameters.get("v"));

    // send a message to content script so it knows a new video is loaded
    chrome.tabs.sendMessage(tabId, {
      type: "NEW", // type of event, customisable
      videoId: urlParameters.get("v"),
    });
  }
});
