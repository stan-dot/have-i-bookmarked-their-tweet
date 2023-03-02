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

type SavedData = {
  user: string;
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
};

function saveData({ user, bookmarks }: SavedData): void {
  chrome.storage.local.set({ user: bookmarks }).then(() => {
    console.log("Value is set to " + bookmarks);
  });
}

async function getBookmarksFromStorage(
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

type LoadingStatus = "loading" | "none found" | "ready";
const loadingAtom = atom("loading" as LoadingStatus);

export default function App(): JSX.Element {
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);
  const [query, setQuery] = useState("");
  const [loadingStatus, setLoadingStatus] = useAtom(loadingAtom);

  useEffect(() => {
    chrome.tabs.query(chrome_api_query, (tabs) => {
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
    }
  }, [setBkmrksList, setLoadingStatus, url, user]);

  const filteredItems = query === ""
    ? bkmrksList
    : filterAndFormatBookmarksList(bkmrksList, query);

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
    </div>
  );
}
