import { Header } from "../Header";
import { Variants } from "../Variants";
import { Controls } from "../Controls";
import type { ToastContainerProps } from "../../../../src";

type ContainerProps = {
  settings: ToastContainerProps;
  updateSettings: (patch: Partial<ToastContainerProps>) => void;
  onToggleTheme: () => void;
};

const Container = ({
  settings,
  updateSettings,
  onToggleTheme,
}: ContainerProps) => {
  return (
    <div
      data-theme={settings.theme}
      className="mx-auto lg:max-w-4xl 2xl:max-w-5xl py-10"
    >
      <Header theme={settings.theme ?? "dark"} onToggleTheme={onToggleTheme} />
      <Controls settings={settings} updateSettings={updateSettings} />
      <Variants />
    </div>
  );
};

export { Container };