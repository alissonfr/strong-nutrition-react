import React, { ReactNode, createContext, useState } from "react";

interface ProdutoIdContextType {
  produtoId: number;
  handleSetProdutoId: (data: number) => void
}

export const ProdutoIdContext = createContext<ProdutoIdContextType>(
  {} as ProdutoIdContextType
);

interface ProdutoIdProviderProps {
  children: ReactNode;
}

function ProdutoIdProvider({ children }: ProdutoIdProviderProps) {
  const [produtoId, setProdutoId] = useState<number>(0);

  function handleSetProdutoId(data: number) {
    setProdutoId(data);
  }

  const contextValue: ProdutoIdContextType = {
    produtoId,
    handleSetProdutoId,
  };

  return (
    <ProdutoIdContext.Provider value={contextValue}>
      {children}
    </ProdutoIdContext.Provider>
  );
}

export default ProdutoIdProvider;
