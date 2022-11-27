import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import "./App.css";
import { BookmarksDisplay } from "./components/BookmarksDisplay";
import { UserRender } from "./components/UserRender";
import { getUserFromUrl, getMatchingBookmarks } from "./components/utils";

const DEFAULT_URL = "https://github.com/1";
const tabUrlAtom = atom(DEFAULT_URL);

const DEFAULT_BOOKMARKS: chrome.bookmarks.BookmarkTreeNode[] = [];
const bkmrksAtom = atom(DEFAULT_BOOKMARKS);

const userFromUrl = atom((get) => getUserFromUrl(get(tabUrlAtom)));
const query: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};

export default function App(): JSX.Element {
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);

  const bookmarkCallback = (list: chrome.bookmarks.BookmarkTreeNode[]): void =>
    setBkmrksList(list);

  const doOnceUrlKnown = (url: string): void => {
    setUrl(url);
    const user = getUserFromUrl(url);
    getMatchingBookmarks(user, bookmarkCallback);
  };

  useEffect(() => {
    chrome.tabs.query(query, (tabs) => {
      const url = tabs[0].url ?? "window not found";
      doOnceUrlKnown(url);
    });
    return () => { };
  }, []);


  return (
    <div className="App">
      <UserRender user={user} results={bkmrksList.length} />
      <BookmarksDisplay tweetList={bkmrksList} />
    </div>
  );
}


