import "./Sidenav.scss"
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface SidenavProps {
    children: React.ReactNode;
  }

export const Sidenav: React.FC<SidenavProps> = ({ children }) => {
    return (
        <>
            <section className='sidenav'>
                <div className="items">
                    <div className="item">
                        <div className="bar"></div>
                        <i><HomeIcon/></i>
                        Página inicial
                    </div>
                    <div className="item">
                        <div className=""></div>
                        <i><AttachMoneyIcon/></i>
                        Caixa
                    </div>
                    <div className="item">
                        <div className=""></div>
                        <i><BarChartIcon/></i>
                        Vendas
                    </div>
                    <div className="item">
                        <div className=""></div>
                        <i><CreateNewFolderIcon/></i>
                        Cadastros
                    </div>
                </div>
            </section>
            <div className="routes">
                {children}
            </div>
        </>
    )
}