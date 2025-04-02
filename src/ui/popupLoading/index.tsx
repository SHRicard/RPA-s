import React, { useState, useEffect } from 'react';
import { CModal, CModalBody, CSpinner, CRow, CCol } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../theme';
import { IoMdCheckmark } from 'react-icons/io';
import { BtnPrimary } from '../btnPrimary';

interface PopupLoadingProps {
    showModal: boolean;
    closeLoading: () => void;
    message: string;
    subMessage: string;
    pushRouter?: string
}

export const PopupLoading: React.FC<PopupLoadingProps> = ({ showModal, closeLoading, message, subMessage, pushRouter }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (showModal) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [showModal]);

    const handleClose = () => {
        if (pushRouter) {
            navigate(pushRouter);
        } else {
            closeLoading();
        }
    };

    return (
        <CModal visible={showModal} onClose={handleClose} alignment="center">
            <CModalBody>
                {loading ? (
                    <CRow>
                        <CCol md={12} className="d-flex justify-content-between align-items-center">
                            <strong role="status" style={{ color: theme.colorPrimary }}>{message}</strong>
                            <CSpinner color="secondary" />
                        </CCol>
                    </CRow>

                ) : (
                    <CRow className="d-flex justify-content-center align-items-center pb-3">
                        <CCol md="auto" className="d-flex justify-content-between align-items-center pb-3">
                            <strong className='mx-3' role="status" style={{ color: theme.colorPrimary }}>{subMessage}</strong>
                            <IoMdCheckmark size={30} className='mx-3' style={{ color: theme.successColor }} />
                        </CCol>
                        <CRow className="justify-content-center mx-5">
                            <BtnPrimary label="OK" color="primary" type="button" onClick={handleClose} />
                        </CRow>
                    </CRow>


                )}
            </CModalBody>
        </CModal>
    );
};