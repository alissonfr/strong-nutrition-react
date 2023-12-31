import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../contexts";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import HomeIcon from "@mui/icons-material/Home";
import { Caixa, Dashboard, Produtos, Usuarios, Vendas } from "../pages";
import { Fornecedores } from "../pages/cadastros/fornecedores/Fornecedores";
import { Clientes } from "../pages/cadastros/clientes/Clientes";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
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
          {
            path: "/produtos",
            label: "Produtos",
          },
          {
            path: "/clientes",
            label: "Clientes",
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
      <Route path="/cadastros/produtos" element={<Produtos />} />
      <Route path="/cadastros/clientes" element={<Clientes />} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
