export function UserRender(props: { user: string; results: number; children: JSX.Element }) {
  return (
    <div className="panel">
      <div className="panel-item" id={`panel-item-${1}`}>
        {props.results.toString()} tweets by <span className="username">{props.user}</span>
      </div>
      <div className="panel-item" id={`panel-item-${2}`}>
        {props.children}
      </div>
    </div>
  );
}
