import { CRow, CCol } from '@coreui/react';

export const Divider = () => {
    return (
        <CRow className="my-4">
            <CCol>
                <div style={{ borderBottom: '2px solid #ddd' }}></div>
            </CCol>
        </CRow>
    );
};


