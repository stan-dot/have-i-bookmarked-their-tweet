


export function getMatchingBookmarks(user: string): chrome.bookmarks.BookmarkTreeNode[]{

  return []
};

function getUserFromUrl(url: string): string {
  return "";
}

async function getTabUrl(): Promise<string> {
  window.location.toString();
  const tab = await chrome.tabs.getCurrent();
  return tab?.url ?? "";
}
