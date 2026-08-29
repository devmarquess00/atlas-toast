import { useId } from "react";
import type { ReactNode } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { toast } from "../../../../src/toast";
import type { ToastContainerProps, ToastPositionProps } from "../../../../src";

type ControlsProps = {
  settings: ToastContainerProps;
  updateSettings: (patch: Partial<ToastContainerProps>) => void;
};

const POSITIONS: ReadonlyArray<{
  value: ToastPositionProps;
  label: string;
}> = [
  { value: "top-left", label: "top-left" },
  { value: "top-center", label: "top-center" },
  { value: "top-right", label: "top-right" },
  { value: "bottom-left", label: "bottom-left" },
  { value: "bottom-center", label: "bottom-center" },
  { value: "bottom-right", label: "bottom-right" },
];

type ChoiceButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  "aria-label"?: string;
};

const ChoiceButton = ({
  active,
  onClick,
  children,
  "aria-label": ariaLabel,
}: ChoiceButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    aria-pressed={active}
    onClick={onClick}
    className="flex items-center justify-center gap-x-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors cursor-pointer outline-none"
    style={{
      borderColor: active ? "#4238ff" : "var(--border)",
      backgroundColor: active ? "#4238ff" : "var(--bg-surface)",
      color: active ? "#ffffff" : "var(--text-primary)",
    }}
  >
    {children}
  </button>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <span className="block text-xs font-semibold uppercase tracking-wide card__muted">
    {children}
  </span>
);

type SwitchProps = {
  checked: boolean;
};

const Switch = ({ checked }: SwitchProps) => (
  <span
    className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
    style={{ backgroundColor: checked ? "#4238ff" : "var(--border)" }}
  >
    <span
      className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
      style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
    />
  </span>
);

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Toggle = ({ label, description, checked, onChange }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="card flex items-center justify-between gap-x-4 p-4 text-left outline-none cursor-pointer transition-colors"
  >
    <div className="space-y-0.5">
      <span className="block text-sm font-medium">{label}</span>
      <span className="block text-xs card__muted">{description}</span>
    </div>

    <Switch checked={checked} />
  </button>
);

const Controls = ({ settings, updateSettings }: ControlsProps) => {
  const durationId = useId();
  const maxStacksId = useId();

  const position = settings.position ?? "bottom-right";
  const theme = settings.theme ?? "dark";
  const duration = settings.duration ?? 3000;
  const draggable = settings.draggable ?? false;
  const closeOnClick = settings.closeOnClick ?? true;
  const maxStacks = settings.maxStacks ?? 3;

  return (
    <form
      className="card mt-8 overflow-hidden py-6 px-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="space-y-1">
          <span className="text-xl font-semibold">Configurações do toast</span>

          <span className="block text-sm card__muted">
            Controle as props do ToastContainer em tempo real.
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.success(
              "Configuração aplicada",
              "Este toast usa as opções selecionadas acima.",
            )
          }
          className="rounded-lg bg-[#4238ff] px-4 py-2 text-sm font-medium text-white outline-none cursor-pointer"
        >
          Disparar exemplo
        </button>
      </header>

      <main className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2 ">
        <section className="flex flex-col gap-y-3">
          <FieldLabel>Posição</FieldLabel>

          <div className="grid grid-cols-3 gap-2">
            {POSITIONS.map((option) => (
              <ChoiceButton
                key={option.value}
                active={position === option.value}
                onClick={() => updateSettings({ position: option.value })}
                aria-label={option.label}
              >
                {option.label}
              </ChoiceButton>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-y-3">
          <FieldLabel>Tema</FieldLabel>

          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton
              active={theme === "light"}
              onClick={() => updateSettings({ theme: "light" })}
            >
              <LuSun />
              Claro
            </ChoiceButton>

            <ChoiceButton
              active={theme === "dark"}
              onClick={() => updateSettings({ theme: "dark" })}
            >
              <LuMoon />
              Escuro
            </ChoiceButton>
          </div>
        </section>

        <section className="flex flex-col gap-y-3">
          <FieldLabel>Duração</FieldLabel>

          <div className="mt-auto">
            <input
              id={durationId}
              type="range"
              min={1000}
              max={10000}
              step={250}
              value={duration}
              aria-label="Duração em milissegundos"
              onChange={(event) =>
                updateSettings({ duration: Number(event.target.value) })
              }
              className="w-full cursor-pointer"
              style={{ accentColor: "#4238ff" }}
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs card__muted">
                Quanto tempo fica visível
              </span>

              <span
                className="rounded-lg border px-2 py-1 text-xs font-semibold tabular-nums"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {duration}ms
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-y-3">
          <FieldLabel>Limite de pilha</FieldLabel>

          <div className="mt-auto">
            <input
              id={maxStacksId}
              type="range"
              min={1}
              max={8}
              step={1}
              value={maxStacks}
              aria-label="Máximo de toasts na pilha"
              onChange={(event) =>
                updateSettings({ maxStacks: Number(event.target.value) })
              }
              className="w-full cursor-pointer"
              style={{ accentColor: "#4238ff" }}
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs card__muted">
                Máximo de toasts visíveis
              </span>

              <span
                className="rounded-lg border px-2 py-1 text-xs font-semibold tabular-nums"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {maxStacks} toasts
              </span>
            </div>
          </div>
        </section>
      </main>

      <main className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Toggle
          label="Arrastável"
          description="Permite arrastar o toast para dispensar."
          checked={draggable}
          onChange={(draggable) => updateSettings({ draggable })}
        />

        <Toggle
          label="Botão de fechar"
          description="Exibe o botão X para fechar o toast."
          checked={closeOnClick}
          onChange={(closeOnClick) => updateSettings({ closeOnClick })}
        />
      </main>
    </form>
  );
};

export { Controls };
