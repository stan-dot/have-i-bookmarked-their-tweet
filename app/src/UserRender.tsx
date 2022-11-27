
export function UserRender(props: { user: string; }) {
  return (
    <div className="username">
      user: <span className="userspan">{props.user}</span>
    </div>
  );
}
