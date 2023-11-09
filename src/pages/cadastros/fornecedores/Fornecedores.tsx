import { useState } from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import { Fornecedor } from "../../../models/fornecedor";
import { Button } from "../../../shared";
import { ModalFornecedores } from "./components/modal-fornecedores/ModalFornecedores";
import { TableFornecedores } from "./components/table-fornecedores/TableFornecedores";

export const Fornecedores: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);

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
      <header className="form-header">
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
