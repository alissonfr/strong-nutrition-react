import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../contexts";

import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Caixa, Dashboard, Usuarios, Vendas } from "../pages";
import { Fornecedores } from "../pages/cadastros/fornecedores/Fornecedores";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: HomeIcon,
        path: "/dashboard",
        label: "Página inicial",
      },
      {
        icon: AttachMoneyIcon,
        path: "/caixa",
        label: "Caixa",
      },
      {
        icon: BarChartIcon,
        path: "/vendas",
        label: "Vendas",
      },
      {
        icon: CreateNewFolderIcon,
        path: "/cadastros",
        label: "Cadastros",
        children: [
          {
            path: "/usuarios",
            label: "Usuários",
          },
          {
            path: "/fornecedores",
            label: "Fornecedores",
          },
        ],
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/caixa" element={<Caixa />} />
      <Route path="/vendas" element={<Vendas />} />

      <Route path="/cadastros/usuarios" element={<Usuarios />} />
      <Route path="/cadastros/fornecedores" element={<Fornecedores />} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
