import React, { useState, useEffect } from "react";
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CProgress,
    CProgressBar,
    CSpinner,
    CButton,
    CAlert
} from "@coreui/react";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { BtnPrimary } from "../btnPrimary";

interface DeleteBotModalProps {
    show: boolean;
    onClose: () => void;
    botName: string;
    botId: string
    refresh: boolean,
    setRefresh: (pros: boolean) => void
}

export const DeleteBotModal: React.FC<DeleteBotModalProps> = ({
    show,
    onClose,
    botName,
    botId,
    refresh,
    setRefresh
}) => {
    const [progress, setProgress] = useState(0);
    const [statusMessages, setStatusMessages] = useState<{ text: string, completed: boolean }[]>([]);
    const [loading, setLoading] = useState(false);
    const [allStepsCompleted, setAllStepsCompleted] = useState(false);

    const deleteMessages = [
        "Iniciando secuencia de eliminación...",
        "Verificando permisos de acceso...",
        "Deteniendo servicios asociados...",
        "Eliminando flujos de trabajo...",
        "Borrando datos de configuración...",
        "Limpiando registros de actividad...",
        "Eliminando archivos temporales...",
        "Revocando credenciales de acceso...",
        "Eliminando conexiones externas...",
        "Borrando preferencias de usuario...",
        "Limpiando caché del sistema...",
        "Eliminando datos sensibles...",
        "Verificando eliminación completa...",
        "Actualizando registros del sistema..."
    ];

    const getProgressColor = (): 'danger' | 'warning' | 'success' => {
        if (progress < 40) return 'danger';
        if (progress < 80) return 'warning';
        return 'success';
    };

    const simulateDeletion = () => {
        setLoading(true);
        setAllStepsCompleted(false);
        setProgress(0);
        setStatusMessages(deleteMessages.map(text => ({ text, completed: false })));

        const totalSteps = deleteMessages.length;
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const increment = 100 / totalSteps;
                const newProgress = Math.min(prev + increment, 100);

                if (currentStep < totalSteps) {
                    setStatusMessages(prev =>
                        prev.map((msg, index) =>
                            index <= currentStep
                                ? { ...msg, completed: true }
                                : msg
                        )
                    );
                    currentStep++;
                }

                if (newProgress >= 100) {
                    setAllStepsCompleted(true);
                    clearInterval(progressInterval);
                    setLoading(false);
                }

                return newProgress;
            });
            const storedBots = localStorage.getItem("bots");
            if (!storedBots) return;
            const bots = JSON.parse(storedBots);
            const updatedBots = bots.filter((bot: { id: string }) => bot.id !== botId);
            localStorage.setItem("bots", JSON.stringify(updatedBots));
            // 
        }, 500);
    };

    useEffect(() => {
        if (!show) {
            setProgress(0);
            setStatusMessages([]);
            setLoading(false);
            setAllStepsCompleted(false);
            setRefresh(!refresh)
        }
    }, [show]);

    return (
        <CModal
            visible={show}
            onClose={onClose}
            backdrop="static"
            alignment="center"
            size="lg"
        >
            <CModalHeader closeButton={!loading}>
                <CModalTitle className="d-flex align-items-center">
                    <FaTrashAlt className="me-2 text-danger" />
                    {allStepsCompleted ? "Eliminación Completa" : `Eliminando: ${botName}`}
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                {!allStepsCompleted && (
                    <CAlert color="warning" className="d-flex align-items-center">
                        <FaTrashAlt className="me-2 flex-shrink-0" />
                        <div>
                            <strong>Advertencia:</strong> Esta acción eliminará permanentemente el bot y todos sus datos asociados.
                        </div>
                    </CAlert>
                )}

                <div className="text-center mt-3">
                    <div className="text-start mb-3 console-output" style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        backgroundColor: '#f8f9fa',
                        padding: '10px',
                        borderRadius: '5px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem'
                    }}>
                        {statusMessages.map((msg, index) => (
                            <div key={`msg-${index}`} className="d-flex align-items-center mb-2">
                                {msg.completed ? (
                                    <FaCheckCircle className="me-2 text-success" />
                                ) : (
                                    <CSpinner size="sm" className="me-2" />
                                )}
                                <span>{msg.text}</span>
                            </div>
                        ))}
                        {allStepsCompleted && (
                            <div className="d-flex align-items-center mb-2">
                                <FaCheckCircle className="me-2 text-success" />
                                <span>¡Eliminación completada con éxito!</span>
                            </div>
                        )}
                    </div>

                    <div className={`small py-3 text-muted`}>
                        {allStepsCompleted ? (
                            <strong>Bot eliminado correctamente</strong>
                        ) : (
                            `Progreso: ${Math.round(progress)}% completado`
                        )}
                    </div>
                </div>
                <div className="py-3">
                    <CProgress value={progress} height={30}>
                        <CProgressBar color={getProgressColor()} >
                            <strong style={{ color: "white" }}>BORRANDO RPA´s ({botName})</strong>
                        </CProgressBar>
                    </CProgress>
                </div>
            </CModalBody>

            <CModalFooter className="justify-content-between">
                <small className="text-muted">
                    {allStepsCompleted ? "Operación exitosa" : "Proceso en ejecución..."}
                </small>

                {!allStepsCompleted ? (
                    <div>
                        <CButton
                            color="secondary"
                            onClick={onClose}
                            disabled={loading}
                            className="me-2"
                        >
                            Cancelar
                        </CButton>
                        <CButton
                            color="danger"
                            onClick={simulateDeletion}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <CSpinner size="sm" className="me-2" />
                                    Eliminando...
                                </>
                            ) : (
                                "Confirmar Eliminación"
                            )}
                        </CButton>
                    </div>
                ) : (

                    <BtnPrimary
                        label="Cerrar"
                        color="primary"
                        type="button"
                        onClick={onClose}
                    />

                )}
            </CModalFooter>
        </CModal>
    );
};