export async function getMatchingBookmarks(
  user: string,
  callback: (list: chrome.bookmarks.BookmarkTreeNode[]) => void,
): Promise<void> {
  chrome.bookmarks.search(user, (s) => {
    console.log(`search finished: ${s}`);
    callback(s);
  });
}

export function getUserFromUrl(url: string): string {
  const regex1: RegExp = new RegExp(
    /https?:\/\/(www\.)?(twitter\.com\/(\w+)?)/
    // /https?:\/\/(www\.)?twitter\.com\/(#!/)?([/]+)(\/\w+)*$/
    // "^https?://(www\.)?twitter\.com/(#!/)?([^/]+)(/\w+)*$",
    // "^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?@?([^/?#]*)(?:[?#].*)?$",
  );
  const match = url.match(regex1);
  console.log(match)
  try {
    // second capturing group is for the username, the first one is for www string
    const v1 = match![3] ?? "nothing";
    console.log(v1);
    return match![2] ?? v1
  } catch (error) {
    console.log("e", error);
  }
  return "not a twitter url";
}
