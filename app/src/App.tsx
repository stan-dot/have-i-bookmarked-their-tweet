import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import "./App.css";
import { BookmarksDisplay } from "./components/BookmarksDisplay";
import { UserRender } from "./components/UserRender";
import { getMatchingBookmarks, getUserFromUrl } from "./components/utils";

const DEFAULT_URL = "https://github.com/1";
const tabUrlAtom = atom(DEFAULT_URL);

const DEFAULT_BOOKMARKS: chrome.bookmarks.BookmarkTreeNode[] = [];
const bkmrksAtom = atom(DEFAULT_BOOKMARKS);

const userFromUrl = atom((get) => getUserFromUrl(get(tabUrlAtom)));
const chrome_api_query: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};

export default function App(): JSX.Element {
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);
  const [query, setQuery] = useState("");

  const bookmarkCallback = (list: chrome.bookmarks.BookmarkTreeNode[]): void =>
    setBkmrksList(list);

  useEffect(() => {
    chrome.tabs.query(chrome_api_query, (tabs) => {
      const url = tabs[0].url ?? "window not found";
      const user = getUserFromUrl(url);
      setUrl(url);
      getMatchingBookmarks(user, bookmarkCallback);
    });
    return () => { };
  }, []);


  const filteredItems = query === "" ? bkmrksList : bkmrksList.filter(i => {
    return i.title.includes(query.toLowerCase())
  })

  return (
    <div className="App">
      <div className="panel">
        <UserRender user={user} results={bkmrksList.length}>
          <div>
            search:
            <input value={query} onChange={e => setQuery(e.target.value)}
              type="search" />
          </div>
        </UserRender>
      </div>
      <BookmarksDisplay tweetList={filteredItems} />
    </div>
  );
}


