import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSnackbar } from "../../../../contexts";
import { Venda } from "../../../../models/venda";
import { createVenda, deleteVenda, updateVenda } from "../../../../services/venda.service";
import { Button, Input, Select } from "../../../../shared";
import { Produto } from "../../../../models/produto";
import { findProduto } from "../../../../services/produto.service";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const vendaSchema = yup.object().shape({
  dataVenda: yup.string().required("A data é obrigatório"),
  observacao: yup.string().required("Observação é obrigatório"),
  status: yup.string().required("Status é obrigatório"),
});

const statusVenda = [
  { label: "Pendente", value: "pendente" },
  { label: "Concluida", value: "concluida" },
  { label: "Cancelada", value: "cancelada" },
]

interface ModalVendaProps {
  open: boolean;
  onClose: () => void;
  selectedVenda: Venda | null;
}

export const ModalVendas: React.FC<ModalVendaProps> = ({ open, onClose, selectedVenda }) => {
  const showSnackbar = useSnackbar();

  const initialState = {
    idVenda: 0,
    dataVenda: "",
    status: "",
    observacao: "",
    vendaProdutos: [] ,
  };

  const [vendaData, setVendaData] = useState<Venda>(initialState);
  const [produtos, setProduto] = useState<Produto[]>([]);

  const [errors, setErrors] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setVendaData({
      ...vendaData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSelectChange = (e: any) => {
    const { value } = e.target;

    if(!value) return;

    const produtoExistente = vendaData.vendaProdutos.find((produto) => produto.produto.idProduto === value);

    const selectedProduto = produtos.find((produto) => produto.idProduto === Number(value));

    if(produtoExistente) {
      e.target.value = "";
      return showSnackbar("Esse produto já foi selecionado", "error");
    }

    setVendaData({
      ...vendaData,
      vendaProdutos: [
        ...vendaData.vendaProdutos,
        { produto: { idProduto: value, nome: selectedProduto?.nome }, quantidade: 1 },
      ],
    });

    e.target.value = "";
  };

  const handleDeleteProduto = (id: number) => {
    const novosProdutos = vendaData.vendaProdutos.filter(
      (produto) => produto.produto.idProduto !== id
    );

    setVendaData({
      ...vendaData,
      vendaProdutos: novosProdutos
    });

  }

  const handleQuantidadeProduto = (id: number, quantidade: number) => {
    if(quantidade <= 0) {
      return handleDeleteProduto(id);
    }

    const novosProdutos = vendaData.vendaProdutos.map((produto) =>
    produto.produto.idProduto === id
      ? { ...produto, quantidade: quantidade }
      : produto
    );

    setVendaData({
      ...vendaData,
      vendaProdutos: novosProdutos
    });

  }

  const handleSubmit = () => {
    vendaSchema
      .validate(vendaData, { abortEarly: false })
      .then((data: any) => {
        if (vendaData.idVenda && vendaData.idVenda > 0) {
          return handleUpdateVenda();
        }
        return handleCreateVenda();
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

  const handleCreateVenda = async () => {
    const venda = vendaData;
    delete vendaData.idVenda;
    createVenda(venda)
      .then(() => {
        handleOnClose();
        showSnackbar("Venda cadastrada com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleUpdateVenda = async () => {
    if (!vendaData.idVenda) return;

    updateVenda(vendaData.idVenda, vendaData)
      .then(() => {
        handleOnClose();
        showSnackbar("Venda atualizada com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleDeleteVenda = async () => {
    if (!vendaData.idVenda) return;

    deleteVenda(vendaData.idVenda)
      .then(() => {
        handleOnClose();
        showSnackbar("Venda apagada com sucesso!", "success");
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleOnClose = () => {
    setVendaData(initialState);
    setErrors(initialState);
    onClose();
  };

  useEffect(() => {
    if(selectedVenda) {
      setVendaData(selectedVenda)
    }
  }, [selectedVenda]);

  useEffect(() => {
    findProduto()
      .then((data) => {
        setProduto(data.content);
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
            {selectedVenda ? "Atualizar venda" : "Nova venda"}
          </h1>
        </div>
        <CloseIcon className="close-icon" onClick={handleOnClose} />
      </header>
      <DialogContent className="dialog-content">
        <div className="row">
          <div className="input">
            <Input
              label="Data da venda *"
              placeholder="29/03/2003"
              value={vendaData.dataVenda}
              name="dataVenda"
              error={!!errors.dataVenda}
              helperText={errors.dataVenda}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
          <Select
              label="Status *"
              value={vendaData.status}
              onChange={(e) => handleInputChange({ target: { name: "status", value: e.target.value } })}
              options={statusVenda}
              error={!!errors.status}
              helperText={errors.status}
              optionLabel="label"
              optionValue="value"
            />
          </div>
        </div>

        <div className="row">
        <div className="input">
            <Input
              label="Observação *"
              placeholder="Cliente ficou devendo 2 reais"
              value={vendaData.observacao}
              name="observacao"
              error={!!errors.observacao}
              helperText={errors.observacao}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Select
              label="Produtos *"
              onChange={handleSelectChange}
              options={produtos}
              optionLabel="nome"
              optionValue="idProduto"
            />
          </div>
        </div>

        <div className="table-card" style={{ padding: 0, margin: 0, marginTop: "50px" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {vendaData.vendaProdutos.map((vendaProduto, index) => (
                <tr key={index}>
                  <td>{vendaProduto.produto.idProduto}</td>
                  <td>{vendaProduto.produto.nome}</td>
                  <td style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <AddIcon style={{ cursor: "pointer" }} onClick={() => handleQuantidadeProduto(vendaProduto.produto.idProduto, vendaProduto.quantidade + 1)} />
                    {vendaProduto.quantidade}
                    <RemoveIcon style={{ cursor: "pointer" }} onClick={() => handleQuantidadeProduto(vendaProduto.produto.idProduto, vendaProduto.quantidade - 1)} />
                    </td>
                  <td><DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDeleteProduto(vendaProduto.produto.idProduto)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>

      <div className="modal-footer">
        {selectedVenda ? (
          <Button color="cancel" size="normal" onClick={handleDeleteVenda}>
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
