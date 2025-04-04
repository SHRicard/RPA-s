import { useEffect, useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CProgress,
    CProgressBar,
    CSpinner,
    CButton,
    CTooltip,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CAlert
} from "@coreui/react";
import { PerformanceCard } from "../PerformanceCard";
import { TbRobot, TbRobotOff } from "react-icons/tb";
import { theme } from "../../theme";
import { FaPowerOff, FaCheckCircle } from "react-icons/fa";

interface BotStatusCardProps {
    bot: {
        performance?: any;
        name: string;
        type: string;
        id: string;
    };
}

// Componente para el punto pulsante
const PulsingDot = () => {
    const dotStyle = {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#2eb85c',
        animation: 'pulse 1.5s infinite',
        marginRight: '0.5rem'
    };

    return (
        <>
            <span style={dotStyle}></span>
            <style>
                {`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
        </>
    );
};

export const BotStatusCard = ({ bot }: BotStatusCardProps) => {
    const [online, setOnline] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusMessages, setStatusMessages] = useState<string[]>([]);
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [processType, setProcessType] = useState<"start" | "stop">("start");
    const [processComplete, setProcessComplete] = useState(false);

    useEffect(() => {
        const storedBots = localStorage.getItem("bots");
        if (storedBots) {
            const bots = JSON.parse(storedBots);
            const currentBot = bots.find((b: any) => b?.id === bot?.id);
            setOnline(currentBot?.status === 'active');
        }
    }, [bot?.id]);

    const startupMessages = [
        "Inicializando núcleo del sistema RPA...",
        "Cargando configuración de entorno...",
        "Verificando credenciales de acceso...",
        "Estableciendo conexiones seguras...",
        "Conectando con servicios externos...",
        "Inicializando módulos de inteligencia artificial...",
        "Cargando flujos de trabajo automatizados...",
        "Iniciando servicios de monitoreo en tiempo real...",
        "Preparando base de datos local...",
        "Configurando protocolos de seguridad...",
        "Iniciando secuencia de operaciones...",
        "Realizando comprobaciones finales...",
        "Realizando comprobaciones finales...",
        "Sistema RPA listo para operar"
    ];

    const shutdownMessages = [
        "Iniciando secuencia de apagado seguro...",
        "Notificando a sistemas conectados...",
        "Interrumpiendo procesos activos...",
        "Finalizando ejecución de tareas pendientes...",
        "Guardando estados y logs de operación...",
        "Generando reporte de actividad...",
        "Cerrando conexiones de red activas...",
        "Liberando recursos del sistema...",
        "Limpiando caché temporal y archivos residuales...",
        "Eliminando cookies y datos de sesión sensibles...",
        "Respaldando archivos de configuración...",
        "Desmontando módulos de seguridad...",
        "Cerrando canales de comunicación...",
        "Verificando integridad de datos...",
        "Desactivando interfaces de usuario...",
        "Finalizando servicios en segundo plano...",
        "Generando reporte de finalización...",
        "Generando reporte de finalización...",
        "Sistema RPA detenido correctamente",

    ];

    const updateBotStatus = (id: string, newStatus: boolean) => {
        const storedBots = localStorage.getItem("bots");
        if (storedBots) {
            const bots = JSON.parse(storedBots);
            const updatedBots = bots.map((b: any) =>
                b.id === id ? { ...b, status: newStatus ? 'active' : 'inactive' } : b
            );
            localStorage.setItem("bots", JSON.stringify(updatedBots));
            window.dispatchEvent(new CustomEvent('botsUpdated'));
        }
    };

    const simulateProcess = (starting: boolean) => {
        setProcessType(starting ? "start" : "stop");
        setShowProcessModal(true);
        setLoading(true);
        setProcessComplete(false);
        setProgress(starting ? 0 : 100);
        setStatusMessages([]);

        const messages = starting ? startupMessages : shutdownMessages;
        const totalSteps = messages.length;
        let currentStep = 0;

        const timer = setInterval(() => {
            setProgress(prev => {
                const increment = 100 / totalSteps;
                const newProgress = starting ?
                    Math.min(prev + increment, 100) :
                    Math.max(prev - increment, 0);

                if (currentStep < totalSteps) {
                    setStatusMessages(prev => [...prev, messages[currentStep]]);
                    currentStep++;
                }

                if ((starting && newProgress >= 100) || (!starting && newProgress <= 0)) {
                    clearInterval(timer);
                    setLoading(false);
                    setProcessComplete(true);
                    const newOnlineStatus = starting;
                    setOnline(newOnlineStatus);
                    updateBotStatus(bot.id, newOnlineStatus);
                    setTimeout(() => setShowProcessModal(false), 1500);
                }

                return newProgress;
            });
        }, 600);

        return () => clearInterval(timer);
    };

    const handleStart = () => simulateProcess(true);
    const handleStop = () => simulateProcess(false);

    const consoleStyle = {
        maxHeight: '200px',
        overflowY: 'auto',
        backgroundColor: '#f8f9fa',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace',
        fontSize: '0.85rem'
    };

    return (
        <>
            <CModal
                visible={showProcessModal}
                onClose={() => { }}
                backdrop="static"
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle className="d-flex align-items-center">
                        {processType === "start" ? (
                            <>
                                <TbRobot className="me-2 text-success" />
                                Iniciando Sistema RPA
                            </>
                        ) : (
                            <>
                                <TbRobotOff className="me-2 text-danger" />
                                Apagado Seguro del Sistema
                            </>
                        )}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="text-center">
                        <h5 className="mb-3">{bot?.name}</h5>

                        <CProgress className="mb-3" style={{ height: '20px' }}>
                            <CProgressBar
                                value={progress}
                                color={processType === "start" ?
                                    (progress < 30 ? 'danger' : progress < 70 ? 'warning' : 'success') :
                                    (progress > 70 ? 'danger' : progress > 30 ? 'warning' : 'success')}
                                animated={!processComplete}
                            />
                        </CProgress>

                        <div className="text-start mb-3" style={consoleStyle}>
                            {statusMessages.map((msg, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    {processComplete ? (
                                        <FaCheckCircle className="me-2 text-success" />
                                    ) : (
                                        <CSpinner size="sm" className="me-2" />
                                    )}
                                    <span>{msg}</span>
                                </div>
                            ))}
                        </div>

                        <div className={`small ${processComplete ? 'text-success' : 'text-muted'}`}>
                            {processComplete ? (
                                <strong>
                                    {processType === "start" ?
                                        "Sistema iniciado correctamente" :
                                        "Apagado completado con éxito"}
                                </strong>
                            ) : (
                                processType === "start" ?
                                    `Progreso: ${Math.round(progress)}% completado` :
                                    `Progreso: ${Math.round(100 - progress)}% restante`
                            )}
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter className="justify-content-between">
                    <small className="text-muted">
                        ID: {bot?.id} | {bot?.type}
                    </small>
                    <small className={processComplete ? 'text-success' : 'text-warning'}>
                        {processComplete ? (
                            "Listo"
                        ) : (
                            processType === "start" ?
                                "Inicializando sistema..." :
                                "Ejecutando protocolos de seguridad..."
                        )}
                    </small>
                </CModalFooter>
            </CModal>

            <CCard className="mb-4">
                <CCardHeader className="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{bot?.name}</strong> - {bot?.type}
                    </div>
                    <div className="d-flex align-items-center">
                        <CTooltip content={online ? 'EN LÍNEA' : 'DETENIDO'}>
                            <div className={`badge ${online ? 'bg-success' : 'bg-warning'} text-dark me-3 px-3 py-2`}>
                                {online ? (
                                    <span className="d-flex align-items-center">
                                        <PulsingDot />
                                        EN LÍNEA
                                    </span>
                                ) : (
                                    <span className="d-flex align-items-center">
                                        <FaPowerOff className="me-2" />
                                        DETENIDO
                                    </span>
                                )}
                            </div>
                        </CTooltip>

                        <CTooltip content="Iniciar Sistema RPA">
                            <CButton
                                style={{ backgroundColor: theme.colorPrimary }}
                                size="sm"
                                onClick={handleStart}
                                disabled={loading || online}
                                className="me-3 px-3 d-flex align-items-center"
                            >
                                <TbRobot size={18} className="me-2" style={{ color: "white" }} />
                                <span style={{ color: "white" }} className="d-none d-sm-inline">Iniciar Sistema</span>
                            </CButton>
                        </CTooltip>

                        <CTooltip content="Apagado Seguro">
                            <CButton
                                color="danger"
                                size="sm"
                                onClick={handleStop}
                                disabled={loading || !online}
                                className="px-3 d-flex align-items-center"
                            >
                                <TbRobotOff size={18} className="me-2" style={{ color: "white" }} />
                                <span style={{ color: "white" }} className="d-none d-sm-inline">Apagar Sistema</span>
                            </CButton>
                        </CTooltip>
                    </div>
                </CCardHeader>

                <CCardBody>
                    {online ? (
                        <>
                            <CAlert color="success" className="d-flex align-items-center">
                                <FaCheckCircle className="me-2" size={20} />
                                <div>
                                    <strong>¡Sistema operativo!</strong> El bot {bot.name} está funcionando correctamente.
                                    <div className="small mt-1">Última actividad: {new Date().toLocaleString()}</div>
                                </div>
                            </CAlert>

                            <h5 className="mb-3">Métricas de rendimiento:</h5>
                            <div className="row">
                                {bot?.performance?.map((perfor: any, index: number) => (
                                    <div className="col-12 col-md-6 col-lg-3 py-3" key={index}>
                                        <PerformanceCard
                                            title={perfor.title}
                                            completeRate={perfor.rate}
                                            intervalTime={perfor.time}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="alert alert-secondary text-center py-4">
                            <FaPowerOff size={48} className="mb-3 text-muted" />
                            <h5>Sistema RPA detenido</h5>
                            <p className="mb-3">El sistema no está actualmente en ejecución</p>
                            <CButton
                                color="primary"
                                onClick={handleStart}
                                disabled={loading}
                                className="d-flex align-items-center mx-auto"
                            >
                                <TbRobot className="me-2" />
                                Iniciar Sistema
                            </CButton>
                        </div>
                    )}
                </CCardBody>
            </CCard>
        </>
    );
};