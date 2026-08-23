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
#### Exemplo 1 - Toast de Sucesso

```tsx
import { toast } from 'atlas-toast'

const App () {
  const showToastSuccess = () => {
    toast.success("Toast de sucesso", "Descrição toast de sucesso"
  }

  return (
    <div>
      <button onClick={showToastSuccess}>Mostrar Toast</button>
    </div>
  )
}
```
