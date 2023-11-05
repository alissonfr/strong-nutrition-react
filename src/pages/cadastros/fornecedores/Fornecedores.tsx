import "./Fornecedores.scss";

import { useState } from "react";

import { ModalFornecedores } from "./components/modal-fornecedores/ModalFornecedores";
import { TableFornecedores } from "./components/table-fornecedores/TableFornecedores";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "../../../shared";
import { Fornecedor } from "../../../models/fornecedor";

export const Fornecedores: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] =
    useState<Fornecedor | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFornecedor(null);
  };

  const handleFornecedorSelect = (fornecedor: Fornecedor) => {
    handleOpen();
    setSelectedFornecedor(fornecedor);
  };

  return (
    <>
      <header className="usuario-header">
        <div className="header-title">
          <PersonIcon className="icon" />
          <h1>Fornecedores</h1>
        </div>
        <Button size="normal" startIcon={AssignmentIcon} onClick={handleOpen}>
          Novo
        </Button>
      </header>

      <TableFornecedores onRowClick={handleFornecedorSelect} />
      <ModalFornecedores
        open={open}
        onClose={handleClose}
        selectedFornecedor={selectedFornecedor}
      />
    </>
  );
};
