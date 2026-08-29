import { LuCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";

export const VARIANTS = [
  {
    type: "Success",
    title: "Success",
    icon: <LuCheck />,
    color: "#10b981",
    subtitle: "Confirma que a ação terminou bem.",
    usage: "Salvar, confirmar ações, concluir operações com sucesso.",
    code: `toast.success({
  title: "Ação concluída com sucesso",
  description: "Seus dados foram salvos com sucesso.",
  duration: 4000,
  styleVariant: "filled",
  showProgress: true,
})`,
  },

  {
    type: "Error",
    title: "Error",
    icon: <LuX />,
    color: "#ef4444",
    subtitle: "Indica erro em uma ação.",
    usage: "Falha no pagamento, erro ao salvar, operação recusada.",
    code: `toast.error({
  title: "Não foi possível concluir",
  description: "Tente novamente em alguns instantes.",
  duration: 4000,
  styleVariant: "filled",
  showProgress: true,
})`,
  },

  {
    type: "Warning",
    title: "Warning",
    icon: <LuTriangleAlert />,
    color: "#f59e0b",
    subtitle: "Avisa sobre um risco antes que vire problema.",
    usage: "Avisar sobre ações que exigem atenção do usuário.",
    code: `toast.warning({
  title: "Atenção",
  description: "A ação pode ter impacto nos seus dados.",
  duration: 4000,
  styleVariant: "filled",
  showProgress: true,
})`,
  },

  {
    type: "Info",
    title: "Info",
    icon: <LuInfo />,
    color: "#4840cb",
    subtitle: "Apresenta uma informação relevante.",
    usage: "Atualizações, informações adicionais e orientações.",
    code: `toast.info({
  title: "Nova atualização",
  description: "Uma nova versão está disponível.",
  duration: 4000,
  styleVariant: "filled",
  showProgress: true,
})`,
  },
] as const;
