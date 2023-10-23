import "./ModalUsuario.scss"
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Input } from "../../../../../shared";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createUser, updateUser } from "../../../../../services/user.service";
import { User } from "../../../../../models/user";
import { useSnackbar } from "../../../../../contexts";

const userSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido").required("CPF é obrigatório"),
  email: yup.string().email('Digite um endereço de email válido').required('O email é obrigatório'),
  senha: yup.string().required('A senha é obrigatória').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "A senha deve conter letras maiúsculas, minúsculas números e caracteres especiais"),
  dataNascimento: yup.date().max(new Date(), "Data de nascimento inválida")
});

interface ModalUsuarioProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

export const ModalUsuario: React.FC<ModalUsuarioProps> = ({ open, onClose, selectedUser }) => {
  const showSnackbar = useSnackbar();

  const [userData, setUserData] = useState<User>({
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
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userData.idUser && userData.idUser > 0) {
      return handleUpdateUser()
    }
    return handleCreateUser()
  };

  const handleCreateUser = async () => {
    createUser(userData)
      .then(() => {
        onClose()
        showSnackbar("Usuário criado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleUpdateUser = async () => {
    if (!userData.idUser) return

    updateUser(userData.idUser, userData)
      .then(() => {
        onClose()
        showSnackbar("Usuário criado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  useEffect(() => {
    console.log(selectedUser)
  }, [selectedUser]);

  return (
    <Dialog open={open} maxWidth={"md"} className="modal" PaperProps={{ sx: { width: "50%", maxHeight: 1000 } }}>
      <header className="dialog-header">
        <div className="dialog-title">
          <AssignmentIcon />
          <h1>{selectedUser ? "Atualizar cliente" : "Novo cliente"}</h1>
        </div>
        <CloseIcon className="close-icon" onClick={onClose} />
      </header>
      <DialogContent className="dialog-content">
        <div className="row">
          <div className="input">
            <Input
              label="Nome *"
              placeholder="Guilherme Novais"
              value={userData.nome}
              onChange={e => setUserData({ ...userData, nome: e.target.value })}
            />
          </div>

          <div className="input" style={{ maxWidth: "32%" }}>
            <Input
              label="CPF *"
              placeholder="059.654.852-64"
              value={userData.cpf}
              onChange={e => setUserData({ ...userData, cpf: e.target.value })}
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
              onChange={e => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div className="input" style={{ maxWidth: "32%" }}>
            <Input
              label="Senha *"
              placeholder="********"
              type="password"
              value={userData.senha}
              onChange={e => setUserData({ ...userData, senha: e.target.value })}
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
              onChange={e => setUserData({ ...userData, dataNascimento: e.target.value })}
            />
          </div>
          <div className="input">
            <Input
              label="Telefone *"
              placeholder="77 99848-9212"
              value={userData.telefone}
              onChange={e => setUserData({ ...userData, telefone: e.target.value })}
            />
          </div>

          <div className="input">
            <Input
              label="CEP"
              placeholder="45665-965"
              value={userData.cep}
              onChange={e => setUserData({ ...userData, cep: e.target.value })}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Endereço"
              placeholder="Rua Arlindo Barros"
              value={userData.rua}
              onChange={e => setUserData({ ...userData, rua: e.target.value })}
            />
          </div>
          <div className="input">
            <Input
              label="Número"
              placeholder="23"
              value={userData.residencia}
              onChange={e => setUserData({ ...userData, residencia: e.target.value })}
            />
          </div>

          <div className="input">
            <Input
              label="Bairro"
              placeholder="Miro Cairo"
              value={userData.bairro}
              onChange={e => setUserData({ ...userData, bairro: e.target.value })}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Cidade"
              placeholder="Vitória da Conquista"
              value={userData.cidade}
              onChange={e => setUserData({ ...userData, cidade: e.target.value })}
            />
          </div>
          <div className="input" style={{ maxWidth: "20%" }}>
            <Input
              label="UF"
              placeholder="BA"
              value={userData.uf}
              onChange={e => setUserData({ ...userData, uf: e.target.value })}
            />
          </div>
        </div>
      </DialogContent>

      <div className="modal-footer">
        <Button color="outlined" size="normal" onClick={onClose}>Cancelar</Button>
        <Button color="secondary" size="normal" onClick={handleSubmit}>Salvar</Button>
      </div>
    </Dialog>
  )
}