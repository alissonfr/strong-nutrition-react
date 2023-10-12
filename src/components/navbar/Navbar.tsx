import './Navbar.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from './../../assets/logo.png'
import { useAuthContext } from '../../contexts';

export const Navbar = () => {
    const { logout } = useAuthContext();

    return (
        <> 
            <header className='header'>
                <section>
                    <img src={Logo} alt="" />
                </section>
                <section>
                    <span><b>Bem vindo,</b> Alisson</span>
                    <NotificationsIcon/>
                    <SettingsIcon onClick={logout}/>
                </section>
            </header>
        </>
      );
}