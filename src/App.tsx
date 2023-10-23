
import { AuthProvider, DrawerProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { Sidenav, Navbar, Login } from "./shared";
import { SnackbarProvider } from './contexts';
import { AppRoutes } from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';


declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F244E'
    },
    secondary: {
      main: '#5aba47'
    }
  },
}, ptBR);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
      <AuthProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <Navbar/>
              <Sidenav>
                <AppRoutes/>
              </Sidenav>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AuthProvider>
    </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;