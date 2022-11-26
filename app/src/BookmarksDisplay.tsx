export function BookmarksDisplay(props: { list: chrome.bookmarks.BookmarkTreeNode[]; }) {
  return <div id="bookmarksContainer">
    {props.list.length > 0
      ?
      props.list.map((b: chrome.bookmarks.BookmarkTreeNode) => {
        return <p>{b.title}</p>;
      })
      :
      'No bookmarks found'}
  </div>;

}
