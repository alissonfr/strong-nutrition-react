import './Usuarios.scss';

import { useState } from 'react';

import { ModalUsuario } from './components/modal-usuario/ModalUsuario';
import { TableUsuario } from './components/table-usuario/TableUsuario';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from '../../../shared';
import { User } from '../../../models/user';



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
    const updateUser = user
    delete updateUser.senha
    setSelectedUser(updateUser);
  };

  return (
    <>
        <header className="usuario-header">
          <div className="header-title">
            <PersonIcon className="icon" />
            <h1>Usuários</h1>
          </div>
          <Button size="normal" startIcon={AssignmentIcon} onClick={handleOpen}>Novo</Button>
        </header>

      <TableUsuario onRowClick={handleUserSelect}/>
      <ModalUsuario open={open} onClose={handleClose} selectedUser={selectedUser} />
    </>
  )
};
