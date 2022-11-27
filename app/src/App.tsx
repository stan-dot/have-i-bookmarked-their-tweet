import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import "./App.css";
import { BookmarksDisplay } from "./BookmarksDisplay";
import { getMatchingBookmarks, getTabUrl, getUserFromUrl } from "./utils";

const DEFAULT_URL = "https://github.com/";
const tabUrlAtom = atom(DEFAULT_URL);

const DEFAULT_BOOKMARKS: chrome.bookmarks.BookmarkTreeNode[] = [];
const bkmrksAtom = atom(DEFAULT_BOOKMARKS);

const userFromUrl = atom((get) => getUserFromUrl(get(tabUrlAtom)));

export default function App(): JSX.Element {
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);

  const bookmarkCallback = (list: chrome.bookmarks.BookmarkTreeNode[]): void =>
    setBkmrksList(list);
  useEffect(() => {
    getTabUrl().then((url: string) => {
      setUrl(url);
      const user = getUserFromUrl(url);
      getMatchingBookmarks(user, bookmarkCallback);
      console.log(url, user, bkmrksList);
    });
    return () => { };
  }, []);

  console.log(url, user, bkmrksList);

  return (
    <div className="App">
      <header className="App-header">
        <p>url:{url}</p>
        <p>user:{user}</p>
        <BookmarksDisplay list={bkmrksList} />
        <button onClick={() => getMatchingBookmarks(user, bookmarkCallback)}>
          search
        </button>
      </header>
    </div>
  );
}
