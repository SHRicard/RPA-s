import React, { useState } from "react";
import {
    CContainer,
    CRow,
    CCol,
} from '@coreui/react';
import {
    AddFAQModal,
    AddResourcesModal,
    BtnPrimary,
    Divider,
    FAQModal,
    ViewResourcesModal,
} from "../../../ui";
import { useUser } from "../../../hooks";
import { theme } from "../../../theme";
import { Tabs } from "../../tabs";
import FAQ from "../../../data/FAQ.data.json"
import resources from "../../../data/resources.data.json"

type AuthData = {
    email: string;
    role: "admin" | "user" | null;
    name: string | null;
    avatar: string | null;
    isAuthenticated: boolean;
    documents: string | null;
    dateBirth: string | null;
    genero: string | null;
    country: string | null;
    city: string | null;
    password: string | null;
    _id: string | null;
};
export const SupportAdmin: React.FC = () => {
    const [FAQS, setFAQS] = useState(false);
    const [addFAQS, setAddFAQS] = useState(false);
    const [resourcesData, setResourcesData] = useState(false);
    const [addResources, setAddResources] = useState(false);
    const dataUser = useUser()

    const userFAQs = dataUser
        ? FAQ.filter(faq => faq.admin.name === (dataUser as AuthData).name)
        : [];



    const handleFAQModal = (status: boolean) => {
        setFAQS(status)
    }
    const handleAddFAQModal = (status: boolean) => {
        setAddFAQS(status)
    }

    const handleResourcesModal = (status: boolean) => {
        setResourcesData(status)
    }
    const handleAddResources = (status: boolean) => {
        setAddResources(status)
    }

    return (
        <CContainer>
            <CCol style={{ paddingBottom: "200px" }}>
                <CRow className="d-flex justify-content-center align-items-center">
                    <CCol md={12}>
                        <strong style={{ color: theme.colorPrimary, fontSize: "1.5rem" }}>
                            Soluciones dadas a los usuarios
                        </strong>
                    </CCol>
                </CRow>
                <CRow className="mx-2 pt-5">
                    <CCol md={12} className="text-start">
                        <strong style={{ color: theme.colorPrimary, fontSize: "1rem" }}>
                            Agregar Preguntas frecuentes y respuestas
                        </strong>
                        <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                            Para agregar una pregunta frecuente junto con su respuesta, sigue estos pasos:
                        </p>
                        <ol style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                            <li>Haz clic en el botón "Agregar".</li>
                            <li>En el campo "Pregunta", escribe la pregunta que deseas agregar.</li>
                            <li>En el campo "Respuesta", escribe la respuesta correspondiente a esa pregunta.</li>
                            <li>Una vez completado, haz clic nuevamente en el botón "Agregar" para guardar la pregunta y respuesta.</li>
                        </ol>
                        <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                            Si deseas agregar más preguntas y respuestas, repite este proceso.
                        </p>
                    </CCol>
                    <CCol md={4}>
                        <div className="d-grid pt-2">
                            <BtnPrimary label="Agregar" color="primary" type="button" onClick={() => handleAddFAQModal(true)} />
                        </div>
                    </CCol>
                    <CCol md={4}>
                        <div className="d-grid pt-2">
                            <BtnPrimary label="Ver Pregunta" color="secondary" type="button" onClick={() => handleFAQModal(true)} />
                        </div>
                    </CCol>
                    <CRow className="mx-2">
                        <Divider />
                    </CRow>
                </CRow>
                <CRow className="mx-3 mx-sm-2">
                    <CCol md={12} className="text-start">
                        <strong style={{ color: theme.colorPrimary, fontSize: "1rem" }}>
                            Agregar Recursos útiles para usuarios
                        </strong>
                        <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                            Para agregar un recurso útil o una notificación para los usuarios, sigue estos pasos:
                        </p>
                        <ol style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                            <li>Haz clic en el botón "Agregar".</li>
                            <li>En el campo "Título", escribe el título del recurso o la notificación.</li>
                            <li>En el campo "Descripción", agrega la información o instrucciones detalladas para los usuarios.</li>
                            <li>Una vez completado, haz clic nuevamente en el botón "Agregar" para guardar el recurso.</li>
                        </ol>
                        <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                            Si deseas agregar más recursos útiles, repite este proceso.
                        </p>
                    </CCol>
                    <CCol md={4}>
                        <div className="d-grid pt-2">
                            <BtnPrimary label="Agregar" color="primary" type="button"
                                onClick={() => handleAddResources(true)} />
                        </div>
                    </CCol>
                    <CCol md={4}>
                        <div className="d-grid pt-2">
                            <BtnPrimary label="Ver Recurso" color="secondary" type="button" onClick={() => handleResourcesModal(true)} />
                        </div>
                    </CCol>
                    <Divider />
                </CRow>
                <CRow className="mx-3 mx-sm-2 d-flex justify-content-center ">
                    <Tabs />
                </CRow>
                <FAQModal
                    show={FAQS}
                    onClose={handleFAQModal}
                    faqs={userFAQs}
                />
                <AddFAQModal
                    show={addFAQS}
                    onClose={handleAddFAQModal} />
                <ViewResourcesModal
                    resources={resources}
                    show={resourcesData}
                    onClose={handleResourcesModal}
                />
                <AddResourcesModal
                    show={addResources}
                    onClose={handleAddResources}
                />
            </CCol>

        </CContainer>
    );
};
