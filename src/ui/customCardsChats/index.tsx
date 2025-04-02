import { CAvatar, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { theme } from '../../theme'
import { TbXboxXFilled } from 'react-icons/tb'
import { FaCheckCircle } from 'react-icons/fa'
import { BtnPrimary } from '../btnPrimary';
import { ResponseModal } from '../reponseModal';
import { useState } from 'react';

interface Message {
    type: string;
    message: string;
    timestamp: string;
    adminName?: string;
}

interface User {
    avatar?: string;
    _id?: string;
    name?: string;
    role?: string;
}

interface Conversation {
    id: number;
    title: string;
    status: string;
    active: boolean,
    user: User;
    conversacion: Message[];
}

export const CustomCardChats = ({ conversation }: { conversation: Conversation }) => {
    const [showModal, setShowModal] = useState(false);


    const handleModal = (status: boolean) => {
        setShowModal(status)
    }
    return (
        <CCard className="mb-3">
            {conversation.status === "no solucionado" && (
                <CCard >
                    <CCol md={12} className='text-white text-center py-2' style={{ backgroundColor: theme.colorSecondary }}>No Solucionado</CCol>
                </CCard>
            )}
            {conversation.status === "solucionado" && (
                <CCard >
                    <CCol md={12} className='text-white text-center py-2' style={{ backgroundColor: theme.colorSecondary }}>Solucionado</CCol>
                </CCard>
            )}
            <CRow className="align-items-center mx-3 pt-3">
                <CCol sm={12} md="auto" lg="auto" className="d-flex justify-content-center justify-content-md-start pb-sm-3">
                    <div
                        style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            backgroundColor: theme.colorPrimary,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        <CAvatar
                            src={conversation.user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                            size="xl"
                            style={{ width: "70px", height: "70px" }}
                        />
                    </div>
                </CCol>

                {/* Nombre e ID */}
                <CCol sm={12} md="auto" lg="auto" className="d-flex flex-column align-items-center align-items-md-start justify-content-center pb-sm-3">
                    <strong style={{ color: theme.colorPrimary, fontSize: "15px" }}>
                        {conversation.user?.name || "Usuario Anónimo"}
                    </strong>
                    <strong style={{ color: theme.colorPrimary, fontSize: "10px" }}>
                        {conversation.user?._id || "ID Anónimo"}
                    </strong>
                </CCol>

                {/* Estado de la conversación */}
                <CCol xs="auto" className="d-none d-md-flex align-items-center justify-content-end mt-2 mt-sm-0 ms-sm-auto gap-2">
                    {conversation.status === "no solucionado" ? (
                        <div className="d-flex align-items-center gap-1">
                            <TbXboxXFilled style={{ color: '#A9A9A9' }} size={40} />
                            <strong style={{ color: '#A9A9A9', fontSize: "14px" }}>No Solucionado</strong>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-1">
                            <FaCheckCircle style={{ color: theme.colorSecondary }} size={35} />
                            <strong style={{ color: theme.colorSecondary, fontSize: "14px" }}>Solucionado</strong>
                        </div>
                    )}
                </CCol>
            </CRow>
            <CRow className="align-items-center mx-3 pt-3">
                <CCol md={12} className='text-start'>
                    <strong>Conversación</strong>
                </CCol>
                <CCol md={12} className='text-start'>
                    <CCardBody>
                        {conversation.conversacion.map((msg, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                {msg.type === "user" ? (
                                    <p style={{ color: theme.colorPrimary, fontSize: "14px" }}>
                                        <strong>Usuario :</strong> {msg.message}
                                    </p>
                                ) : (
                                    <p style={{ color: theme.colorSecondary, fontSize: "14px" }}>
                                        <strong>Admin ({msg.adminName}):</strong> {msg.message}
                                    </p>
                                )}
                                <ResponseModal
                                    show={showModal}
                                    onClose={handleModal}
                                    id={conversation.id}
                                />
                            </div>

                        ))}
                    </CCardBody>
                </CCol>
            </CRow>
            {conversation.status !== "solucionado" &&
                <CRow className='d-flex justify-content-center align-items-center pb-3'>
                    <CCol md={4}>
                        <div className="d-grid pt-2">
                            <BtnPrimary label="Responder" color="primary" type="button"
                                onClick={() => handleModal(true)} />
                        </div>
                    </CCol>
                </CRow>

            }

        </CCard>
    )
}
