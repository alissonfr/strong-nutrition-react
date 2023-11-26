import { useState } from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import { Venda } from "../../models/venda";
import { Button } from "../../shared";
import { ModalVendas } from "./components/modal-vendas/ModalVendas";
import { TableVendas } from "./components/table-vendas/TableVendas";

export const Vendas: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState<Venda | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVenda(null);
  };

  const handleVendasSelect = (venda: Venda) => {
    handleOpen();
    setSelectedVenda(venda);
  };

  return (
    <>
      <header className="form-header">
        <div className="header-title">
          <PersonIcon className="icon" />
          <h1>Vendas</h1>
        </div>
        <Button size="normal" startIcon={AssignmentIcon} onClick={handleOpen}>
          Novo
        </Button>
      </header>

      <TableVendas onRowClick={handleVendasSelect} />
      <ModalVendas
        open={open}
        onClose={handleClose}
        selectedVenda={selectedVenda}
      />
    </>
  );
};
