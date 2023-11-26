/* eslint-disable react-hooks/exhaustive-deps */
import { TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from "../../../../../contexts";
import { Cliente } from "../../../../../models/cliente";
import { findClientes } from "../../../../../services/cliente.service";
import { Button, Input } from "../../../../../shared";

import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

interface TableClienteProps {
    onRowClick: (cliente: Cliente) => void;
}

export const TableCliente: React.FC<TableClienteProps> = ({ onRowClick }) => {
    const showSnackbar = useSnackbar();
    const [clientes, setCliente] = useState<Cliente[]>([]);

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
        findClientes(page, pageSize, nome, email)
            .then((data) => {
                setCliente(data.content);
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

    const handleRowClick = (cliente: Cliente) => {
        const updateCliente = cliente
        onRowClick(updateCliente);
    };

    useEffect(() => {
        handleSearch();
    }, [page, pageSize, showSnackbar, onRowClick]);

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
                        {clientes.map((cliente) => (
                            <tr key={cliente.idCliente} onClick={() => { handleRowClick(cliente) }}>
                                <td>{cliente.idCliente}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.cpf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination
                    className="paginator"
                    component="div"
                    count={total}
                    page={!clientes || clientes.length <= 0 ? 0 : page - 1}
                    onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(e) => handlePageSizeChange(e.target.value)}
                />
            </div>
        </>
    )
}