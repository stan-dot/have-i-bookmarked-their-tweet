

export function DarkToggleButton() {

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const handleClick = () => {
    if (prefersDarkScheme.matches) {
      document.getElementById("app")!.classList.toggle("light-theme");
    } else {
      document.getElementById("app")!.classList.toggle("dark-theme");
    }
  };

  return <button className="btn-toggle" onClick={e => handleClick()}>
    toggle
  </button>
}
