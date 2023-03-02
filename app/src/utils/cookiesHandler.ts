
type SavedData = {
  user: string;
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
};

export function saveData({ user, bookmarks }: SavedData): void {
  chrome.storage.local.set({ user: bookmarks }).then(() => {
    console.log("Value is set to " + bookmarks);
  });
}
export async function getBookmarksFromStorage(
  user: string,
): Promise<
  { bookmarks: chrome.bookmarks.BookmarkTreeNode[]; failed: boolean }
> {
  await chrome.storage.local.get([user]).then((bookmarks) => {
    console.log("Value currently is " + bookmarks);
    return { bookmarks: bookmarks, failed: false };
  }).catch((error) => {
    console.error(
      "error in fetching bookmarks from storage for user:",
      user,
      " error message: ",
      error,
    );
    return { bookmarks: [], failed: true };
  });
  return { bookmarks: [], failed: true };
}
