
export function UserRender(props: { user: string; results: number }) {
  return (
    <div className="header">
      user: <span className="username">{props.user}</span>, {props.results.toString()} tweets
    </div>
  );
}
