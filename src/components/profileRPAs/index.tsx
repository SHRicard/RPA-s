import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol, CImage, CCard, CCardBody, CCardHeader, CAlert } from '@coreui/react';
import { theme } from "../../theme";
import BOT from "../../../public/BOTS_2.png";
import { BiEdit } from "react-icons/bi";
import { BotStatusCard, CustomInput, } from "../../ui";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface IPerformance {
    title: string;
    time: number;
    rate: number;
}
interface Process {
    name: string;
    steps: string[];
    frequency: string;
    dataTypes: string[];
    workflow: string[];
    integrations: string[];
    automatedActions: string[];
    performance: IPerformance[]
}

interface IBots {
    id: string;
    name: string;
    type: string;
    status: string;
    processes: Process;
    version?: string;
    createdAt?: string;
    lastUpdate?: string;
    creator?: string;
    lastActivity?: string;
    language?: string;
    description?: string;
}

export const ProfileRPAs: React.FC = () => {
    const { register, setValue, formState: { errors } } = useForm();

    const [bot, setBot] = useState<IBots | null>(null)

    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        const storedBots = localStorage.getItem("bots");
        if (storedBots) {
            const botsArray: IBots[] = JSON.parse(storedBots);
            const foundBot = botsArray.find((b) => b.id === id);
            setValue("decription", foundBot?.description)
            setBot(foundBot || null);
        }
    }, [id]);


    return (
        <CContainer style={{ paddingBottom: "200px" }} >
            <CRow className="d-flex justify-content-center align-items-center py-2 pb-5">
                <CCol md={12}>
                    <strong style={{ color: theme.colorPrimary, fontSize: "1.5rem" }}>
                        Perfil de RPA's
                    </strong>
                </CCol>
            </CRow>

            <CRow className="">
                <CCol md={12}>
                    <CAlert color="warning" className="d-flex align-items-center">
                        <div>
                            <h5 className="alert-heading">¡Atención importante!</h5>
                            <p className="mb-0">
                                Los bots no pueden modificarse directamente ya que cualquier cambio puede causar inconvenientes en los procesos automatizados.
                                <strong> Recomendación:</strong> Apague y elimine el bot existente, luego cree un nuevo bot con la configuración deseada.
                            </p>
                        </div>
                    </CAlert>
                </CCol>
            </CRow>
            <CRow className="py-1">
                <CCol md={12} lg={4} className="pb-5">
                    <CCard className="text-center" style={{
                        height: "420px",
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: `1px solid white`
                    }}>
                        <div className="d-flex justify-content-center align-items-center pt-3">
                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                className="mx-2 d-flex justify-content-center align-items-center"
                            >{bot?.name}</span>
                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                        </div>
                        <CCardBody className="d-flex align-items-center justify-content-center ">
                            <div
                                style={{
                                    border: `5px solid ${theme.colorPrimary}`,
                                    borderRadius: '10px'
                                }}
                                className="p-3 ">
                                <CImage
                                    src={BOT}
                                    width={150}
                                    height={150}
                                    className="img-fluid "
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={12} lg={8}>
                    <CCardHeader
                        className="py-3"
                        style={{ backgroundColor: theme.colorPrimary, fontWeight: 'bold', borderRadius: '10px' }}
                    >
                        Automatización
                    </CCardHeader>
                    <CRow className="pt-2 p-2">
                        <CCol lg={6}>
                            <CRow>
                                <CCol md={12}>
                                    <CCard className="text-center py-3" style={{
                                        margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        border: `1px solid white`
                                    }}>

                                        <div className="d-flex justify-content-between align-items-center m-2">
                                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                                className="mx-2 d-flex justify-content-center align-items-center"
                                            >
                                                flujo de trabajo
                                            </span>
                                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center m-2">
                                            <span style={{ color: theme.colorPrimary }}
                                                className="mx-2 d-flex justify-content-center align-items-center"
                                            >{bot?.type}                                            </span>
                                        </div>
                                    </CCard>
                                </CCol>
                                <CCol md={12} className="py-2">
                                    <CCard className="text-center py-3" style={{
                                        margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        border: `1px solid white`
                                    }}>
                                        <div className="d-flex justify-content-between align-items-center m-2">
                                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                                className="mx-2 d-flex justify-content-center align-items-center"
                                            >
                                                Descripción del flujo
                                            </span>
                                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                                        </div>
                                        <div className="text-start py-1 m-2">
                                            <CustomInput
                                                size="sm"
                                                label="Descripción RPA´s"
                                                type="textarea"
                                                id="decription"
                                                register={register}
                                                validationRules={{ minLength: 10 }}
                                                errorMessage={errors.mensaje?.message as string}
                                                required={true}
                                                rows={3}
                                                placeholder="Escribe tu mensaje aquí..."
                                                disabled={true}
                                            />
                                        </div>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol lg={6}>
                            <CCard
                                className="text-center"
                                style={{
                                    height: "350px",
                                    margin: 'auto',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    border: `1px solid white`,
                                    minHeight: '250px',
                                }}
                            >
                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center m-2 py-3">
                                        <span
                                            style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                            className="mx-2 d-flex justify-content-center align-items-center"
                                        >
                                            Proceso Involucrado
                                        </span>
                                        <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                                    </div>
                                    {bot?.processes && (
                                        <div className="mb-3">
                                            <ul className="list-unstyled ps-4">
                                                {bot.processes.steps.map((step, index) => (
                                                    <li key={`step-${index}`} className="mb-2 d-flex">
                                                        <span className="me-2" style={{ color: theme.colorPrimary }}>•</span>
                                                        <span style={{ fontSize: '0.9rem' }}>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <CRow className="d-flex justify-content-center">
                <CCol md={6} className="pb-2">
                    <CCardHeader
                        className="py-3"
                        style={{ backgroundColor: theme.colorPrimary, fontWeight: 'bold', borderRadius: '10px' }}
                    >
                        Flujo de trabajo
                    </CCardHeader>
                    <CCard className="text-center" style={{
                        margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: `1px solid white`
                    }}>
                        <div className="d-flex justify-content-between align-items-center m-2 py-3">
                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                className="mx-2 d-flex justify-content-center align-items-center">
                                Acciones a automatizar
                            </span>
                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                        </div>
                        {bot?.processes && (
                            <div className="mb-3">
                                <ul className="list-unstyled ps-4">
                                    {bot.processes.workflow.map((step, index) => (
                                        <li key={`step-${index}`} className="mb-2 d-flex">
                                            <span className="me-2" style={{ color: theme.colorPrimary }}>•</span>
                                            <span style={{ fontSize: '0.9rem' }}>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CCard>

                </CCol>
                <CCol md={6}>
                    <CCardHeader
                        className="py-3"
                        style={{ backgroundColor: theme.colorPrimary, fontWeight: 'bold', borderRadius: '10px' }}
                    >
                        Integración
                    </CCardHeader>
                    <CCard className="text-center" style={{
                        margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: `1px solid white`
                    }}>
                        <div className="d-flex justify-content-between align-items-center m-2 py-3">
                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                className="mx-2 d-flex justify-content-center align-items-center">
                                Acciones a integrar
                            </span>
                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                        </div>
                        {bot?.processes && (
                            <div className="mb-3">
                                <ul className="list-unstyled ps-4">
                                    {bot.processes.integrations.map((type, index) => (
                                        <li key={`step-${index}`} className="mb-2 d-flex">
                                            <span className="me-2" style={{ color: theme.colorPrimary }}>•</span>
                                            <span style={{ fontSize: '0.9rem' }}>{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CCard>
                </CCol>
            </CRow>
            <CRow className="d-flex justify-content-center py-5">
                <CCol md={6}>

                    <CCard className="text-center" style={{
                        margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: `1px solid white`
                    }}>
                        <div className="d-flex justify-content-between align-items-center m-2 py-3">
                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                className="mx-2 d-flex justify-content-center align-items-center">
                                Acciones automatizada
                            </span>
                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                        </div>
                        {bot?.processes && (
                            <div className="mb-3">
                                <ul className="list-unstyled ps-4">
                                    {bot.processes.automatedActions.map((type, index) => (
                                        <li key={`step-${index}`} className="mb-2 d-flex">
                                            <span className="me-2" style={{ color: theme.colorPrimary }}>•</span>
                                            <span style={{ fontSize: '0.9rem' }}>{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CCard>
                </CCol>
                <CCol md={6}>

                    <CCard className="text-center" style={{
                        margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: `1px solid white`
                    }}>
                        <div className="d-flex justify-content-between align-items-center m-2 py-3">
                            <span style={{ color: theme.colorPrimary, fontWeight: 'bold' }}
                                className="mx-2 d-flex justify-content-center align-items-center">
                                Tipos de datos involucrados
                            </span>
                            <BiEdit size={30} style={{ color: theme.colorPrimary }} />
                        </div>
                        {bot?.processes && (
                            <div className="mb-3">
                                <ul className="list-unstyled ps-4">
                                    {bot.processes.dataTypes.map((type, index) => (
                                        <li key={`step-${index}`} className="mb-2 d-flex">
                                            <span className="me-2" style={{ color: theme.colorPrimary }}>•</span>
                                            <span style={{ fontSize: '0.9rem' }}>{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CCard>
                </CCol>
            </CRow>
            <CRow className="rounded-3">
                <CCol lg={12} className="">
                    <CCardHeader
                        className="py-3"
                        style={{ backgroundColor: theme.colorPrimary, fontWeight: 'bold', }}
                    >
                        Rendimiento de este Bots
                    </CCardHeader>
                </CCol>
                <CCol lg={12}>
                    <BotStatusCard bot={bot!} />
                </CCol>

            </CRow>

        </CContainer>
    );
};