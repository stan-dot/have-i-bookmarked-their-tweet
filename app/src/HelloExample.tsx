import { atom, PrimitiveAtom, useAtom } from "jotai";
import { useEffect } from "react";
import { getMatchingBookmarks, getTabUrl, getUserFromUrl } from "./TabReader";

const DEFAULT_URL = "https://github.com/";
const tabUrl = atom(DEFAULT_URL);

const defaultBookmarks: chrome.bookmarks.BookmarkTreeNode[] = []
const bkmrks = atom(defaultBookmarks)

const userFromUrl = atom((get) => getUserFromUrl(get(tabUrl)))


function BookmarksDisplay(props: {
  list: PrimitiveAtom<chrome.bookmarks.BookmarkTreeNode[]>
}) {
  const [list] = useAtom(props.list)
  return <div id="bookmarksContainer">
    {
      list.length > 0
        ?
        list.map((b: chrome.bookmarks.BookmarkTreeNode) => {
          return <p>{b.title}</p>
        })
        :
        'No bookmarks found'
    }
  </div>

}

export function HelloExample(): JSX.Element {
  const [url] = useAtom(tabUrl);
  const [user] = useAtom(userFromUrl);

  // tabUrl.write(await getTabUrl());

  return (
    <>
      <p>url:{url} </p>
      <p>user:{user}</p>
      <BookmarksDisplay list={bkmrks} />
      <button onClick={() => getMatchingBookmarks(user)}>search</button>
    </>
  );
}
