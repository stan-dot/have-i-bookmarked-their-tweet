import { truncateTitle } from "../utils/titleUtils";

export function TweetRender(props: { tweet: chrome.bookmarks.BookmarkTreeNode; }) {
  const formattedTitle = truncateTitle(props.tweet.title);
  return (
    <div className="tweet" id={props.tweet.id}>
      <a style={{ textDecoration: 'none' }} href={props.tweet.url}>{formattedTitle}</a>
    </div>
  );
}
