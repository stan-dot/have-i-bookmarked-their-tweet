import { truncateTitle } from "./utils";


export function BookmarksDisplay(props: { tweetList: chrome.bookmarks.BookmarkTreeNode[]; }) {
  return <div id="bookmarksContainer">
    {props.tweetList.length > 0
      ?
      props.tweetList.map(t => <TweetRender tweet={t} />) :
      'No bookmarks found'}
  </div>;
}


function TweetRender(props: { tweet: chrome.bookmarks.BookmarkTreeNode }) {
  const formattedTitle = truncateTitle(props.tweet.title);
  return <div className="tweet" id={props.tweet.id}>
    <a href={props.tweet.url}>{formattedTitle}</a>
  </div >
}
