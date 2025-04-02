// import { useEffect, useState, useRef } from "react";
// import {
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CProgress,
//     CProgressBar,
//     CSpinner,
//     CButton,
//     CTooltip,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter
// } from "@coreui/react";
// import { PerformanceCard } from "../PerformanceCard";
// import { TbRobot, TbRobotOff } from "react-icons/tb";
// import { theme } from "../../theme";

// interface BotStatusCardProps {
//     bot: {
//         performance?: any;
//         name: string;
//         type: string;
//         id: string;
//     };
//     onStatusChange?: (id: string, status: boolean) => void;
// }

// export const BotStatusCard = ({ bot, onStatusChange }: BotStatusCardProps) => {
//     const [loading, setLoading] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [statusMessages, setStatusMessages] = useState<string[]>([]);
//     const [online, setOnline] = useState(false);
//     const [showProcessModal, setShowProcessModal] = useState(false);
//     const [processType, setProcessType] = useState<"start" | "stop">("start");

//     // Mensajes de estado simulados
//     const startupMessages = [
//         "Inicializando módulos principales...",
//         "Cargando configuración...",
//         "Estableciendo conexiones...",
//         "Verificando integraciones...",
//         "Preparando flujos de trabajo...",
//         "Iniciando servicios..."
//     ];

//     const shutdownMessages = [
//         "Deteniendo procesos...",
//         "Cerrando conexiones...",
//         "Guardando estado...",
//         "Liberando recursos...",
//         "Finalizando servicios..."
//     ];

//     // Simular proceso de inicio/apagado
//     const simulateProcess = (starting: boolean) => {
//         setProcessType(starting ? "start" : "stop");
//         setShowProcessModal(true);
//         setLoading(true);
//         setProgress(0);
//         setStatusMessages([]);

//         const messages = starting ? startupMessages : shutdownMessages;
//         const timer = setInterval(() => {
//             setProgress(prev => {
//                 const increment = starting ?
//                     Math.floor(Math.random() * 15) + 5 :
//                     -(Math.floor(Math.random() * 10) + 5);

//                 let newProgress = prev + increment;
//                 newProgress = Math.max(0, Math.min(100, newProgress));

//                 if ((starting && newProgress >= 100) || (!starting && newProgress <= 0)) {
//                     clearInterval(timer);
//                     setLoading(false);
//                     setOnline(starting);
//                     setTimeout(() => setShowProcessModal(false), 1000);
//                     if (onStatusChange) {
//                         onStatusChange(bot.id, starting);
//                     }
//                     return starting ? 100 : 0;
//                 }

//                 const messageIndex = Math.floor((newProgress / 100) * (messages.length - 1));
//                 if (messageIndex >= 0 && messageIndex < messages.length &&
//                     !statusMessages.includes(messages[messageIndex])) {
//                     setStatusMessages(prev => [...prev, messages[messageIndex]]);
//                 }

//                 return newProgress;
//             });
//         }, 800);

//         return () => clearInterval(timer);
//     };

//     const handleStart = () => {
//         simulateProcess(true);
//     };

//     const handleStop = () => {
//         simulateProcess(false);
//     };

//     return (
//         <>
//             {/* Modal de proceso */}
//             <CModal
//                 visible={showProcessModal}
//                 onClose={() => { }}
//                 backdrop="static"
//                 alignment="center"
//             >
//                 <CModalHeader>
//                     <CModalTitle>
//                         {processType === "start" ? "Iniciando Bot" : "Deteniendo Bot"}
//                     </CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <div className="text-center">
//                         <h5>{bot?.name}</h5>
//                         <CProgress className="mb-3">
//                             <CProgressBar
//                                 value={progress}
//                                 color={progress < 30 ? 'danger' : progress < 70 ? 'warning' : 'success'}
//                                 animated
//                             />
//                         </CProgress>

//                         <div className="text-start mb-3">
//                             {statusMessages.map((msg, index) => (
//                                 <div key={index} className="d-flex align-items-center mb-2">
//                                     <CSpinner size="sm" className="me-2" />
//                                     <span>{msg}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="text-muted small">
//                             Progreso: {progress}% completado
//                         </div>
//                     </div>
//                 </CModalBody>
//                 <CModalFooter>
//                     <small className="text-muted">Este proceso se completará automáticamente</small>
//                 </CModalFooter>
//             </CModal>

