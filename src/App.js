import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <form>
          <p>Seja bem vindo</p>
          <h1>Faça o login na sua conta</h1>
          <label>Email</label>
          <input type="email" />
          <label>Senha</label>
          <input type="password" />
          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
