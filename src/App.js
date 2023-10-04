import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <p>Seja bem-vindo</p>
        <h1>Faça o login na sua conta</h1>
        <div className="inputs">
          <label>Email</label>
          <input type="email" />
          <label>Senha</label>
          <input type="password" />
        </div>
        <div className="footer">
          <div>
            <input type="checkbox" id="lembrar" />
            <label for="lembrar">Lembrar senha</label>
          </div>
          <div>
            <a href="">
              <label id="link">Esqueci a senha?</label>
            </a>
          </div>
        </div>
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
