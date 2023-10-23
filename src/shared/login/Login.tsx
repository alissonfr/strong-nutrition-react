import './Login.scss';
import * as yup from 'yup';
import { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import LogoDark from './../../assets/logo-dark.png'
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import LoginIcon from '@mui/icons-material/Login';


const loginSchema = yup.object().shape({
  email: yup.string().email('Digite um endereço de email válido').required('O email é obrigatório'),
  password: yup.string().required('A senha é obrigatória').min(5, 'A senha deve ter pelo menos 5 caracteres'),
});

interface LoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<LoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    
    loginSchema
    .validate({ email, password }, { abortEarly: false })
    .then(data => { 
      login(data.email, data.password)
       })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      })
  };

  if (isAuthenticated) return (
    <>{children}</>
  );

  return (
    <div className="login">
      <section className="left">

      </section>
      <section className="right">
        <div className="form-wrapper">
          <div className="border"></div>
          <img src={LogoDark} alt="Logo" />
          <h2>Seja bem-vindo a <b>Strong Nutrition</b></h2>
          <form>
            <Input
              label="Email *"
              placeholder="Email"
              type="email"
              value={email}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={e => {setEmail(e.target.value)}}
              />
            <Input
              label="Senha *"
              placeholder="Senha"
              type="password"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={e => {setPassword(e.target.value)}}
            />
            <div className="button">
              <Button
                color="secondary"
                size="large"
                startIcon={LoginIcon}
                onClick={handleSubmit}>
                Entrar
              </Button>
            </div>

          </form>
        </div>
      </section>
    </div>
  )
};



