import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSnackbar } from "../../../../../contexts";
import { Fornecedor } from "../../../../../models/fornecedor";
import {
  createFornecedor,
  deleteFornecedor,
  updateFornecedor,
} from "../../../../../services/fornecedor.service";
import { Button, Input } from "../../../../../shared";

const fornecedorSchema = yup.object().shape({
  nomeFantasia: yup.string().required("Nome Fantasia é obrigatório"),
  cnpj: yup.string().required("CNPJ é obrigatório"),
  razaoSocial: yup.string().required("A razão social é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
});

interface ModalFornecedorProps {
  open: boolean;
  onClose: () => void;
  selectedFornecedor: Fornecedor | null;
}

export const ModalFornecedores: React.FC<ModalFornecedorProps> = ({
  open,
  onClose,
  selectedFornecedor,
}) => {
  const showSnackbar = useSnackbar();

  const initialState = {
    idFornecedor: 0,
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    complemento: "",
    telefone: "",
    cep: "",
    bairro: "",
    cidade: "",
    uf: "",
    rua: "",
  };

  const [fornecedorData, setFornecedorData] = useState<Fornecedor>(initialState);

  const [errors, setErrors] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFornecedorData({
      ...fornecedorData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = () => {
    fornecedorSchema
      .validate(fornecedorData, { abortEarly: false })
      .then((data: any) => {
        if (fornecedorData.idFornecedor && fornecedorData.idFornecedor > 0) {
          return handleUpdateFornecedor();
        }
        return handleCreateFornecedor();
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

  const handleCreateFornecedor = async () => {
    const fornecedor = fornecedorData;
    delete fornecedorData.idFornecedor;
    createFornecedor(fornecedor)
      .then(() => {
        handleOnClose();
        showSnackbar("Fornecedor cadastrado com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleUpdateFornecedor = async () => {
    if (!fornecedorData.idFornecedor) return;

    updateFornecedor(fornecedorData.idFornecedor, fornecedorData)
      .then(() => {
        handleOnClose();
        showSnackbar("Fornecedor atualizado com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleDeleteFornecedor = async () => {
    if (!fornecedorData.idFornecedor) return;

    deleteFornecedor(fornecedorData.idFornecedor)
      .then(() => {
        handleOnClose();
        showSnackbar("Fornecedor apagado com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleOnClose = () => {
    setFornecedorData(initialState);
    setErrors(initialState);
    onClose();
  };

  useEffect(() => {
    if(selectedFornecedor) {
      setFornecedorData(selectedFornecedor)
    }
  }, [selectedFornecedor]);

  return (
    <Dialog
      open={open}
      maxWidth={"md"}
      className="modal"
      PaperProps={{ sx: { width: "50%", maxHeight: 750 } }}
    >
      <header className="dialog-header">
        <div className="dialog-title">
          <AssignmentIcon />
          <h1>
            {selectedFornecedor ? "Atualizar fornecedor" : "Novo fornecedor"}
          </h1>
        </div>
        <CloseIcon className="close-icon" onClick={handleOnClose} />
      </header>
      <DialogContent className="dialog-content">
        <div className="row">
          <div className="input">
            <Input
              label="Nome Fantasia *"
              placeholder="Suplementos Baratos"
              value={fornecedorData.nomeFantasia}
              name="nomeFantasia"
              error={!!errors.nomeFantasia}
              helperText={errors.nomeFantasia}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

          <div className="input" style={{ maxWidth: "32%" }}>
            <Input
              label="CNPJ *"
              placeholder="12.345.678/0001-00"
              value={fornecedorData.cnpj}
              name="cnpj"
              error={!!errors.cnpj}
              helperText={errors.cnpj}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
              mask="99.999.999/9999-99"
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Razão Social *"
              placeholder="Suplementos LTDA"
              value={fornecedorData.razaoSocial}
              name="razaoSocial"
              error={!!errors.razaoSocial}
              helperText={errors.razaoSocial}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Telefone *"
              placeholder="77 99848-9212"
              value={fornecedorData.telefone}
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
              label="Cidade"
              placeholder="Vitória da Conquista"
              value={fornecedorData.cidade}
              name="cidade"
              onChange={handleInputChange}
            />
          </div>
          <div className="input" style={{ maxWidth: "20%" }}>
            <Input
              label="UF"
              placeholder="BA"
              value={fornecedorData.uf}
              name="uf"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Endereço"
              placeholder="Rua Arlindo Barros"
              value={fornecedorData.rua}
              name="rua"
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Bairro"
              placeholder="Miro Cairo"
              value={fornecedorData.bairro}
              name="bairro"
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="CEP"
              placeholder="45665-965"
              value={fornecedorData.cep}
              name="cep"
              onChange={handleInputChange}
              mask="99999-999"
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Complemento"
              value={fornecedorData.complemento}
              name="complemento"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </DialogContent>

      <div className="modal-footer">
        {selectedFornecedor ? (
          <Button color="cancel" size="normal" onClick={handleDeleteFornecedor}>
            Apagar
          </Button>
        ) : (
          <div></div>
        )}
        <Button color="secondary" size="normal" onClick={handleSubmit}>
          Salvar
        </Button>
      </div>
    </Dialog>
  );
};
