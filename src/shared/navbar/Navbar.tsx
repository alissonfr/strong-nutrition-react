import './Navbar.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from './../../assets/logo.png'
import { useAuthContext } from '../../contexts';
import { User } from '../../models/user';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const { logout } = useAuthContext();
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user)
          setUserName(JSON.parse(user).nome)
      }, [userName]);
      

    return (
        <>
            <header className='header'>
                <section>
                    <img src={Logo} alt="" />
                </section>
                <section>
                    <span><b>Bem vindo,</b> {userName}</span>
                    <NotificationsIcon />
                    <SettingsIcon onClick={logout} />
                </section>
            </header>
        </>
    );
}