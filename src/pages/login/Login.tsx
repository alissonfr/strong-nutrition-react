import { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import * as yup from 'yup';

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
    <>
      <CustomTextField
        label="Email"
        type="email"
        value={email}
        disabled={isLoading}
        error={!!emailError}
        helperText={emailError}
        onKeyDown={() => setEmailError('')}
        onChange={setEmail}
      />

      <CustomTextField
        label="Senha"
        type="password"
        value={password}
        disabled={isLoading}
        error={!!passwordError}
        helperText={passwordError}
        onKeyDown={() => setPasswordError('')}
        onChange={setPassword}
      />

      <CustomButton
        variant="contained"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Entrar
        {isLoading && (
          <div>
            <div className="loader" />
          </div>
        )}
      </CustomButton>
    </>
  )
};

const CustomTextField: React.FC<any> = ({ label, type, value, error, helperText, onKeyDown, onChange, disabled }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {error && <p>{helperText}</p>}
    </div>
  );
}

const CustomButton: React.FC<any> = ({ variant, disabled, onClick, endIcon, children }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: variant === 'contained' ? '#1976D2' : 'transparent',
        color: variant === 'contained' ? 'white' : '#1976D2',
      }}
    >
      {children}
      {endIcon}
    </button>
  );
}