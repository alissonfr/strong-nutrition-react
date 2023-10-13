
import { AuthProvider, DrawerProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { Sidenav, Navbar, Login } from "./components";


function App() {
  return (
    <AuthProvider>
      <Login>
        <DrawerProvider>
          <BrowserRouter>
            <Navbar/>
            <Sidenav>
              conteudo
            </Sidenav>
          </BrowserRouter>
        </DrawerProvider>
      </Login>
    </AuthProvider>
  );
}

export default App;