import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import "./App.css";
import { BookmarksDisplay } from "./components/BookmarksDisplay";
import { DarkToggleButton } from "./components/DarkToggleButton";
import { SearchIcon } from "./components/icons/Search.Icon";
import { UserRender } from "./components/UserRender";
import { getMatchingBookmarks, getUserFromUrl } from "./utils/titleUtils";
import { filterAndFormatBookmarksList } from "./utils/bookmarkAndQueryUtils";

const DEFAULT_URL = "https://github.com/";
const tabUrlAtom = atom(DEFAULT_URL);

const DEFAULT_BOOKMARKS: chrome.bookmarks.BookmarkTreeNode[] = [];
const bkmrksAtom = atom(DEFAULT_BOOKMARKS);

const userFromUrl = atom((get) => getUserFromUrl(get(tabUrlAtom)));
const chrome_api_query: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};

export default function App(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);
  const [query, setQuery] = useState("");

  useEffect(() => {
    chrome.tabs.query(chrome_api_query, (tabs) => {
      const url = tabs[0].url ?? "window not found";
      const user = getUserFromUrl(url);
      setUrl(url);
      getMatchingBookmarks(user, (list) => setBkmrksList(list));
    });
    console.log(user);
    return () => { };
  }, [setBkmrksList, setUrl, user]);

  const filteredItems = query === "" ? bkmrksList : filterAndFormatBookmarksList(bkmrksList, query);

  return (
    <div className="App" id="app">
      <div className="panel">
        <UserRender user={user} results={bkmrksList.length}>
          <>
            <div className="contrast-elem">
              <SearchIcon />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
            />
            <DarkToggleButton />
          </>
        </UserRender>
      </div>
      <BookmarksDisplay tweetList={filteredItems} />
    </div>
  );
}