//             {/* Tarjeta principal del bot */}
//             <CCard className="mb-4">
//                 <CCardHeader className="d-flex justify-content-between align-items-center">
//                     <div>
//                         <strong>{bot?.name}</strong> - {bot?.type}
//                     </div>
//                     <div className="d-flex align-items-center">
//                         <CTooltip content={online ? 'EN LÍNEA' : 'DETENIDO'}>
//                             <div style={{ color: "white" }} className={`badge ${online ? 'bg-success' : 'bg-warning'} py-2 me-3 px-3 `}>
//                                 {online ? 'EN LÍNEA' : 'DETENIDO'}
//                             </div>
//                         </CTooltip>

//                         <CTooltip content="Iniciar RPA's">
//                             <CButton
//                                 style={{ backgroundColor: theme.colorPrimary }}
//                                 size="sm"
//                                 onClick={handleStart}
//                                 disabled={loading || online}
//                                 className="me-3 px-3 d-flex align-items-center"
//                             >
//                                 <TbRobot size={18} className="me-2" style={{ color: "white" }} />
//                                 <span style={{ color: "white" }} className="d-none d-sm-inline">Iniciar RPA's</span>
//                             </CButton>
//                         </CTooltip>

//                         <CTooltip content="Iniciar RPA's">
//                             <CButton
//                                 color="danger"
//                                 size="sm"
//                                 onClick={handleStart}
//                                 disabled={loading || !online}
//                                 className="me-3 px-3 d-flex align-items-center"
//                             >
//                                 <TbRobotOff size={18} className="me-2" style={{ color: "white" }} />
//                                 <span style={{ color: "white" }} className="d-none d-sm-inline">Apagar RPA's</span>
//                             </CButton>
//                         </CTooltip>
//                     </div>
//                 </CCardHeader>

//                 <CCardBody>
//                     {online ? (
//                         <>
//                             <div className="alert alert-success mb-4">
//                                 <strong>¡Bot operativo!</strong> El bot {bot.name} está funcionando correctamente.
//                             </div>

//                             <h5 className="mb-3">Métricas de rendimiento:</h5>
//                             <div className="row">
//                                 {bot?.performance?.map((perfor: any, index: number) => (
//                                     <div className="col-12 col-md-6 col-lg-3 py-3" key={index}>
//                                         <PerformanceCard
//                                             title={perfor.title}
//                                             completeRate={perfor.rate}
//                                             intervalTime={perfor.time}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </>
//                     ) : (
//                         <div className="alert alert-secondary text-center py-4">
//                             <i className="fas fa-power-off fa-3x mb-3"></i>
//                             <h5>Bot detenido</h5>
//                             <p>Presiona el botón de inicio para activar este bot</p>
//                         </div>
//                     )}
//                 </CCardBody>
//             </CCard>
//         </>
//     );
// };

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
    CModalFooter
} from "@coreui/react";
import { PerformanceCard } from "../PerformanceCard";
import { TbRobot, TbRobotOff } from "react-icons/tb";
import { theme } from "../../theme";

interface BotStatusCardProps {
    bot: {
        performance?: any;
        name: string;
        type: string;
        id: string;
    };
}

