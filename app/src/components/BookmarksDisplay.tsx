import { useState } from "react";
import { TweetRender } from "./TweetRender";

export function BookmarksDisplay(
  props: { tweetList: chrome.bookmarks.BookmarkTreeNode[] },
) {
  const scrollHandler = () => {
    const scrollMargin = 10;
    if (
      document.body.scrollTop > scrollMargin ||
      document.documentElement.scrollTop > scrollMargin
    ) {
      setScrollUpButtonState("block");
    } else {
      setScrollUpButtonState("none");
    }
  };

  const scrollUp = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const [scrollUpButtonState, setScrollUpButtonState] = useState("none");

  return (
    <div id="bookmarksContainer" onScroll={scrollHandler}>
      {props.tweetList.length > 0
        ? (
          <>
            <div id="">
            </div>
            {props.tweetList.map((t) => <TweetRender tweet={t} />)}
            <button
              style={{ display: `${scrollUpButtonState}` }}
              onClick={scrollUp}
              id="scrolltop"
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

