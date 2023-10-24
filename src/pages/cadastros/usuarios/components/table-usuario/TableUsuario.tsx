/* eslint-disable react-hooks/exhaustive-deps */
import "./TableUsuario.scss"
import { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';
import { findUsers } from "../../../../../services/user.service";
import { User } from "../../../../../models/user";
import { useSnackbar } from "../../../../../contexts";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Input } from "../../../../../shared";

import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

interface TableUsuarioProps {
    onRowClick: (user: User) => void;
}

export const TableUsuario: React.FC<TableUsuarioProps> = ({ onRowClick }) => {
    const showSnackbar = useSnackbar();
    const [users, setUser] = useState<User[]>([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState({
        nome: "",
        email: "",
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: string | number) => {
        setPageSize(Number(newPageSize));
        setPage(1);
    };

    const fetchData = async (page: number, pageSize: number, nome: string, email: string) => {
        findUsers(page, pageSize, nome, email)
            .then((data) => {
                setUser(data.content);
                setTotal(data.total);
            })
            .catch((error) => {
                showSnackbar(error.response.data.message, 'error');
            });
    };

    const handleCleanForm = async () => {
        setSearch({
            nome: "",
            email: "",
        });
        await fetchData(page, pageSize, "", "");
    };

    const handleSearch = async () => {
        await fetchData(page, pageSize, search.nome, search.email);
    };

    const handleRowClick = (user: User) => {
        onRowClick(user);
    };

    useEffect(() => {
        handleSearch();
    }, [page, pageSize, showSnackbar]);

    return (
        <>
            <div className="table-card">
                <div className="search">
                    <Input
                        placeholder="Nome"
                        value={search.nome}
                        onChange={e => setSearch({ ...search, nome: e.target.value })}
                    />
                    <Input
                        placeholder="E-mail"
                        value={search.email}
                        onChange={e => setSearch({ ...search, email: e.target.value })}
                    />
                    <Button size="large" color="outlined" startIcon={CleaningServicesIcon} onClick={handleCleanForm}>Limpar</Button>
                    <Button size="large" startIcon={SearchIcon} onClick={handleSearch}>Pesquisar</Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.idUser} onClick={() => { handleRowClick(user) }}>
                                <td>{user.idUser}</td>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.cpf}</td>
                                <td><DeleteIcon className="delete-icon" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination
                    className="paginator"
                    component="div"
                    count={total}
                    page={!users || users.length <= 0 ? 0 : page - 1}
                    onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(e) => handlePageSizeChange(e.target.value)}
                />
            </div>
        </>
    )
}