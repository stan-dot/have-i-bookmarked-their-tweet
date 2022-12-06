

export function DarkToggleButton() {

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const handleClick = () => {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
    } else {
      document.body.classList.toggle("dark-theme");
    }
  };

  return <button className="btn-toggle" onClick={e => handleClick()}>
    toggle
  </button>
}
