import { toast } from "../../../../src/toast";
import { LuCopy } from "react-icons/lu";
import { VARIANTS } from "../../constants/variants";

const TOAST_BY_TYPE: Record<
  (typeof VARIANTS)[number]["type"],
  typeof toast.success
> = {
  Success: toast.success,
  Error: toast.error,
  Warning: toast.warning,
  Info: toast.info,
};

const Variants = () => {
  const copyCodeToast = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(
        "Copiado com sucesso",
        "Verifique sua área de transferencia",
      );
    } catch {
      toast.error("Erro ao copiar", "Tente novamente mais tarde");
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <header className="space-y-1">
        <span className="text-xl font-semibold">Variantes</span>

        <span className="block text-sm card__muted">
          Cada card mostra a aparência real, quando usar e o snippet
          correspondente.
        </span>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {VARIANTS.map((variant) => (
          <div key={variant.type} className="card overflow-hidden p-4 md:p-6">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div
                  style={{ background: `${variant.color}33` }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl"
                >
                  <span style={{ color: variant.color }}>{variant.icon}</span>
                </div>

                <div>
                  <span className="block font-semibold">{variant.title}</span>

                  <span className="block card__muted text-xs">
                    {variant.subtitle}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  TOAST_BY_TYPE[variant.type](
                    `Toast de ${variant.title}`,
                    `Exemplo real da variante ${variant.title.toLowerCase()}.`,
                  )
                }
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#4238ff] text-white cursor-pointer outline-none"
              >
                Disparar
              </button>
            </header>

            <section
              className="mt-6 border-b pb-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex flex-col space-y-1">
                <span className="block font-semibold text-xs uppercase card__muted leading-2">
                  Quando usar
                </span>

                <span className="text-xs">{variant.usage}</span>
              </div>
            </section>

            <section className="card__code mt-4 overflow-hidden">
              <header
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-sm font-medium">exemplo</span>

                <button
                  className="flex items-center gap-x-1.5 text-sm card__muted cursor-pointer"
                  onClick={() => copyCodeToast(variant.code)}
                >
                  <LuCopy />
                  Copiar
                </button>
              </header>

              <div className="p-4">
                <pre
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  <code>{variant.code}</code>
                </pre>
              </div>
            </section>
          </div>
        ))}
      </main>
    </div>
  );
};

export { Variants };
