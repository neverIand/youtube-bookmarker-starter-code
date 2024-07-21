import { getCurrentTab } from "./utils.js";

// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = (e) => {};

const onDelete = (e) => {};

const setBookmarkAttributes = () => {};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getCurrentTab();
  const queryParameters = activeTab.url.split("?")[1]; // yt video id
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];
    });
  } else {
    document.querySelector(
      ".container"
    ).innerHTML = `<div class="title">This is not a youtube video page.</div>`;
  }
});
