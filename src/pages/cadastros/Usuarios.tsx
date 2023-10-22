import './style.scss';

import { Switch } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FaTimes } from 'react-icons/fa';

import { Input } from '../../components/cadastro/components/input/Input';
import { User } from '../../models/user';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts';

export const Usuarios: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [users, setUser] = useState<User[]>([]);
  const { token } = useAuthContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/strong-nutrition/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [token]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Novo Cliente
      </Button>
      <Dialog open={open} maxWidth={"md"} className="box">
        <DialogTitle>Novo Cliente</DialogTitle>
        <Button className="close" onClick={handleClose}>
          <FaTimes color="gray" size={20} />
        </Button>
        <DialogContent className="modal">
          <div className="row">
            <div className="input">
              <Input
                label="Nome*"
                placeholder="Ex: Guilherme Novais"
                type="name"
                value={name}
                onChange={setName}
                style={{ width: "464px" }}
              />
            </div>

            <div className="input">
              <Input
                label="CPF"
                placeholder="Ex: 059.654.852-64"
                type="cpf"
                value={cpf}
                onChange={setCpf}
                style={{ width: "216px" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <Input
                label="Email"
                placeholder="Ex: guilhermenovais@gmail.com"
                type="email"
                value={email}
                onChange={setEmail}
                style={{ width: "216px" }}
              />
            </div>
            <div className="input">
              <Input
                label="Telefone"
                placeholder="Ex: 77 99848-9212"
                type="telefone"
                value={telefone}
                onChange={setTelefone}
                style={{ width: "216px" }}
              />
            </div>

            <div className="input">
              <Input
                label="CEP"
                placeholder="Ex: 45665-965"
                type="cep"
                value={cep}
                onChange={setCep}
                style={{ width: "216px" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <Input
                label="Endereço"
                placeholder="Ex: Rua Arlindo Barros"
                type="endereco"
                value={endereco}
                onChange={setEndereco}
                style={{ width: "310px" }}
              />
            </div>
            <div className="input">
              <Input
                label="Número"
                placeholder="Ex: 23"
                type="numero"
                value={numero}
                onChange={setNumero}
                style={{ width: "119px" }}
              />
            </div>

            <div className="input">
              <Input
                label="Bairro"
                placeholder="Ex: Miro Cairo"
                type="bairro"
                value={bairro}
                onChange={setBairro}
                style={{ width: "216px" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <Input
                label="Estado"
                placeholder="Ex: Bahia"
                type="estado"
                value={estado}
                onChange={setEstado}
                style={{ width: "216px" }}
              />
            </div>
            <div className="input">
              <Input
                label="Cidade"
                placeholder="Ex: Vitória da Conquista"
                type="cidade"
                value={cidade}
                onChange={setCidade}
                style={{ width: "461px" }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <label>Ativo</label>
          <Switch />
          <Button className="save">Salvar</Button>
        </DialogActions>
      </Dialog>

      <div className='list'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.idUser}>
                <td>{user.idUser}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};
