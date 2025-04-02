import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, } from '@coreui/react';
import { theme } from '../../theme';

interface PopupAlertProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PopupAlert: React.FC<PopupAlertProps> = ({ showModal, onClose, onConfirm }) => {
    return (
        <CModal visible={showModal} onClose={onClose} alignment="center">
            <CModalHeader>
                <h5 className="modal-title" style={{ color: theme.colorPrimary }}>
                    Confirmación
                </h5>
            </CModalHeader>
            <CModalBody>
                <p>¿Está seguro de que desea recuperar su contraseña? Se enviará un correo con su contraseña actual.</p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Cancelar
                </CButton>
                <CButton color="primary" onClick={onConfirm}>
                    Confirmar
                </CButton>
            </CModalFooter>
        </CModal>
    );
};


