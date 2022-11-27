import { truncateTitle } from "./utils";

export function TweetRender(props: { tweet: chrome.bookmarks.BookmarkTreeNode; }) {
  const formattedTitle = truncateTitle(props.tweet.title);
  return (
    <div className="tweet" id={props.tweet.id}>
      <a href={props.tweet.url}>{formattedTitle}</a>
    </div>
  );
}
