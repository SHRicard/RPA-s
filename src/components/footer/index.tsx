import { CRow, CCol, CImage } from '@coreui/react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';

export const Footer = () => {
    return (
        <CRow className='d-flex w-100 m-0 p-0' style={{
            backgroundColor: theme.colorPrimary,
            height: "130px",
            position: "fixed",
            bottom: 0,
            zIndex: 3,
            left: 0,
        }}>
            <CCol md={12} className="d-flex align-items-center justify-content-end py-4">
                <Link to="/" className="text-white" style={{ marginRight: "10px" }}>
                    <CImage rounded src="/RPAs_LOGO.png" width={100} height={30} />
                </Link>
            </CCol>
            <CCol md={12} className="d-flex justify-content-center align-items-center ms-auto">
                <div style={{ width: "90%", height: "1px", backgroundColor: "#FFFFFF" }} />
            </CCol>
            <CCol md={12} className="d-flex justify-content-center align-items-center ms-auto">
                <strong className='py-2' style={{ fontSize: 13, fontWeight: theme.regularWeightTextSecondary }} >
                    Copyright © 2025 RRicardo. All Rights Reserved
                </strong>
            </CCol>
        </CRow>
    );
};
