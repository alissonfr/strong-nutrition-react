import * as yup from "yup";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Venda } from "../../../../models/venda";
import { 
  createVenda,
  deleteVenda,
  updateVenda, } from "../../../../services/venda.service";
import { findProduto } from "../../../../services/produto.service";
import { useSnackbar } from "../../../../contexts";
import { Button, Input, Select } from "../../../../shared";
import { Produto } from "../../../../models/produto";
import { TableProdutos } from "../table-produtos/TableProdutos";
import { ProdutoIdContext } from "../../../../contexts/ProdutoIdContext"; 

const vendaSchema = yup.object().shape({
  cliente: yup.string().required("O cliente é obrigatório"),
  codigo: yup.string().required("O codigo é obrigatório"),
  estadoDaVenda: yup.string().required("O estado da venda é obrigatório"),
  dataDaVenda: yup.string().required("A data da venda é obrigatório"),
});

interface ModalVendaProps {
  open: boolean;
  onClose: () => void;
  selectedVenda: Venda | null;
}

export const ModalVendas: React.FC<ModalVendaProps> = ({
  open,
  onClose,
  selectedVenda,
}) => {
  const showSnackbar = useSnackbar();

  const initialState = {
    idVenda: 0,
    cliente: "",
    codigo: "",
    dataDaVenda: "",
    estadoDaVenda: "",
    observacao: "",
    produto: {
      idProduto: 0
    } as Produto,
  };

  const [vendaData, setVendaData] = useState<Venda>(initialState);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { handleSetProdutoId } = useContext(ProdutoIdContext)

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
    handleSetProdutoId(Number(value));
    setVendaData({
      ...vendaData,
      produto: {
        ...vendaData.produto,
        idProduto: Number(value),
      },
    });
    setErrors({
      ...errors,
      produto: {
        ...vendaData.produto,
        idProduto: 0,
      } as Produto,
    });
  };

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
        showSnackbar("Venda realizada com sucesso!", "success");
      })
      .catch((error: any) => {
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
      .catch((error: any) => {
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
      .catch((error: any) => {
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
    .then((data: any) => {
        setProdutos(data.content);
      })
      .catch((error: any) => {
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
              label="Cliente *"
              placeholder="Aroldo"
              value={vendaData.cliente}
              name="cliente"
              error={!!errors.cliente}
              helperText={errors.cliente}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

          <div className="input" style={{ maxWidth: "32%" }}>
            <Input
              label="Codigo *"
              placeholder="12345"
              value={vendaData.codigo}
              name="codigo"
              error={!!errors.codigo}
              helperText={errors.codigo}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input">
            <Input
              label="Estado da Venda *"
              placeholder="Em andamento"
              value={vendaData.estadoDaVenda}
              name="estadoDaVenda"
              error={!!errors.estadoDaVenda}
              helperText={errors.estadoDaVenda}
              onKeyDown={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <Input
              label="Data da Venda"
              placeholder="__/__/__"
              value={vendaData.dataDaVenda}
              name="dataDaVenda"
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input">
          <Input
            label="Observação"
            value={vendaData.observacao}
            name="observacao"
            onChange={handleInputChange}
          />
        </div>
        </div>
        <div className="row">
          <div className="input">
          <Select
              label="Produtos *"
              value={vendaData.produto.idProduto}
              onChange={handleSelectChange}
              options={produtos}
              error={!!errors.produto.idProduto}
              helperText="Produto é obrigatório"
              optionLabel="nome"
              optionValue="idProduto"
            />
          </div>
        </div>
        <div className="row" style={{left: 150, position: 'relative'  }}>
        <div className="input">
          <TableProdutos onRowClick={() => {}}/>
          </div>
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
