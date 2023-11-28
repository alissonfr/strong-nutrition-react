import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useSnackbar } from "../../../../../contexts";
import { Cliente } from "../../../../../models/cliente";
import { createCliente, deleteCliente, updateCliente } from "../../../../../services/cliente.service";
import { Button, Input } from "../../../../../shared";

const clienteSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().email('Digite um endereço de email válido').required('O email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
});

interface ModalClienteProps {
  open: boolean;
  onClose: () => void;
  selectedCliente: Cliente | null;
}

export const ModalCliente: React.FC<ModalClienteProps> = ({ open, onClose, selectedCliente }) => {
  const showSnackbar = useSnackbar();

  const initialState = {
    idCliente: 0,
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    uf: "",
    cidade: "",
    bairro: "",
    rua: "",
    residencia: "",
    complemento: "",
  };

  const [clienteData, setClienteData] = useState<Cliente>(initialState);

  const [errors, setErrors] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setClienteData({
      ...clienteData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = () => {
    clienteSchema
      .validate(clienteData, { abortEarly: false })
      .then((data: any) => {
        if (clienteData.idCliente && clienteData.idCliente > 0) {
          return handleUpdateCliente()
        }
        return handleCreateCliente()
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

  const handleCreateCliente = async () => {
    const cliente = clienteData;
    delete clienteData.idCliente;
    createCliente(cliente)
      .then(() => {
        handleOnClose()
        showSnackbar("Usuário cadastrado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleUpdateCliente = async () => {
    if (!clienteData.idCliente) return

    updateCliente(clienteData.idCliente, clienteData)
      .then(() => {
        handleOnClose()
        showSnackbar("Usuário atualizado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleDeleteCliente = async () => {
    if (!clienteData.idCliente) return

    deleteCliente(clienteData.idCliente)
      .then(() => {
        handleOnClose()
        showSnackbar("Usuário apagado com sucesso!", 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const handleOnClose = () => {
    setClienteData(initialState);
    setErrors(initialState);
    onClose();
  }

  useEffect(() => {
    if(selectedCliente) {
      setClienteData(selectedCliente)
    }
  }, [selectedCliente]);

  return (
    <Dialog open={open} maxWidth={"md"} className="modal" PaperProps={{ sx: { width: "50%", maxHeight: 1000 } }}>
      <header className="dialog-header">
        <div className="dialog-title">
          <AssignmentIcon />
          <h1>{selectedCliente ? "Atualizar cliente" : "Novo cliente"}</h1>
        </div>
        <CloseIcon className="close-icon" onClick={handleOnClose} />
      </header>
      <DialogContent className="dialog-content">
        <div className="row">
          <div className="input">
            <Input
              label="Nome *"
              placeholder="Alisson Rodrigues"
              value={clienteData.nome}
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
              placeholder="071.910.025-72"
              value={clienteData.cpf}
              name="cpf"
              error={!!errors.cpf}
              helperText={errors.cpf}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
              mask="999.999.999-99"
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Email *"
              placeholder="alissonrodrigues@gmail.com"
              type="email"
              value={clienteData.email}
              name="email"
              error={!!errors.email}
              helperText={errors.email}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input" style={{ maxWidth: "32%" }}>
          <Input
              label="Telefone *"
              placeholder="77 99848-9212"
              value={clienteData.telefone}
              name="telefone"
              error={!!errors.telefone}
              helperText={errors.telefone}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
              mask="99 99999-9999"
            />
          </div>

        </div>

        <div className="row">
          <div className="input">
            <Input
              label="CEP"
              placeholder="45005-138"
              value={clienteData.cep}
              name="cep"
              onChange={handleInputChange}
              mask="99999-999"
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Endereço"
              placeholder="Rua Circular Sete"
              value={clienteData.rua}
              name="rua"
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Número"
              placeholder="28"
              value={clienteData.residencia}
              name="residencia"
              onChange={handleInputChange}
            />
          </div>

          <div className="input">
            <Input
              label="Bairro"
              placeholder="Miro Cairo"
              value={clienteData.bairro}
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
              value={clienteData.cidade}
              name="cidade"
              onChange={handleInputChange}
            />
          </div>
          <div className="input" style={{ maxWidth: "20%" }}>
            <Input
              label="UF"
              placeholder="BA"
              value={clienteData.uf}
              name="uf"
              onChange={handleInputChange}
              mask="aa"
            />
          </div>
        </div>
      </DialogContent>

      <div className="modal-footer">
        {selectedCliente ? <Button color="cancel" size="normal" onClick={handleDeleteCliente}>Apagar</Button> : <div></div>}
        <Button color="secondary" size="normal" onClick={handleSubmit}>Salvar</Button>
      </div>
    </Dialog>
  )
}