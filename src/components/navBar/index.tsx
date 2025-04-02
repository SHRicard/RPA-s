import { CRow, CCol, CImage } from '@coreui/react';
import { GoBell } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import "../../App.css";
import { theme } from '../../theme';
import { useMobile } from '../../hooks';
import { useOffcanvasStore } from '../../store/useOffcanvasStore';
import { TbX } from 'react-icons/tb';
import { MdMenu } from 'react-icons/md';

export const Navbar = () => {
    const isMobile = useMobile();
    const { visible, openCanvas, closeCanvas } = useOffcanvasStore();

    return (
        <CRow
            className="d-flex align-items-center justify-content-between py-3"
            style={{ backgroundColor: theme.colorPrimary, padding: '0 10px' }}
        >
            <CCol className="d-flex justify-content-between align-items-center w-100">
                <Link to="/" className="navbar-brand text-white mx-3">
                    <CImage rounded src="/RPAs_LOGO.png" width={80} height={28} />
                </Link>
                <div className="d-flex align-items-center">
                    {isMobile &&
                        <CCol md="auto" style={{ marginRight: "20px" }} onClick={visible === false ? openCanvas : closeCanvas} >
                            {
                                visible ? (
                                    <TbX
                                        size={30}
                                        style={{
                                            cursor: "pointer",
                                            color: "#FFFFFF",
                                        }}
                                    />
                                ) : (
                                    <MdMenu
                                        size={30}
                                        style={{
                                            cursor: "pointer",
                                            color: "#FFFFFF",
                                        }}
                                    />
                                )}
                        </CCol>
                    }
                    <GoBell size={23} style={{ marginRight: "20px" }} />
                    <FaUserCircle size={23} style={{ marginRight: "20px" }} />
                </div>
            </CCol>
        </CRow>
    );
};
