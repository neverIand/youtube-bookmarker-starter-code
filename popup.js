import { getCurrentTab } from "./utils.js";

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
  const bookmarkTitleElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");

  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = "bookmark-title";

  newBookmarkElement.id = `bookmark-${bookmark.time}`;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  newBookmarkElement.appendChild(bookmarkTitleElement);
  bookmarksElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = ""; // reset first
  if (currentBookmarks.length > 0) {
    currentBookmarks.forEach((bookmark) => {
      addNewBookmark(bookmarksElement, bookmark);
    });
  } else {
    bookmarksElement.innerHTML = `<i class="row">No bookmarks to show.</i>`;
  }
};

const onPlay = (e) => {};

const onDelete = (e) => {};

const setBookmarkAttributes = () => {};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getCurrentTab();
  const queryParameters = activeTab.url.split("?")[1]; // yt video id
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  console.log(currentVideo);

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

      console.log("currentVideoBookmarks", currentVideoBookmarks);

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    document.querySelector(
      ".container"
    ).innerHTML = `<div class="title">This is not a youtube video page.</div>`;
  }
});
