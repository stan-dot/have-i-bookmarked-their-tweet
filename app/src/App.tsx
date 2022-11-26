import './App.css';
import { atom, PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { getMatchingBookmarks, getTabUrl, getUserFromUrl } from "./utils";
import { BookmarksDisplay } from './BookmarksDisplay';

const DEFAULT_URL = "https://github.com/";
const tabUrlAtom = atom(DEFAULT_URL);

const DEFAULT_BOOKMARKS: chrome.bookmarks.BookmarkTreeNode[] = []
const bkmrksAtom = atom(DEFAULT_BOOKMARKS)

const userFromUrl = atom((get) => getUserFromUrl(get(tabUrlAtom)))


export default function App(): JSX.Element {
  const [url, setUrl] = useAtom(tabUrlAtom);
  const [user] = useAtom(userFromUrl);
  const [bkmrksList, setBkmrksList] = useAtom(bkmrksAtom);

  useEffect(() => {
    getTabUrl().then((url: string) => {
      setUrl(url);
      const user = getUserFromUrl(url);
      getMatchingBookmarks(user).then(list => {
        setBkmrksList(list);
      })
      console.log(url, user, bkmrksList);
    })
    return () => { }
  }, [])

  console.log(url, user, bkmrksList);

  return (
    <div className="App">
      <header className="App-header">
        <p>url:{url} </p>
        <p>user:{user}</p>
        <BookmarksDisplay list={bkmrksList} />
        <button onClick={() => getMatchingBookmarks(user)}>search</button>
      </header>
    </div>
  );
}
