/* eslint-disable react-hooks/exhaustive-deps */
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../../contexts";
import { Button, Input } from "../../../../../shared";
import "./TableFornecedores.scss";

import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SearchIcon from "@mui/icons-material/Search";
import { Fornecedor } from "../../../../../models/fornecedor";
import { findFornecedor } from "../../../../../services/fornecedor.service";

interface TableUsuarioProps {
  onRowClick: (fornecedor: Fornecedor) => void;
}

export const TableFornecedores: React.FC<TableUsuarioProps> = ({onRowClick}) => {
  const showSnackbar = useSnackbar();
  const [fornecedores, setFornecedor] = useState<Fornecedor[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState({
    nomeFantasia: "",
    cnpj: "",
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: string | number) => {
    setPageSize(Number(newPageSize));
    setPage(1);
  };

  const fetchData = async (
    page: number,
    pageSize: number,
    nomeFantasia: string,
    cnpj: string
  ) => {
    findFornecedor(page, pageSize, nomeFantasia, cnpj)
      .then((data) => {
        setFornecedor(data.content);
        setTotal(data.total);
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleCleanForm = async () => {
    setSearch({
      nomeFantasia: "",
      cnpj: "",
    });
    await fetchData(page, pageSize, "", "");
  };

  const handleSearch = async () => {
    await fetchData(page, pageSize, search.nomeFantasia, search.cnpj);
  };

  const handleRowClick = (fornecedor: Fornecedor) => {
    onRowClick(fornecedor);
  };

  useEffect(() => {
    handleSearch();
  }, [page, pageSize, showSnackbar, onRowClick]);

  return (
    <>
      <div className="table-card">
        <div className="search">
          <Input
            placeholder="Nome Fantasia"
            value={search.nomeFantasia}
            onChange={(e) =>
              setSearch({ ...search, nomeFantasia: e.target.value })
            }
          />
          <Input
            placeholder="CNPJ"
            value={search.cnpj}
            onChange={(e) =>
              setSearch({ ...search, cnpj: e.target.value })
            }
          />
          <Button
            size="large"
            color="outlined"
            startIcon={CleaningServicesIcon}
            onClick={handleCleanForm}
          >
            Limpar
          </Button>
          <Button size="large" startIcon={SearchIcon} onClick={handleSearch}>
            Pesquisar
          </Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Fantasia</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr
                key={fornecedor.idFornecedor}
                onClick={() => {
                  handleRowClick(fornecedor);
                }}
              >
                <td>{fornecedor.idFornecedor}</td>
                <td>{fornecedor.nomeFantasia}</td>
                <td>{fornecedor.razaoSocial}</td>
                <td>{fornecedor.cnpj}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          className="paginator"
          component="div"
          count={total}
          page={!fornecedores || fornecedores.length <= 0 ? 0 : page - 1}
          onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => handlePageSizeChange(e.target.value)}
        />
      </div>
    </>
  );
};
