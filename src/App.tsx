import { toast } from "./toast";
import "./app.css";

function App() {
  return (
    <div>
      <p>Atlas Toast</p>
      <button onClick={() => toast.success("Sucesso!", "O seu agendamento foi registrado")}>onClick</button>
    </div>
  );
}

export default App;
