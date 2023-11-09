import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useSnackbar } from "../../../../../contexts";
import { User } from "../../../../../models/user";
import { createUser, deleteUser, updateUser } from "../../../../../services/user.service";
import { Button, Input } from "../../../../../shared";
import "./ModalUsuario.scss";

const userSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().matches(/^\d{11}$/, "CPF inválido").required("CPF é obrigatório"),
  email: yup.string().email('Digite um endereço de email válido').required('O email é obrigatório'),
  senha: yup.string().required('A senha é obrigatória').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "A senha deve conter letras maiúsculas, minúsculas números e caracteres especiais"),
  dataNascimento: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr).required("Data de nascimento inválida"),
  telefone: yup.string().required('Telefone é obrigatório'),
});

interface ModalUsuarioProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

export const ModalUsuario: React.FC<ModalUsuarioProps> = ({ open, onClose, selectedUser }) => {
  const showSnackbar = useSnackbar();

  const initialState = {
    idUser: 0,
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    bairro: "",
    cidade: "",
    uf: "",
    dataNascimento: "",
    senha: "",
    rua: "",
    residencia: "",
    complemento: "",
  };

  const [userData, setUserData] = useState<User>(initialState);

  const [errors, setErrors] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = () => {
    userSchema
      .validate(userData, { abortEarly: false })
      .then((data: any) => {
        if (userData.idUser && userData.idUser > 0) {
          return handleUpdateUser()
        }
        return handleCreateUser()
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

  const handleCreateUser = async () => {
    const user = userData;
    delete userData.idUser;
    createUser(user)
      .then(() => {
        handleOnClose()
        showSnackbar("Usuário cadastrado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleUpdateUser = async () => {
    if (!userData.idUser) return

    updateUser(userData.idUser, userData)
      .then(() => {
        handleOnClose()
        showSnackbar("Usuário atualizado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleDeleteUser = async () => {
    if (!userData.idUser) return

    deleteUser(userData.idUser)
      .then(() => {
        handleOnClose()
        showSnackbar("Usuário apagado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleOnClose = () => {
    setUserData(initialState);
    setErrors(initialState);
    onClose();
  }

  useEffect(() => {
    if(selectedUser) {
      delete selectedUser.senha;
      setUserData(selectedUser)
    }
  }, [selectedUser]);

  return (
    <Dialog open={open} maxWidth={"md"} className="modal" PaperProps={{ sx: { width: "50%", maxHeight: 1000 } }}>
      <header className="dialog-header">
        <div className="dialog-title">
          <AssignmentIcon />
          <h1>{selectedUser ? "Atualizar cliente" : "Novo cliente"}</h1>
        </div>
        <CloseIcon className="close-icon" onClick={handleOnClose} />
      </header>
      <DialogContent className="dialog-content">
        <div className="row">
          <div className="input">
            <Input
              label="Nome *"
              placeholder="Guilherme Novais"
              value={userData.nome}
              name="nome"
              error={!!errors.nome}
              helperText={errors.nome}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

          <div className="input" style={{ maxWidth: "32%" }}>
            <Input
              label="CPF *"
              placeholder="059.654.852-64"
              value={userData.cpf}
              name="cpf"
              error={!!errors.cpf}
              helperText={errors.cpf}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Email *"
              placeholder="guilhermenovais@gmail.com"
              type="email"
              value={userData.email}
              name="email"
              error={!!errors.email}
              helperText={errors.email}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input" style={{ maxWidth: "32%" }}>
            <Input
              label="Senha *"
              placeholder="********"
              type="password"
              value={userData.senha}
              name="senha"
              error={!!errors.senha}
              helperText={errors.senha}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Data de nascimento *"
              type="date"
              placeholder="29/03/2003"
              value={userData.dataNascimento}
              name="dataNascimento"
              error={!!errors.dataNascimento}
              helperText={errors.dataNascimento}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Telefone *"
              placeholder="77 99848-9212"
              value={userData.telefone}
              name="telefone"
              error={!!errors.telefone}
              helperText={errors.telefone}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

          <div className="input">
            <Input
              label="CEP"
              placeholder="45665-965"
              value={userData.cep}
              name="cep"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Endereço"
              placeholder="Rua Arlindo Barros"
              value={userData.rua}
              name="rua"
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Número"
              placeholder="23"
              value={userData.residencia}
              name="residencia"
              onChange={handleInputChange}
            />
          </div>

          <div className="input">
            <Input
              label="Bairro"
              placeholder="Miro Cairo"
              value={userData.bairro}
              name="bairro"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Cidade"
              placeholder="Vitória da Conquista"
              value={userData.cidade}
              name="cidade"
              onChange={handleInputChange}
            />
          </div>
          <div className="input" style={{ maxWidth: "20%" }}>
            <Input
              label="UF"
              placeholder="BA"
              value={userData.uf}
              name="uf"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </DialogContent>

      <div className="modal-footer">
        {selectedUser ? <Button color="cancel" size="normal" onClick={handleDeleteUser}>Apagar</Button> : <div></div>}
        <Button color="secondary" size="normal" onClick={handleSubmit}>Salvar</Button>
      </div>
    </Dialog>
  )
}