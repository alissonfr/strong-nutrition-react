
import { AuthProvider, DrawerProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { Sidenav, Navbar, Login } from "./components";
import { SnackbarProvider } from './contexts';


function App() {
  return (
    <SnackbarProvider>
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
    </SnackbarProvider>
  );
}

export default App;