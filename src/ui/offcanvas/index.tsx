import {
    CAvatar,
    CCol,
    COffcanvas,
    COffcanvasBody,
    COffcanvasHeader,
    CRow,
    CSidebarHeader,
    CSidebarNav,
} from '@coreui/react'
import { theme } from '../../theme';
import { useOffcanvasStore } from '../../store/useOffcanvasStore';

import { useMobile, useUser } from '../../hooks';
import { allRouter, dashboard } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';
import { useAuthStore } from '../../store/useAuthStore';

interface SidebarCoreUIProps {
    sidebarHeight: string;
}
export const Offcanvas: React.FC<SidebarCoreUIProps> = ({ sidebarHeight }) => {
    const { visible, closeCanvas } = useOffcanvasStore();

    const isMobile = useMobile()

    const dataUser = useUser()
    const isAdmin = dataUser?.role === "admin" ? allRouter[0] : allRouter[1]
    const isProfileAdmin = dataUser?.role === "admin" ? dashboard[0].rotuer[1] : dashboard[1].rotuer[1]
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate(isProfileAdmin);
    };

    const isOffcanvasVisible = isMobile ? visible : false;
    return (

        <COffcanvas
            style={{
                maxHeight: sidebarHeight,
                top: "64px",
                maxWidth: "250px",
                backgroundColor: theme.colorSecondary,
            }}
            backdrop={false}
            placement="start"
            scroll={true}
            visible={isOffcanvasVisible}
            onHide={closeCanvas}
        >
            <COffcanvasHeader>
                <CSidebarHeader className="border-bottom">
                    <CSidebarNav>
                        <CRow>
                            <CCol md={12} className='d-flex justify-content-center align-items-center'>
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
                    </CSidebarNav>
                </CSidebarHeader>
            </COffcanvasHeader>
            <COffcanvasBody>
                <CSidebarNav className='p-0 m-0'>
                    <CSidebarNav className='p-0 m-0'>
                        {isAdmin.rotuer.map((route, index) => (
                            <Link
                                key={index}
                                to={route}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                    textDecoration: "none",
                                    padding: "15px 5px"
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
                            className="py-3 mx-1"
                            to={"/"}
                            onClick={logout}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-end",
                                color: "white",
                                textDecoration: "none",
                                marginTop: "auto",
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
            </COffcanvasBody>
        </COffcanvas>
    )
}