export const BotStatusCard = ({ bot }: BotStatusCardProps) => {
    // Estado inicial obtenido de localStorage
    const [online, setOnline] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusMessages, setStatusMessages] = useState<string[]>([]);
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [processType, setProcessType] = useState<"start" | "stop">("start");

    // Obtener estado inicial desde localStorage
    useEffect(() => {
        const storedBots = localStorage.getItem("bots");
        if (storedBots) {
            const bots = JSON.parse(storedBots);
            const currentBot = bots.find((b: any) => b?.id === bot?.id);
            setOnline(currentBot?.status === 'active');
        }
    }, [bot?.id]);

    // Mensajes de estado simulados
    const startupMessages = [
        "Inicializando módulos principales...",
        "Cargando configuración...",
        "Estableciendo conexiones...",
        "Verificando integraciones...",
        "Preparando flujos de trabajo...",
        "Iniciando servicios..."
    ];

    const shutdownMessages = [
        "Deteniendo procesos...",
        "Cerrando conexiones...",
        "Guardando estado...",
        "Liberando recursos...",
        "Finalizando servicios..."
    ];

    // Actualizar el estado en localStorage
    const updateBotStatus = (id: string, newStatus: boolean) => {
        const storedBots = localStorage.getItem("bots");
        if (storedBots) {
            const bots = JSON.parse(storedBots);
            const updatedBots = bots.map((b: any) =>
                b.id === id ? { ...b, status: newStatus ? 'active' : 'inactive' } : b
            );
            localStorage.setItem("bots", JSON.stringify(updatedBots));

            // Disparar evento personalizado para notificar a otros componentes
            window.dispatchEvent(new CustomEvent('botsUpdated'));
        }
    };

    // Simular proceso de inicio/apagado
    const simulateProcess = (starting: boolean) => {
        setProcessType(starting ? "start" : "stop");
        setShowProcessModal(true);
        setLoading(true);
        setProgress(0);
        setStatusMessages([]);

        const messages = starting ? startupMessages : shutdownMessages;
        const timer = setInterval(() => {
            setProgress(prev => {
                const increment = starting ?
                    Math.floor(Math.random() * 15) + 5 :
                    -(Math.floor(Math.random() * 10) + 5);

                let newProgress = prev + increment;
                newProgress = Math.max(0, Math.min(100, newProgress));

                if ((starting && newProgress >= 100) || (!starting && newProgress <= 0)) {
                    clearInterval(timer);
                    setLoading(false);
                    const newOnlineStatus = starting;
                    setOnline(newOnlineStatus);
                    updateBotStatus(bot.id, newOnlineStatus);
                    setTimeout(() => setShowProcessModal(false), 1000);
                    return starting ? 100 : 0;
                }

                const messageIndex = Math.floor((newProgress / 100) * (messages.length - 1));
                if (messageIndex >= 0 && messageIndex < messages.length &&
                    !statusMessages.includes(messages[messageIndex])) {
                    setStatusMessages(prev => [...prev, messages[messageIndex]]);
                }

                return newProgress;
            });
        }, 800);

        return () => clearInterval(timer);
    };

    const handleStart = () => {
        simulateProcess(true);
    };

    const handleStop = () => {
        simulateProcess(false);
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
                    <CModalTitle>
                        {processType === "start" ? "Iniciando Bot" : "Deteniendo Bot"}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="text-center">
                        <h5>{bot?.name}</h5>
                        <CProgress className="mb-3">
                            <CProgressBar
                                value={progress}
                                color={progress < 30 ? 'danger' : progress < 70 ? 'warning' : 'success'}
                                animated
                            />
                        </CProgress>

                        <div className="text-start mb-3">
                            {statusMessages.map((msg, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <CSpinner size="sm" className="me-2" />
                                    <span>{msg}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-muted small">
                            Progreso: {progress}% completado
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <small className="text-muted">Este proceso se completará automáticamente</small>
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
                                {online ? 'EN LÍNEA' : 'DETENIDO'}
                            </div>
                        </CTooltip>

                        <CTooltip content="Iniciar RPA's">
                            <CButton
                                style={{ backgroundColor: theme.colorPrimary }}
                                size="sm"
                                onClick={handleStart}
                                disabled={loading || online}
                                className="me-3 px-3 d-flex align-items-center"
                            >
                                <TbRobot size={18} className="me-2" style={{ color: "white" }} />
                                <span style={{ color: "white" }} className="d-none d-sm-inline">Iniciar RPA's</span>
                            </CButton>
                        </CTooltip>

                        <CTooltip content="Apagar RPA's">
                            <CButton
                                color="danger"
                                size="sm"
                                onClick={handleStop}
                                disabled={loading || !online}
                                className="px-3 d-flex align-items-center"
                            >
                                <TbRobotOff size={18} className="me-2" style={{ color: "white" }} />
                                <span style={{ color: "white" }} className="d-none d-sm-inline">Apagar RPA's</span>
                            </CButton>
                        </CTooltip>
                    </div>
                </CCardHeader>

                <CCardBody>
                    {online ? (
                        <>
                            <div className="alert alert-success mb-4">
                                <strong>¡Bot operativo!</strong> El bot {bot.name} está funcionando correctamente.
                            </div>

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
                            <i className="fas fa-power-off fa-3x mb-3"></i>
                            <h5>Bot detenido</h5>
                            <p>Presiona el botón de inicio para activar este bot</p>
                        </div>
                    )}
                </CCardBody>
            </CCard>
        </>
    );
};