import { atom, useAtom } from "jotai";
import React, { ChangeEvent } from "react";

const textAtom = atom("hello");
const uppercaseAtom = atom(
  (get) => get(textAtom).toUpperCase(),
);

// Use them anywhere in your app
const Input = () => {
  const [text, setText] = useAtom(textAtom);
  const handler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  return <input value={text} onChange={handler} />;
};

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom);
  return <div>Uppercase: {uppercase}</div>;
};

export function HelloExample(): JSX.Element {
  return (
    <>
      <Input />
      <Uppercase />
    </>
  );
}
