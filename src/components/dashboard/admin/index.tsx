import React from "react";
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react';

export const DashboardAdmin: React.FC = () => {
    return (
        <CContainer fluid>
            <CRow className="d-flex justify-content-center align-items-center">
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h4>Panel de Administración</h4>
                        </CCardHeader>
                        <CCardBody>
                            <p>Bienvenido al panel de administración. Aquí podrás gestionar todos los aspectos relacionados con el sistema.</p>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};
