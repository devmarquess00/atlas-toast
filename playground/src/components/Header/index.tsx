import { LuMoon, LuSun } from "react-icons/lu";

type HeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between text-(--text-primary)">
      <h1 className="text-3xl font-semibold">Atlas Toast Playground</h1>
      <button
        onClick={onToggleTheme}
        className="flex items-center gap-x-2 px-4 py-3 rounded-xl border text-(--text-primary) cursor-pointer"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        {isDark ? <LuSun /> : <LuMoon />}
        <span className="text-sm">{isDark ? "Tema Claro" : "Tema Escuro"}</span>
      </button>
    </div>
  );
};

export { Header };
