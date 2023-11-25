/* eslint-disable react-hooks/exhaustive-deps */
import { TablePagination } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useSnackbar } from "../../../../contexts";
import { Button, Input } from "../../../../shared";
import DeleteIcon from '@mui/icons-material/Delete';

import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SearchIcon from "@mui/icons-material/Search";
import { Produto } from "../../../../models/produto"; 
import { findProduto, findProdutoById } from "../../../../services/produto.service";
import { ProdutoIdContext } from "../../../../contexts/ProdutoIdContext";


interface TableUsuarioProps {
  onRowClick: (produto: Produto) => void;
}

export const TableProdutos: React.FC<TableUsuarioProps> = ({onRowClick}) => {
  const showSnackbar = useSnackbar();
  const [produtos, setProduto] = useState<Produto[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const { produtoId } = useContext(ProdutoIdContext)


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: string | number) => {
    setPageSize(Number(newPageSize));
    setPage(1);
  };

  const fetchData = async (
    id:number,
  ) => {
    findProdutoById(id)
      .then((data) => {
        setProduto((prevProdutos) => [...prevProdutos, data]);
        setTotal(data.total);
        console.log(data)
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleSearch = async () => {
    await fetchData(produtoId);
  };

  const handleRowClick = (produto: Produto) => {
    onRowClick(produto);
  };

  useEffect(() => {
    handleSearch();
  }, [produtoId]);

  return (
    <>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Deletar</th>
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
                <td>{produto.nome}</td>
                <td>R$ {produto.preco}</td>
                <td><DeleteIcon/> </td>
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
