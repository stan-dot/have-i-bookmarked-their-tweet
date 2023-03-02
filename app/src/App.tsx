import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import "./App.css";
import { BookmarksDisplay } from "./components/BookmarksDisplay";
import { DarkToggleButton } from "./components/DarkToggleButton";
import { SearchIcon } from "./components/icons/Search.Icon";
import { UserRender } from "./components/UserRender";
import { filterAndFormatBookmarksList } from "./utils/bookmarkAndQueryUtils";
import { getBookmarksFromStorage, saveData } from "./utils/cookiesHandler";
import { getMatchingBookmarks, getUserFromUrl } from "./utils/titleUtils";

// TYPES
type LoadingStatus = "loading" | "none found" | "ready" | "not a twitter url";

// PRIMITIVE ATOMS
const tabUrlAtom = atom("https://github.com/");
const bkmrksAtom = atom([] as chrome.bookmarks.BookmarkTreeNode[]);
const queryAtom = atom("");
const loadingAtom = atom("loading" as LoadingStatus);

// DERIVATIVE ATOMS
const userFromUrl = atom((get) => getUserFromUrl(get(tabUrlAtom)));

export default function App(): JSX.Element {
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const [loadingStatus, setLoadingStatus] = useAtom(loadingAtom);

  const filteredItems = filterAndFormatBookmarksList(bkmrksList, query);

  // USE EFFECT BLOCKS
  useEffect(() => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      const url = tabs[0].url ?? "window not found";
      setUrl(url);
    });
  }, [setUrl]);

  useEffect(() => {
    saveData({ user, bookmarks: bkmrksList });
  }, [bkmrksList, user]);

  useEffect(() => {
    // const user = getUserFromUrl(url); // don't need this due to Atom
    if (user !== "not a twitter url") {
      setLoadingStatus("loading");
      getBookmarksFromStorage(user).then(({ bookmarks, failed }) => {
        if (failed) {
          getMatchingBookmarks(user, (list) => {
            if (list.length === 0) {
              setLoadingStatus("none found");
            } else {
              setBkmrksList(list);
              setLoadingStatus("ready");
            }
          });
        } else {
          setBkmrksList(bookmarks);
        }
      });
    } else {
      setLoadingStatus("not a twitter url");
    }
  }, [setBkmrksList, setLoadingStatus, url, user]);

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
      {loadingStatus === "ready" &&
        <BookmarksDisplay tweetList={filteredItems} />}
      {loadingStatus === "loading" && <h1>Loading...</h1>}
      {loadingStatus === "none found" && (
        <h1>No bookmarked tweets from this user!</h1>
      )}
      {loadingStatus === "not a twitter url" && (
        <h1>Now you are not on a Twitter page!</h1>
      )}
    </div>
  );
}
