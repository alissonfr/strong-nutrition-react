/* eslint-disable react-hooks/exhaustive-deps */
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../contexts";

import { Venda } from "../../../../models/venda";
import { findVenda } from "../../../../services/venda.service"; 

interface TableVendaProps {
  onRowClick: (venda: Venda) => void;
}

export const TableVendas: React.FC<TableVendaProps> = ({onRowClick}) => {
  const showSnackbar = useSnackbar();
  const [vendas, setVenda] = useState<Venda[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

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
  ) => {
    findVenda(page, pageSize)
      .then((data: any) => {
        setVenda(data.content);
        setTotal(data.total);
      })
      .catch((error: any) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  const handleSearch = async () => {
    await fetchData(page, pageSize);
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Estado da venda</th>
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
                <td>{venda.status}</td>
                <td>{venda.observacao}</td>
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
