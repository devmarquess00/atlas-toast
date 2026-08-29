import { Header } from "../Header";
import { Variants } from "../Variants";

type ContainerProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const Container = ({ theme, onToggleTheme }: ContainerProps) => {
  return (
    <div
      data-theme={theme}
      className="mx-auto 2xl:max-w-5xl 2xl:py-10"
    >
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <Variants />
    </div>
  );
};

export { Container };
