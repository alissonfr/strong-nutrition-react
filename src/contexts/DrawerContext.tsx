import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { createContext, useCallback, useContext, useState } from 'react';

interface ChildrenDrawerOption {
  label: string;
  path: string;
}

interface DrawerOption {
  icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  path: string;
  children?: ChildrenDrawerOption[];
}

interface DrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: DrawerOption[];
  setDrawerOptions: (newDrawerOptions: DrawerOption[]) => void;
}

const DrawerContext = createContext({} as DrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProviderProps {
  children: React.ReactNode
}
export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<DrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: DrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
