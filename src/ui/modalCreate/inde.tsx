import {
    CModal,
    CModalBody,
    CModalFooter,
    CCol,
    CRow,
    CImage,
    CFormCheck,
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody
} from '@coreui/react';
import { BtnPrimary } from '../btnPrimary';
import { useForm } from 'react-hook-form';
import { useRefresh } from '../../store/useRefresh';
import { theme } from '../../theme';
import BOT from "../../../public/RPAS_3.png";
import { useState } from 'react';

interface ResponseModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
    refresh: boolean,
    setRefresh: (pros: boolean) => void
}

type FormData = {
    name: string;
    description: string;
    type: string;
    workflowTitle: string;
    processes: string[];
    automatedActions: string[];
    integrations: string[];
    dataTypes: string[];
};

// Opciones predefinidas para cada categoría
const PROCESS_OPTIONS = [
    // Autenticación
    "Captura credenciales",
    "Valida credenciales en base de datos",
    "Verificación de doble factor",
    "Gestión de sesiones",
    "Renovación de tokens",
    "Bloqueo por intentos fallidos",

    // Procesos de datos
    "Extracción de datos",
    "Transformación de datos",
    "Carga de datos (ETL)",
    "Validación de formatos",
    "Normalización de información",

    // Comunicación
    "Envío de notificaciones",
    "Generación de reportes",
    "Alertas automáticas",
    "Integración con APIs",

    // Seguridad
    "Encriptación de datos",
    "Registro de auditoría",
    "Detección de anomalías",
    "Cumplimiento de políticas",

    // Operaciones
    "Ejecución programada",
    "Monitorización continua",
    "Escalado automático",
    "Gestión de errores"
];

const AUTOMATED_ACTIONS_OPTIONS = [
    // Autenticación
    "Autenticación en segundo plano",
    "Generación automática de tokens",
    "Expiración y renovación de sesiones",
    "Notificación de intentos fallidos",
    "Bloqueo de cuentas por seguridad",

    // Procesamiento
    "Transformación automática de datos",
    "Conversión de formatos",
    "Validación de reglas de negocio",
    "Aplicación de fórmulas calculadas",

    // Comunicación
    "Envío automático de emails",
    "Notificaciones push",
    "Mensajería en Teams/Slack",
    "Alertas por SMS",

    // Integración
    "Sincronización con sistemas externos",
    "Actualización bidireccional de datos",
    "Consumo de APIs REST",
    "Publicación en colas de mensajes",

    // Mantenimiento
    "Backup automático",
    "Limpieza de datos temporales",
    "Optimización de bases de datos",
    "Actualización de componentes"
];

const INTEGRATION_OPTIONS = [
    // Identity Providers
    "Okta (SSO)",
    "Active Directory",
    "Auth0",
    "Keycloak",
    "Azure AD",
    "Google Identity",
    "AWS IAM",

    // MFA/SSO
    "Duo Security (MFA)",
    "Ping Identity",
    "AWS Cognito",
    "OneLogin",
    "JumpCloud",

    // Productivity Suites
    "Google Workspace",
    "Microsoft 365",
    "Zoho Workplace",
    "Slack",
    "Teams",

    // Cloud Services
    "AWS",
    "Azure",
    "Google Cloud",
    "IBM Cloud",
    "Oracle Cloud",

    // ERP/CRM
    "SAP",
    "Salesforce",
    "Dynamics 365",
    "Oracle ERP",
    "Workday",

    // Bases de datos
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQL Server",
    "Oracle DB"
];

const DATA_TYPE_OPTIONS = [
    // Autenticación
    "credenciales",
    "tokens",
    "certificados digitales",
    "claves API",

    // Registros
    "logs de acceso",
    "registros de auditoría",
    "trazas de ejecución",
    "eventos del sistema",

    // Datos personales
    "información personal (PII)",
    "datos sensibles",
    "datos biométricos",
    "preferencias de usuario",

    // Configuraciones
    "configuraciones de sistema",
    "parámetros de conexión",
    "plantillas",
    "scripts",

    // Transaccionales
    "datos financieros",
    "transacciones comerciales",
    "órdenes de compra",
    "facturas electrónicas",

    // Operativos
    "métricas de rendimiento",
    "estadísticas de uso",
    "KPI del sistema",
    "alertas y notificaciones"
];

