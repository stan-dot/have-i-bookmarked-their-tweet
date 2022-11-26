
// todo use the chrome api
export function getMatchingBookmarks(user: string): chrome.bookmarks.BookmarkTreeNode[]{
    chrome.bookmarks.search(user,
      (s) => console.log(`search finished: ${s}`)
    );
  return []
};

// todo need to use regex
export function getUserFromUrl(url: string): string {
  return url
}

export async function getTabUrl(): Promise<string>{
  const currentTab:chrome.tabs.Tab | undefined = await chrome.tabs.getCurrent();
  if (!currentTab) {
    return ""
  }
  return currentTab.url ?? "" 
}
