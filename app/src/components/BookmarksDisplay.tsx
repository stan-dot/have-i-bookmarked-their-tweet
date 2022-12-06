import { useState } from "react";
import { TweetRender } from "./TweetRender";

export function BookmarksDisplay(
  props: { tweetList: chrome.bookmarks.BookmarkTreeNode[] },
) {

  const scrollUp = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const scrollMargin = 10;
  window.addEventListener('scroll', (e: Event) => {
    const newState =
      document.body.scrollTop > scrollMargin ||
        document.documentElement.scrollTop > scrollMargin ? 'block' : 'none'
    setScrollUpButtonState(newState);
  })

  const [scrollUpButtonState, setScrollUpButtonState] = useState("none");
  return (
    <div id="bookmarksContainer" >
      {props.tweetList.length > 0
        ? (
          <>
            {props.tweetList.map(t => <TweetRender tweet={t} />)}
            <button
              // style={{ display: "block", zIndex: 10 }}
              style={{ display: `${scrollUpButtonState}`, zIndex: 10 }}
              onClick={scrollUp}
              id="scrolltop-button"
              title="Go to top"
            >
              Top
            </button>
          </>
        )
        : "No bookmarks found"}
    </div>
  );
}

