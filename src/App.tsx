import { toast } from "./toast";

function App() {
  return (
    <div>
      <p>Atlas Toast</p>
      <button onClick={() => toast.info('Sucesso!')}>onClick</button>
    </div>
  );
}

export default App;
