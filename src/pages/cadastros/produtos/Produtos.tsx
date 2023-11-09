import { useState } from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import { Produto } from "../../../models/produto";
import { Button } from "../../../shared";
import { ModalProdutos } from "./components/modal-produtos/ModalProdutos";
import { TableProdutos } from "./components/table-produtos/TableProdutos";

export const Produtos: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduto(null);
  };

  const handleProdutoSelect = (produto: Produto) => {
    handleOpen();
    setSelectedProduto(produto);
  };

  return (
    <>
      <header className="form-header">
        <div className="header-title">
          <PersonIcon className="icon" />
          <h1>Produtos</h1>
        </div>
        <Button size="normal" startIcon={AssignmentIcon} onClick={handleOpen}>
          Novo
        </Button>
      </header>

      <TableProdutos onRowClick={handleProdutoSelect} />
      <ModalProdutos
        open={open}
        onClose={handleClose}
        selectedProduto={selectedProduto}
      />
    </>
  );
};
