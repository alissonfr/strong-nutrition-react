
import { AuthProvider, DrawerProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { Sidenav, Navbar } from "./components";
import { Login } from './pages';


function App() {
  return (
    <AuthProvider>
      <Login>
        <DrawerProvider>
          <BrowserRouter>
            <Navbar/>
            <Sidenav>
              aaaaaaaa
            </Sidenav>
          </BrowserRouter>
        </DrawerProvider>
      </Login>
    </AuthProvider>
  );
}

export default App;