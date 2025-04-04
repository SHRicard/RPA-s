import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CButton,
    CAlert
} from '@coreui/react';
import { MdErrorOutline, MdPowerSettingsNew } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { BtnPrimary } from '../btnPrimary';

interface ModalErrorShutdownProps {
    show: boolean;
    setShow: (value: boolean) => void;
    robotName?: string;
}

export const ModalErrorShutdown: React.FC<ModalErrorShutdownProps> = ({
    show,
    setShow,
    robotName = 'el robot'
}) => {
    return (
        <CModal
            visible={show}
            onClose={() => setShow(false)}
            backdrop="static"
            alignment="center"
            size="lg"
            keyboard={false}
            aria-labelledby="error-shutdown-modal-title"
        >
            <CModalHeader className="text-center py-3">
                <div className="d-flex align-items-center gap-3 text-danger">
                    <MdErrorOutline size={28} className="flex-shrink-0" />
                    <h4 id="error-shutdown-modal-title" className="mb-0 fw-bold">
                        No se puede eliminar {robotName}
                    </h4>
                </div>
            </CModalHeader>

            <CModalBody className="pt-0">
                <CAlert color="danger" className="d-flex align-items-start">
                    <FaExclamationTriangle className="mt-1 me-2 flex-shrink-0" />
                    <div>
                        <strong>Acción requerida:</strong> Para poder eliminar {robotName}, primero
                        debes apagar el sistema correctamente.
                    </div>
                </CAlert>

                <div className="mt-4">
                    <h5 className="h6 mb-3">Sigue estos pasos:</h5>
                    <ol className="ps-3">
                        <li className="mb-2">
                            Dirígete a la sección de detalles del robot.
                        </li>
                        <li className="mb-2">
                            Desplázate hasta la parte inferior del componente.
                        </li>
                        <li className="mb-2">
                            Localiza el botón <strong className="text-danger">"Apagar sistema"</strong>
                            <MdPowerSettingsNew className="ms-1 text-danger" />.
                        </li>
                        <li>
                            Una vez completado el apagado, vuelve a intentar eliminar {robotName}.
                        </li>
                    </ol>
                </div>
            </CModalBody>

            <CModalFooter className="border-top-0">
                <BtnPrimary
                    label="Entendido"
                    color="primary"
                    type="button"
                    onClick={() => setShow(false)}
                />
            </CModalFooter>
        </CModal>
    );
};