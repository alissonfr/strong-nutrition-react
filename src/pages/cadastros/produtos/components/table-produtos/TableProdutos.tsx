/* eslint-disable react-hooks/exhaustive-deps */
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../../contexts";
import { Button, Input } from "../../../../../shared";

import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SearchIcon from "@mui/icons-material/Search";
import { Produto } from "../../../../../models/produto";
import { findProduto } from "../../../../../services/produto.service";

interface TableUsuarioProps {
  onRowClick: (produto: Produto) => void;
}

export const TableProdutos: React.FC<TableUsuarioProps> = ({onRowClick}) => {
  const showSnackbar = useSnackbar();
  const [produtos, setProduto] = useState<Produto[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState({
    nome: "",
    marca: "",
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
    nome: string,
    cnpj: string
  ) => {
    findProduto(page, pageSize, nome, cnpj)
      .then((data) => {
        setProduto(data.content);
        setTotal(data.total);
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleCleanForm = async () => {
    setSearch({
      nome: "",
      marca: "",
    });
    await fetchData(page, pageSize, "", "");
  };

  const handleSearch = async () => {
    await fetchData(page, pageSize, search.nome, search.marca);
  };

  const handleRowClick = (produto: Produto) => {
    onRowClick(produto);
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
            onChange={(e) =>
              setSearch({ ...search, nome: e.target.value })
            }
          />
          <Input
            placeholder="Marca"
            value={search.marca}
            onChange={(e) =>
              setSearch({ ...search, marca: e.target.value })
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
              <th>Nome</th>
              <th>Marca</th>
              <th>Preço</th>
              <th>Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr
                key={produto.idProduto}
                onClick={() => {
                  handleRowClick(produto);
                }}
              >
                <td>{produto.idProduto ? produto.idProduto : "Não informado"}</td>
                <td>{produto.nome ? produto.nome : "Não informado"}</td>
                <td>{produto.marca ? produto.marca : "Não informado"}</td>
                <td>{produto.preco ? "R$ " + produto.preco : "Não informado"}</td>
                <td>{produto.fornecedor.nomeFantasia ? produto.fornecedor.nomeFantasia : "Não informado"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          className="paginator"
          component="div"
          count={total}
          page={!produtos || produtos.length <= 0 ? 0 : page - 1}
          onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => handlePageSizeChange(e.target.value)}
        />
      </div>
    </>
  );
};
