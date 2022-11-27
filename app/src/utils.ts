export async function getMatchingBookmarks(
  user: string,
  callback: (list: chrome.bookmarks.BookmarkTreeNode[]) => void,
): Promise<void> {
  const searchTerm = `twitter.com/${user}`;
  chrome.bookmarks.search(
    searchTerm,
    (list: chrome.bookmarks.BookmarkTreeNode[]) => {
      // console.log(`search finished: ${list}`);
      callback(list);
    },
  );
}

export function getUserFromUrl(url: string): string {
  const regex1: RegExp = new RegExp(
    /https?:\/\/(www\.)?(twitter\.com\/(\w+)?)/,
  );
  const match = url.match(regex1);
  // console.log(match);
  try {
    // third capturing group is for the username, the first one is for www string
    return match![3] ?? "no tweets from this user";
    // console.log(v1);
    // return match![2] ?? v1
  } catch (error) {
    console.log("e", error);
  }
  return "not a twitter url";
}
