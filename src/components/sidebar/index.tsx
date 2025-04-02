import React, { useState } from 'react'
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavTitle,
    CCol,
    CAvatar,
    CRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react';
import { theme } from '../../theme';
import { TbX } from 'react-icons/tb';
import { MdMenu } from 'react-icons/md';
import { useUser } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { allRouter, dashboard } from '../../utils';
import { cilAccountLogout } from '@coreui/icons';
import { useAuthStore } from '../../store/useAuthStore';

interface SidebarCoreUIProps {
    sidebarHeight: string;
}
export const Sidebar: React.FC<SidebarCoreUIProps> = ({ sidebarHeight }) => {
    const [isNarrow, setIsNarrow] = useState(false);
    const dataUser = useUser()
    const isAdmin = dataUser?.role === "admin" ? allRouter[0] : allRouter[1]
    const isProfileAdmin = dataUser?.role === "admin" ? dashboard[0].rotuer[1] : dashboard[1].rotuer[1]
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate(isProfileAdmin);
    };

    const toggleSidebar = () => {
        setIsNarrow(!isNarrow);
    };
    return (
        <CSidebar narrow={isNarrow} className="border-end" style={{
            height: sidebarHeight,
            top: "2px",
            backgroundColor: theme.colorSecondary,
        }}>
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>
                    <CCol onClick={toggleSidebar}>
                        {isNarrow ? (
                            <MdMenu
                                size={30}
                                style={{
                                    cursor: "pointer",
                                    color: "#FFFFFF",
                                }}
                            />
                        ) : (
                            <TbX
                                size={30}
                                style={{
                                    cursor: "pointer",
                                    color: "#FFFFFF",
                                }}
                            />
                        )}
                    </CCol>
                </CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav>
                <CNavTitle className='pb-5'>
                    <CRow>
                        <CCol md={12} className='d-flex justify-content-center align-items-center py-2'>
                            <div
                                style={{
                                    width: "105px",
                                    height: "105px",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <CAvatar
                                    src={dataUser?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                                    size="xl"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            </div>
                        </CCol>
                        <CCol md={12} className='d-flex justify-content-center align-items-center'>
                            <span style={{ color: "white", fontSize: "20px", letterSpacing: "1px" }}>
                                {dataUser?.name || "Usuario Anónimo"}
                            </span>
                        </CCol>
                        <CCol md={12} className='d-flex justify-content-center align-items-center'>
                            <span
                                style={{
                                    color: "white",
                                    fontSize: "11px",
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                }}
                                onClick={handleProfile}
                            >
                                Editar Perfil
                            </span>

                        </CCol>
                    </CRow>
                </CNavTitle>
                <CSidebarNav className='p-0'>
                    {isAdmin.rotuer.map((route, index) => (
                        <Link
                            key={index}
                            to={route}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                color: "white",
                                textDecoration: "none",
                                padding: isNarrow ? "15px 5px" : "15px 30px"
                            }}
                        >
                            <CIcon
                                customClassName="nav-icon"
                                icon={isAdmin.icons[index]}
                                style={{ color: "white", fontSize: "20px" }}
                            />
                            <span>{isAdmin.text[index] || route.replace("/", "").replace("-", " ").toUpperCase()}</span>
                        </Link>
                    ))}
                    <Link
                        to={"/"}
                        onClick={logout}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            color: "white",
                            textDecoration: "none",
                            padding: isNarrow ? "15px 5px" : "15px 30px",
                            flexGrow: 1,
                            justifyContent: "flex-start"
                        }}
                    >
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilAccountLogout}
                            style={{ color: "white", fontSize: "20px" }}
                        />
                        <span>Log out</span>
                    </Link>
                </CSidebarNav>
            </CSidebarNav>
        </CSidebar>
    )
}
