import { useState } from 'react';

import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import { Cliente } from '../../../models/cliente';
import { Button } from '../../../shared';
import { ModalCliente } from './components/modal-cliente/ModalCliente';
import { TableCliente } from './components/table-cliente/TableCliente';

export const Clientes: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCliente(null)
  };

  const handleClienteSelect = (cliente: Cliente) => {
    handleOpen()
    setSelectedCliente(cliente);
  };

  return (
    <>
        <header className="form-header">
          <div className="header-title">
            <PersonIcon className="icon" />
            <h1>Clientes</h1>
          </div>
          <Button size="normal" startIcon={AssignmentIcon} onClick={handleOpen}>Novo</Button>
        </header>

      <TableCliente onRowClick={handleClienteSelect} />
      <ModalCliente open={open} onClose={handleClose} selectedCliente={selectedCliente} />
    </>
  )
};
