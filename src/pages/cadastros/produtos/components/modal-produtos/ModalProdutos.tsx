import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSnackbar } from "../../../../../contexts";
import { Fornecedor } from "../../../../../models/fornecedor";
import { Produto } from "../../../../../models/produto";
import { findFornecedor } from "../../../../../services/fornecedor.service";
import {
  createProduto,
  deleteProduto,
  updateProduto,
} from "../../../../../services/produto.service";
import { Button, Input, Select } from "../../../../../shared";

const produtoSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatório"),
  marca: yup.string().required("A marca é obrigatório"),
  preco: yup.string().required("O preço é obrigatório"),
});

interface ModalProdutoProps {
  open: boolean;
  onClose: () => void;
  selectedProduto: Produto | null;
}

export const ModalProdutos: React.FC<ModalProdutoProps> = ({
  open,
  onClose,
  selectedProduto,
}) => {
  const showSnackbar = useSnackbar();

  const initialState = {
    idProduto: 0,
    nome: "",
    descricao: "",
    marca: "",
    preco: "",
    fornecedor: {
      idFornecedor: 0
    } as Fornecedor,
  };

  const [produtoData, setProdutoData] = useState<Produto>(initialState);
  const [fornecedores, setFornecedor] = useState<Fornecedor[]>([]);

  const [errors, setErrors] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProdutoData({
      ...produtoData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSelectChange = (e: any) => {
    const { value } = e.target;
    setProdutoData({
      ...produtoData,
      fornecedor: {
        ...produtoData.fornecedor,
        idFornecedor: Number(value),
      },
    });
    setErrors({
      ...errors,
      fornecedor: {
        ...produtoData.fornecedor,
        idFornecedor: 0,
      } as Fornecedor,
    });
  };

  const handleSubmit = () => {
    produtoSchema
      .validate(produtoData, { abortEarly: false })
      .then((data: any) => {
        if (produtoData.idProduto && produtoData.idProduto > 0) {
          return handleUpdateProduto();
        }
        return handleCreateProduto();
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

  const handleCreateProduto = async () => {
    const produto = produtoData;
    delete produtoData.idProduto;
    createProduto(produto)
      .then(() => {
        handleOnClose();
        showSnackbar("Produto cadastrado com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleUpdateProduto = async () => {
    if (!produtoData.idProduto) return;

    updateProduto(produtoData.idProduto, produtoData)
      .then(() => {
        handleOnClose();
        showSnackbar("Produto atualizado com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleDeleteProduto = async () => {
    if (!produtoData.idProduto) return;

    deleteProduto(produtoData.idProduto)
      .then(() => {
        handleOnClose();
        showSnackbar("Produto apagado com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleOnClose = () => {
    setProdutoData(initialState);
    setErrors(initialState);
    onClose();
  };

  useEffect(() => {
    if(selectedProduto) {
      setProdutoData(selectedProduto)
    }
  }, [selectedProduto]);

  useEffect(() => {
    findFornecedor()
      .then((data) => {
        setFornecedor(data.content);
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  }, []);

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
            {selectedProduto ? "Atualizar produto" : "Novo produto"}
          </h1>
        </div>
        <CloseIcon className="close-icon" onClick={handleOnClose} />
      </header>
      <DialogContent className="dialog-content">
        <div className="row">
          <div className="input">
            <Input
              label="Nome *"
              placeholder="Creatina Monohidratada 250g"
              value={produtoData.nome}
              name="nome"
              error={!!errors.nome}
              helperText={errors.nome}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Marca *"
              placeholder="Growth Suplementos"
              value={produtoData.marca}
              name="marca"
              error={!!errors.marca}
              helperText={errors.marca}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
        <div className="input">
            <Input
              label="Descrição *"
              placeholder="Mais auxílio para seu crescimento muscular"
              value={produtoData.descricao}
              name="descricao"
              error={!!errors.descricao}
              helperText={errors.descricao}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

          <div className="input" style={{ maxWidth: "20%" }}>
            <Input
              label="Preço *"
              placeholder="R$ 49.99"
              value={produtoData.preco}
              name="preco"
              error={!!errors.preco}
              helperText={errors.preco}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Select
              label="Fornecedor *"
              value={produtoData.fornecedor.idFornecedor}
              onChange={handleSelectChange}
              options={fornecedores}
              error={!!errors.fornecedor.idFornecedor}
              helperText="Fornecedor é obrigatório"
              optionLabel="nomeFantasia"
              optionValue="idFornecedor"
            />
          </div>
        </div>
      </DialogContent>

      <div className="modal-footer">
        {selectedProduto ? (
          <Button color="cancel" size="normal" onClick={handleDeleteProduto}>
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
