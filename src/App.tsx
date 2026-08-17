import { toast } from "./lib/toast"

function App() { 
  const onToast = () => {
    toast.success('Usuário criado', 'Seu usuário foi criado com sucesso no sistema!')
  }

  return (
    <div>
      <p>Atlas Toast</p>

      <button onClick={onToast}>onToast</button>
    </div>
  )
}

export default App
