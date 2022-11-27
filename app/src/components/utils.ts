
export async function getMatchingBookmarks(
  user: string,
  callback: (list: chrome.bookmarks.BookmarkTreeNode[]) => void,
): Promise<void> {
  const searchTerm = `twitter.com/${user}`;
  chrome.bookmarks.search(searchTerm, (list) => callback(list));
}

const regex1: RegExp = new RegExp(
  /https?:\/\/(www\.)?(twitter\.com\/(\w+)?)/,
);

// third capturing group is for the username, the first one is for www string
export function getUserFromUrl(url: string): string {
  const match = url.match(regex1);
  try {
    return match![3] ?? "no tweets from this user";
  } catch (error) {
    console.log("e", error);
  }
  return "not a twitter url";
}

export function truncateTitle(title: string): string {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return title
  const delayAfterColon = 3;
  const finishIndex = title.indexOf(" /\ Twitter");
  return title.slice(colonIndex + delayAfterColon, finishIndex - 1);
}
