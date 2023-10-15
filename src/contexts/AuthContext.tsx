import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from './SnackbarContext';
import { Api } from '../services/axios-config';

interface AuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as AuthContextData);
const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USER_KEY = 'user';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const showSnackbar = useSnackbar();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await Api.post('/auth/login', { email, password });
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(data.token));
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.user));
      setToken(data.token);
      showSnackbar('Usuário logado com sucesso!', 'success');
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
    }
  }, [showSnackbar]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setToken(undefined);
    showSnackbar('Usuário deslogado com sucesso!', 'success');
  }, [showSnackbar]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000;
        if (Date.now() >= expirationTime) {
          handleLogout();
        }
      }
    };

    const tokenCheckInterval = setInterval(checkTokenExpiration, 5000); // Verifique a cada minuto
    return () => clearInterval(tokenCheckInterval);
  }, [token, handleLogout]);

  const isAuthenticated = useMemo(() => !!token, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
