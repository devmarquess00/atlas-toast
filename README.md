# Atlas Toast 🤺

Uma biblioteca de toasts elegante e leve para sua aplicação React, com notificações personalizáveis, suporte a temas, posições flexíveis, limite de pilha, gesture de arraste e toasts de promise.

## 📦 Instalação

```bash
# npm
npm install atlas-toast

# yarn
yarn add atlas-toast

# pnpm
pnpm add atlas-toast
```

## 🚀 Recursos

- Múltiplos tipos de toast: `success`, `info`, `warning`, `error` e `promise`.
- Posicionamento flexível: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` e `bottom-right`.
- Gestos de arrastar (drag to dismiss): suporte nativo a mouse e touch para fechar deslizando.
- Controle de duração: defina quanto tempo cada toast permanece na tela.
- Limite de pilha (`maxStacks`): controle o máximo de toasts visíveis ao mesmo tempo.
- Suporte a temas: alternância nativa entre `light` e `dark`.
- Toast de promise: loading animado que vira sucesso ou erro automaticamente.
- Sem customização externa necessária: o CSS é importado automaticamente.
- Totalmente tipado: criado do zero com TypeScript.

## 🚩 Uso básico

Para que os toasts sejam exibidos, é preciso renderizar o componente `ToastContainer` na sua aplicação (geralmente no nível raiz). O CSS já é importado automaticamente, então não precisa configurar nada a mais.

```tsx
import { ToastContainer, toast } from "atlas-toast";

const App = () => {
  const showToastSuccess = () => {
    toast.success("Toast de sucesso", "Descrição toast de sucesso");
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={showToastSuccess}>Mostrar Toast Success</button>
    </div>
  );
};

export default App;
```

## ⚙️ Configurando o `ToastContainer`

O `ToastContainer` aceita props para controlar o comportamento global de todos os toasts:

```tsx
<ToastContainer
  theme="light" // 'light' | 'dark' (padrão: 'dark')
  position="top-right" // top-right | top-left | top-center | bottom-right | bottom-left | bottom-center (padrão: 'bottom-right')
  duration={3000} // tempo em ms que o toast permanece na tela (padrão: 3000)
  draggable // permite arrastar o toast para dispensar (padrão: false)
  closeOnClick // exibe o botão de fechar (padrão: true)
  maxStacks={3} // máximo de toasts visíveis ao mesmo tempo (padrão: sem limite)
/>
```

| Prop           | Tipo                 | Padrão           | Descrição                                        |
| -------------- | -------------------- | ---------------- | ------------------------------------------------ |
| `theme`        | `'light' \| 'dark'`  | `'dark'`         | Tema visual dos toasts.                          |
| `position`     | `ToastPositionProps` | `'bottom-right'` | Posição fixa do container na tela.               |
| `duration`     | `number`             | `3000`           | Tempo em milissegundos que o toast fica visível. |
| `draggable`    | `boolean`            | `false`          | Habilita arrastar o toast para dispensar.        |
| `closeOnClick` | `boolean`            | `true`           | Mostra o botão de fechar no toast.               |
| `maxStacks`    | `number`             | ∞ (ilimitado)    | Máximo de toasts exibidos ao mesmo tempo.        |

### Limite de pilha (`maxStacks`)

Quando o número de toasts atinge o valor de `maxStacks`, novos toasts são **ignorados** até que algum seja removido. Exemplo:

```tsx
<ToastContainer maxStacks={3} />
```

```tsx
toast.success("Primeiro", "Vai passar");
toast.success("Segundo", "Vai passar");
toast.success("Terceiro", "Vai passar");
toast.success("Quarto", "Ignorado: pilha cheia"); // não aparece enquanto a pilha não esvaziar
```

## 🎨 API de toasts

Todos os métodos aceitam `(title: string, description?: string)`:

```tsx
toast.success("Título", "Descrição");
toast.info("Título", "Descrição");
toast.warning("Título", "Descrição");
toast.error("Título", "Descrição");
```

### Toast de promise

O `toast.promise` mostra um loading animado enquanto a promise está pendente e, ao resolver, transforma o toast em sucesso; se rejeitar, vira erro automaticamente.

```tsx
import { toast } from "atlas-toast";

const fetchData = async () => {
  const response = await fetch("url");
  return response.json();
};

const showToastPromise = async () => {
  const result = await toast.promise(fetchData, {
    pendingTitle: "Carregando...",
    pendingDescription: "Descrição carregando",
    resolvedTitle: "Chamada concluída",
    resolvedDescription: "Descrição chamada concluída",
    errorTitle: "Falha na chamada",
    errorDescription: "Descrição de erro",
  });
};
```

### Opções do `toast.promise`

| Opção                 | Tipo     | Padrão                             | Descrição                              |
| --------------------- | -------- | ---------------------------------- | -------------------------------------- |
| `pendingTitle`        | `string` | `'Carregando...'`                  | Título exibido enquanto está pendente. |
| `pendingDescription`  | `string` | `'Chamada está sendo processada!'` | Descrição do estado pendente.          |
| `resolvedTitle`       | `string` | `'Sucesso!'`                       | Título após a promise resolver.        |
| `resolvedDescription` | `string` | `'Chamada resolvida com sucesso!'` | Descrição do estado resolvido.         |
| `errorTitle`          | `string` | `'Erro!'`                          | Título após a promise rejeitar.        |
| `errorDescription`    | `string` | `'Erro ao processar a chamada!'`   | Descrição do estado de erro.           |

> A promise ainda lança o erro após atualizar o toast, para que você possa tratar na sua aplicação.

## 📦 Exemplo completo

```tsx
import { ToastContainer, toast } from "atlas-toast";

const App = () => {
  return (
    <>
      <ToastContainer
        theme="light"
        position="bottom-right"
        duration={4000}
        draggable
        closeOnClick
        maxStacks={5}
      />

      <button
        onClick={() =>
          toast.success("Tudo certo!", "Ação concluída com sucesso.")
        }
      >
        Disparar sucesso
      </button>
    </>
  );
};
```