export const ModalCreate = ({ show, onClose, refresh, setRefresh }: ResponseModalProps) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
        defaultValues: {
            processes: [],
            automatedActions: [],
            integrations: [],
            dataTypes: []
        }
    });
    const { triggerRefresh } = useRefresh();
    const [activeKey] = useState<string | number | undefined>(undefined);

    const generateRandomPerformance = () => {
        const performanceTitles = [
            "Autenticaciones por minuto",
            "Tokens generados",
            "Intentos fallidos",
            "Sesiones activas",
            "Procesos completados",
            "Errores detectados",
            "Tiempo promedio de ejecución",
            "Solicitudes atendidas"
        ];

        const selectedTitles: string[] = [];
        while (selectedTitles.length < 4) {
            const randomIndex = Math.floor(Math.random() * performanceTitles.length);
            const title = performanceTitles[randomIndex];
            if (!selectedTitles.includes(title)) {
                selectedTitles.push(title);
            }
        }

        return selectedTitles.map(title => ({
            title,
            time: Math.floor(Math.random() * 20000) + 5000,
            rate: Math.floor(Math.random() * 50) + 50
        }));
    };

    const generateBotId = () => {
        const randomNum = Math.floor(Math.random() * 900) + 100;
        return `BOT-${randomNum}`;
    };

    const handleCheckboxChange = (field: keyof FormData, value: string, isChecked: boolean) => {
        const currentValues = (watch(field) as string[]) || [];
        const newValues = isChecked
            ? [...currentValues, value]
            : currentValues.filter(item => item !== value);

        setValue(field, newValues);
    };

    const handleFormSubmit = (data: FormData) => {
        const newBot = {
            id: generateBotId(),
            name: data.name,
            performance: generateRandomPerformance(),
            description: data.description,
            createdAt: new Date().toLocaleDateString('es-ES'),
            lastUpdate: new Date().toLocaleDateString('es-ES'),
            type: data.type,
            status: "inactive",
            completeRate: Math.floor(Math.random() * 30) + 70,
            intervalTime: 5000,
            processes: {
                name: data.workflowTitle,
                steps: data.processes,
                automatedActions: data.automatedActions,
                integrations: data.integrations,
                frequency: "Por solicitud",
                dataTypes: data.dataTypes,
                workflow: data.processes.map(step => `Ejecuta: ${step}`)
            }
        };

        const storedBots = localStorage.getItem("bots");
        const bots = storedBots ? JSON.parse(storedBots) : [];
        bots.push(newBot);
        localStorage.setItem("bots", JSON.stringify(bots));
        setRefresh(!refresh);
        triggerRefresh();
        reset();
        onClose(false);
    };

    return (
        <CModal
            visible={show}
            onClose={() => onClose(false)}
            backdrop="static"
            alignment="center"
            size="lg"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <CModalBody>
                    <CRow>
                        <CCol md={12} className="fw-bold text-center"
                            style={{
                                textTransform: 'uppercase',
                                fontSize: '1rem',
                                color: theme.colorPrimary
                            }}>Crea RPA´s</CCol>
                        <CCol md={12} className='text-center py-2'>
                            <CImage
                                src={BOT}
                                width={100}
                                height={100}
                                className="img-fluid mx-auto"
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={12}>
                            <CFormLabel>Nombre de RPA´s *</CFormLabel>
                            <CFormInput
                                size="sm"
                                {...register("name", {
                                    required: "El nombre es obligatorio",
                                    minLength: {
                                        value: 5,
                                        message: "Mínimo 5 caracteres"
                                    }
                                })}
                                invalid={!!errors.name}
                            />
                            {errors.name && <div className="text-danger small">{errors.name.message}</div>}
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={12}>
                            <CFormLabel>Tipo de RPA *</CFormLabel>
                            <CFormInput
                                size="sm"
                                {...register("type", {
                                    required: "El tipo es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "Mínimo 3 caracteres"
                                    }
                                })}
                                invalid={!!errors.type}
                                placeholder="Ej: security, finance, hr, etc."
                            />
                            {errors.type && <div className="text-danger small">{errors.type.message}</div>}
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={12}>
                            <CFormLabel>Título de flujo de trabajo *</CFormLabel>
                            <CFormInput
                                size="sm"
                                {...register("workflowTitle", {
                                    required: "El título es obligatorio",
                                    minLength: {
                                        value: 5,
                                        message: "Mínimo 5 caracteres"
                                    }
                                })}
                                invalid={!!errors.workflowTitle}
                                placeholder="Ej: Login de usuarios"
                            />
                            {errors.workflowTitle && <div className="text-danger small">{errors.workflowTitle.message}</div>}
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={12}>
                            <CFormLabel>Descripción Breve *</CFormLabel>
                            <CFormTextarea
                                {...register("description", {
                                    required: "La descripción es obligatoria",
                                    minLength: {
                                        value: 10,
                                        message: "Mínimo 10 caracteres"
                                    }
                                })}
                                invalid={!!errors.description}
                                rows={3}
                                placeholder="Describe el propósito del RPA..."
                            />
                            {errors.description && <div className="text-danger small">{errors.description.message}</div>}
                        </CCol>
                    </CRow>

                    {/* Secciones con checkboxes en acordeón */}
                    <CAccordion activeItemKey={activeKey} >
                        {/* Procesos involucrados */}
                        <CAccordionItem itemKey="1">
                            <CAccordionHeader>Procesos involucrados *</CAccordionHeader>
                            <CAccordionBody>
                                <CRow>
                                    {PROCESS_OPTIONS.map(option => (
                                        <CCol md={6} key={option}>
                                            <CFormCheck
                                                id={`process-${option}`}
                                                label={option}
                                                value={option}
                                                checked={watch("processes")?.includes(option)}
                                                onChange={(e) => handleCheckboxChange("processes", option, e.target.checked)}
                                            />
                                        </CCol>
                                    ))}
                                </CRow>
                                {errors.processes && <div className="text-danger small mt-2">{errors.processes.message}</div>}
                                <input type="hidden" {...register("processes", { required: "Seleccione al menos un proceso" })} />
                            </CAccordionBody>
                        </CAccordionItem>

                        {/* Acciones a automatizar */}
                        <CAccordionItem itemKey="2">
                            <CAccordionHeader>Acciones a automatizar *</CAccordionHeader>
                            <CAccordionBody>
                                <CRow>
                                    {AUTOMATED_ACTIONS_OPTIONS.map(option => (
                                        <CCol md={6} key={option}>
                                            <CFormCheck
                                                id={`action-${option}`}
                                                label={option}
                                                value={option}
                                                checked={watch("automatedActions")?.includes(option)}
                                                onChange={(e) => handleCheckboxChange("automatedActions", option, e.target.checked)}
                                            />
                                        </CCol>
                                    ))}
                                </CRow>
                                {errors.automatedActions && <div className="text-danger small mt-2">{errors.automatedActions.message}</div>}
                                <input type="hidden" {...register("automatedActions", { required: "Seleccione al menos una acción" })} />
                            </CAccordionBody>
                        </CAccordionItem>

                        {/* Aplicaciones a Integrar */}
                        <CAccordionItem itemKey="3">
                            <CAccordionHeader>Aplicaciones a Integrar *</CAccordionHeader>
                            <CAccordionBody>
                                <CRow>
                                    {INTEGRATION_OPTIONS.map(option => (
                                        <CCol md={6} key={option}>
                                            <CFormCheck
                                                id={`integration-${option}`}
                                                label={option}
                                                value={option}
                                                checked={watch("integrations")?.includes(option)}
                                                onChange={(e) => handleCheckboxChange("integrations", option, e.target.checked)}
                                            />
                                        </CCol>
                                    ))}
                                </CRow>
                                {errors.integrations && <div className="text-danger small mt-2">{errors.integrations.message}</div>}
                                <input type="hidden" {...register("integrations", { required: "Seleccione al menos una integración" })} />
                            </CAccordionBody>
                        </CAccordionItem>

                        {/* Tipos de datos involucrados */}
                        <CAccordionItem itemKey="4">
                            <CAccordionHeader>Tipos de datos involucrados *</CAccordionHeader>
                            <CAccordionBody>
                                <CRow>
                                    {DATA_TYPE_OPTIONS.map(option => (
                                        <CCol md={6} key={option}>
                                            <CFormCheck
                                                id={`dataType-${option}`}
                                                label={option}
                                                value={option}
                                                checked={watch("dataTypes")?.includes(option)}
                                                onChange={(e) => handleCheckboxChange("dataTypes", option, e.target.checked)}
                                            />
                                        </CCol>
                                    ))}
                                </CRow>
                                {errors.dataTypes && <div className="text-danger small mt-2">{errors.dataTypes.message}</div>}
                                <input type="hidden" {...register("dataTypes", { required: "Seleccione al menos un tipo de dato" })} />
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                </CModalBody>
                <CModalFooter>
                    <BtnPrimary
                        label="Cancelar"
                        color="secondary"
                        onClick={() => onClose(false)}
                        type="button"
                    />
                    <BtnPrimary
                        label={"Crear RPA"}
                        color="primary"
                        type="submit"
                    />
                </CModalFooter>
            </form>
        </CModal>
    );
};