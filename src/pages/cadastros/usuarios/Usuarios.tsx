import { useState } from 'react';

import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import { User } from '../../../models/user';
import { Button } from '../../../shared';
import { ModalUsuario } from './components/modal-usuario/ModalUsuario';
import { TableUsuario } from './components/table-usuario/TableUsuario';

export const Usuarios: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null)
  };

  const handleUserSelect = (user: User) => {
    handleOpen()
    setSelectedUser(user);
  };

  return (
    <>
        <header className="form-header">
          <div className="header-title">
            <PersonIcon className="icon" />
            <h1>Usuários</h1>
          </div>
          <Button size="normal" startIcon={AssignmentIcon} onClick={handleOpen}>Novo</Button>
        </header>

      <TableUsuario onRowClick={handleUserSelect} />
      <ModalUsuario open={open} onClose={handleClose} selectedUser={selectedUser} />
    </>
  )
};
