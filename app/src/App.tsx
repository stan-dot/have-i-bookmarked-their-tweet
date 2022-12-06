import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import "./App.css";
import { BookmarksDisplay } from "./components/BookmarksDisplay";
import { DarkToggleButton } from "./components/DarkToggleButton";
import { SearchIcon } from "./components/icons/Search.Icon";
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
    console.log(user);
    return () => { };
  }, []);


  const filteredItems = query === "" ? bkmrksList : bkmrksList.filter(i => {
    return i.title.includes(query.toLowerCase())

  })
  const [searchHighlight, setSearchHighlight] = useState(false);

  return (
    <div className="App" id="app">
      <div className="panel">
        <UserRender user={user} results={bkmrksList.length}>
          <>
            <div className="contrast-elem">
              <SearchIcon highlight={searchHighlight} />
            </div>
            <input value={query} onChange={e => setQuery(e.target.value)}
              onFocus={e => setSearchHighlight(true)}
              onBlur={e => setSearchHighlight(false)}
              type="search" />
            <DarkToggleButton />
          </>
        </UserRender>
      </div>
      <BookmarksDisplay tweetList={filteredItems} />
    </div >
  );
}



