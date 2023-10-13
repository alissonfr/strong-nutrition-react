import './Login.scss';
import * as yup from 'yup';
import { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import { Input } from './components/input/Input';
import { Button } from './components/button/Button';
import LogoDark from './../../assets/logo-dark.png'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

interface LoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<LoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {
            setIsLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
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
              label="Email"
              type="email"
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={setEmail}
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={setPassword}
            />
            <div className="button">
              <Button
                variant="contained"
                disabled={isLoading}
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



