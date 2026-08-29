# Altas Toast 🤺

Uma biblioteca de toasts elegante e leve para sua aplicação, com notificações personalizáveis, suporte a temas, posições flexíveis e interação por arraste (draggable).

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
- Múltipos tipos de toast: (`success`, `info`, `warning`, `error` e `promise`).
- Posicionamento flexível: (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`).
- Gestos de Arrastar (Drag to Dismiss): Suporte nativo a ponteiros touch e mouse para fechar deslizando.
- Suporte para fechamento: Você define o tempo de duração do toast na tela.
- Suporte a Temas: Alternância nativa entre temas `light` e `dark`.
- Totalmente Tipado: Criado do zero com TypeScript

## 🚩 Uso básico

Para que os toasts sejam exibidos, é preciso renderizar o componente `ToastContainer` na sua aplicação (geralmente no nível raiz). O CSS já é importado automaticamente por ele, então não precisa configurar nada a mais.

```tsx
import { ToastContainer, toast } from 'atlas-toast'

const App = () => {
  const showToastSuccess = () => {
    toast.success("Toast de sucesso", "Descrição toast de sucesso")
  }

  return (
    <div>
      <button onClick={showToastSuccess}>Mostrar Toast</button>

      <ToastContainer />
    </div>
  )
}
```

## ⚙️ Configurando o ToastContainer

O `ToastContainer` aceita algumas props para controlar o comportamento global dos toasts:

```tsx
<ToastContainer
  theme="light"        // 'light' | 'dark'
  position="top-right" // top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
  duration={3000}      // tempo em ms que o toast permanece na tela
  draggable            // arrastar o toast para fechar
  closeOnClick         // mostra botão de fechar
/>
```

## 🎨 Outros tipos de toast

```tsx
toast.success("Título", "Descrição")
toast.info("Título", "Descrição")
toast.warning("Título", "Descrição")
toast.error("Título", "Descrição")

// Toast de promise (loading -> sucesso/erro)
const result = await toast.promise(fetchData)
```
