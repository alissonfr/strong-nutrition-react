import "./Sidenav.scss"
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';
import { useMediaQuery, useTheme } from '@mui/material';

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useMemo } from "react";

interface SidenavItemProps {
    icon: OverridableComponent<SvgIconTypeMap>;
    onClick: (() => void) | undefined;
    label: string;
    path: string;
    children?: Array<{ label: string, path: string }>;
}
const SidenavItem: React.FC<SidenavItemProps> = ({ path, icon, label, onClick, children }) => {
    const Icon = useMemo(() => {
        const Icon = icon;
        return <Icon />;
    }, [icon]);

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(path);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = (path: string) => {
        if (children) return
        navigate(path);
        onClick?.();
    };

    const handleChildClick = (childPath: string) => {
        navigate(path + childPath);
        onClick?.();
    };

    return (
        <>
            <div className="sidenav-item">
                <div className={!!match ? 'active item' : 'item'} onClick={() => handleClick(path)}>
                    <div className={!!match ? 'bar active' : 'bar'}></div>
                    <i>{Icon}</i>
                    {label}
                </div>
                {children ? children.map((child: any) => (
                    <div key={child} className="children" onClick={() => handleChildClick(child.path)}>
                        <div className="children-item">{child.label}</div>
                    </div>
                )) : ''}
            </div>
        </>
    );
};

interface SidenavProps {
    children: React.ReactNode;
}
export const Sidenav: React.FC<SidenavProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { drawerOptions, toggleDrawerOpen } = useDrawerContext();

    return (
        <>
            <div className="content">
                <section className="sidenav">
                    <div className="items">
                        {drawerOptions.map(drawerOption => (
                            <SidenavItem
                                path={drawerOption.path}
                                key={drawerOption.path}
                                icon={drawerOption.icon}
                                label={drawerOption.label}
                                onClick={smDown ? toggleDrawerOpen : undefined}
                                children={drawerOption.children}
                            />
                        ))}
                    </div>
                </section>

                <div className="routes">
                    {children}
                </div>
            </div>
        </>
    );
};