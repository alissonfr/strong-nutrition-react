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

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = () => {
    loginSchema
      .validate(formValues, { abortEarly: false })
      .then((data) => {
        login(data.email, data.password);
      })
      .catch((yupErrors) => {
        yupErrors.inner.forEach((error: any) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [error.path]: error.message,
          }));
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
              label="Email *"
              placeholder="Email"
              type="email"
              name="email"
              value={formValues.email}
              error={!!errors.email}
              helperText={errors.email}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
            <Input
              label="Senha *"
              placeholder="Senha"
              type="password"
              name="password"
              value={formValues.password}
              error={!!errors.password}
              helperText={errors.password}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
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



