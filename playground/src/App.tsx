import { useEffect, useState } from "react";
import "./App.css";
import { Container } from "./components/Container";
import { ToastContainer } from "../../src";
import type { ToastContainerProps } from "../../src";

function App() {
  const [settings, setSettings] = useState<ToastContainerProps>({
    theme: "dark",
    position: "bottom-right",
    duration: 3000,
    draggable: true,
    closeOnClick: true,
    maxStacks: 3,
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      settings.theme ?? "dark",
    );
  }, [settings.theme]);

  const updateSettings = (patch: Partial<ToastContainerProps>) =>
    setSettings((previous) => ({ ...previous, ...patch }));

  const toggleTheme = () =>
    updateSettings({
      theme: settings.theme === "dark" ? "light" : "dark",
    });

  return (
    <>
      <Container
        settings={settings}
        updateSettings={updateSettings}
        onToggleTheme={toggleTheme}
      />
      <ToastContainer {...settings} />
    </>
  );
}

export default App;