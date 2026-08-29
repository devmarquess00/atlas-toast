import { useEffect, useState } from "react";
import "./App.css";
import { Container } from "./components/Container";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return <Container theme={theme} onToggleTheme={toggleTheme} />;
}

export default App;
