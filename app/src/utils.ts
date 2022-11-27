export async function getMatchingBookmarks(
  user: string,
  callback: (list: chrome.bookmarks.BookmarkTreeNode[]) => void,
): Promise<void> {
  chrome.bookmarks.search(user, (s) => {
    console.log(`search finished: ${s}`)
    callback(s);
  });
}

export function getUserFromUrl(url: string): string {
  const regex1 = `^https?://(www\.)?twitter\.com/(#!/)?([^/]+)(/\w+)*$`;
  const regex2 =
    `^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?@?([^/?#]*)(?:[?#].*)?$`;
  const match = url.match(regex1);
  const match2 = url.match(regex2);
  try {
    const v1 = match![1] ?? 'nothing';
    console.log(v1)
    const v2 = match2![3] ?? 'nothing';
    console.log(v2)
    return v1.concat(v2)
  } catch (error) {
    
    console.log('e', error)
  }
  return 'not a twitter url'
}

export async function getTabUrl(): Promise<string> {
  const currentTab: chrome.tabs.Tab | undefined = await chrome.tabs
    .getCurrent();
  if (!currentTab) {
    return "";
  }
  return currentTab.url ?? "";
}
