export function filterAndFormatBookmarksList(
  bkmrksList: chrome.bookmarks.BookmarkTreeNode[],
  query: string,
): chrome.bookmarks.BookmarkTreeNode[] {
  if (query === "") return bkmrksList;
  return bkmrksList.filter((i) => i.title.includes(query.toLowerCase())).map(
    (i: chrome.bookmarks.BookmarkTreeNode) => {
      return { ...i, title: getQueryHighlight(i.title, query) };
    },
  );
}
// todo highlight of queries
// https://stackoverflow.com/questions/67765118/how-to-add-bold-style-to-a-substring-in-react
// an elaborate solution like this one will be needed
// likewise, capture nested URLs https://regexr.com/39nr7
function getQueryHighlight(text: string, query: string): string {
  const reg = new RegExp(query, "gi");
  const matches = text.match(reg);
  console.log(matches);
  const final_str = text.replace(reg, (str) => `***${str}***`);
  return final_str;
}
