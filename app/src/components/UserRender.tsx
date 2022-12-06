export function UserRender(props: { user: string; results: number; children: JSX.Element }) {
  return (
    <div className="panel">
      user: <span className="username">{props.user}</span>,{" "}
      {props.results.toString()} tweets
      {props.children}
    </div>
  );
}
