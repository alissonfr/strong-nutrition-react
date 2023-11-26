/* eslint-disable react-hooks/exhaustive-deps */
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../contexts";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { Venda } from "../../../../models/venda";
import { findVenda } from "../../../../services/venda.service"; 
import { Button, Input } from "../../../../shared";

interface TableVendaProps {
  onRowClick: (venda: Venda) => void;
}

export const TableVendas: React.FC<TableVendaProps> = ({onRowClick}) => {
  const showSnackbar = useSnackbar();
  const [vendas, setVenda] = useState<Venda[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState({
    observacao: ""
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: string | number) => {
    setPageSize(Number(newPageSize));
    setPage(1);
  };

  const handleCleanForm = async () => {
    setSearch({
        observacao: "",
    });
    await fetchData(page, pageSize, "");
};

  const fetchData = async (
    page: number,
    pageSize: number,
    observacao: string
  ) => {
    findVenda(page, pageSize, observacao)
      .then((data: any) => {
        setVenda(data.content);
        setTotal(data.total);
      })
      .catch((error: any) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleSearch = async () => {
    await fetchData(page, pageSize, search.observacao);
  };

  const handleRowClick = (venda: Venda) => {
    onRowClick(venda);
  };

  useEffect(() => {
    handleSearch();
  }, [page, pageSize, showSnackbar, onRowClick]);

  return (
    <>
      <div className="table-card">
        <div className="search">
          <Input
              placeholder="Observação"
              value={search.observacao}
              onChange={e => setSearch({ ...search, observacao: e.target.value })}
          />
          <Button size="large" color="outlined" startIcon={CleaningServicesIcon} onClick={handleCleanForm}>Limpar</Button>
          <Button size="large" startIcon={SearchIcon} onClick={handleSearch}>Pesquisar</Button>
          </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Funcionário</th>
              <th>Observação</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr
                key={venda.idVenda}
                onClick={() => {
                  handleRowClick(venda);
                }}
              >
                <td>{venda.idVenda}</td>
                <td>{venda.cliente.nome}</td>
                <td>{venda.funcionario.nome}</td>
                <td>{venda.observacao}</td>
                <td style={{ textTransform: "capitalize" }}>{venda.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          className="paginator"
          component="div"
          count={total}
          page={!vendas || vendas.length <= 0 ? 0 : page - 1}
          onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => handlePageSizeChange(e.target.value)}
        />
      </div>
    </>
  );
};
