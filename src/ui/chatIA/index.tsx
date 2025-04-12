import { useState, useRef, useEffect } from 'react';
import { CRow, CCol, CCard, CCardHeader, CBadge, CCardBody, CCardFooter, CInputGroup, CFormInput, CButton } from "@coreui/react";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import { BsChatSquareTextFill } from "react-icons/bs";
import { theme } from '../../theme';
import { useRefresh } from '../../store/useRefresh';
import axios from 'axios';

export const ChatIA = () => {
    const { triggerRefresh } = useRefresh();
    const [messages, setMessages] = useState([
        {
            text: "¡Hola! Soy tu asistente RPA´s. ¿En qué puedo ayudarte hoy?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || isLoading) return;

        const userMessage = {
            text: newMessage,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        try {
            const conversationPayload = {
                data: messages
                    .filter(msg => msg.sender !== 'system')
                    .map(msg => ({
                        type: msg.sender === 'user' ? 'pregunta' : 'response',
                        content: msg.text
                    }))
                    .concat({ type: 'pregunta', content: newMessage })
            };
            const { data } = await axios.post('http://34.238.122.213:1337/api/open-ai/49', conversationPayload);
            const lastResponse = data?.autos?.[0]?.data?.[0]?.content ?? "Lo siento, no encontré una respuesta válida.";
            const aiMessage = {
                text: lastResponse,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error al obtener la respuesta de la IA:", error);
            setMessages(prev => [...prev, {
                text: "Lo siento, hubo un problema al conectar con el asistente.",
                sender: 'ai',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleEndAssistance = () => {
        const generateChatTitle = () => {
            if (messages.length === 0) return "Conversación sin mensajes";

            const firstUserMessage = messages.find(msg => msg.sender === 'user');
            if (!firstUserMessage) return "Consulta del asistente";

            const shortMessage = firstUserMessage.text.length > 50
                ? `${firstUserMessage.text.substring(0, 47)}...`
                : firstUserMessage.text;

            const lowerMsg = firstUserMessage.text.toLowerCase();
            let category = "Consulta";

            if (lowerMsg.includes("error") || lowerMsg.includes("problema")) category = "Problema";
            if (lowerMsg.includes("configur")) category = "Configuración";
            if (lowerMsg.includes("ayuda")) category = "Soporte";
            if (lowerMsg.includes("factur")) category = "Facturación";

            return `${category}: ${shortMessage}`;
        };

        const chatData = {
            id: Date.now(),
            title: generateChatTitle(),
            active: false,
            status: "solucionado",
            user: {
                avatar: "https://randomuser.me/api/portraits/women/45.jpg",
                _id: "6g9e4c8b3f2a1d0e5f6g7h8",
                name: "Usuario Demo",
                role: "user"
            },
            conversacion: messages.map(msg => ({
                type: msg.sender === 'user' ? 'user' : 'admin',
                message: msg.text,
                timestamp: msg.timestamp.toISOString(),
                ...(msg.sender === 'ai' && { adminName: "BotAsistente v2.0.10" })
            }))
        };

        const savedChatsStr = localStorage.getItem('chatHistories');
        const savedChats = savedChatsStr ? JSON.parse(savedChatsStr) : [];
        savedChats.push(chatData);
        localStorage.setItem('chatHistories', JSON.stringify(savedChats));

        setMessages([{
            text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
            sender: 'ai',
            timestamp: new Date()
        }]);
        triggerRefresh();
        setNewMessage('');
        setIsLoading(false);
    };

    // Scroll hacia el último mensaje cuando se actualiza la lista de mensajes
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <CRow className="justify-content-center ">
            <CCol md={12}>
                <CCard className="shadow-sm">
                    <CCardHeader
                        className="d-flex justify-content-between align-items-center"
                        style={{
                            backgroundColor: '#3c4b64',
                            color: 'white',
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <BsChatSquareTextFill className="me-2" />
                            <strong>Asistente Virtual RPA´s (v1.0.2)</strong>
                        </div>
                        <CBadge color="light" shape="rounded-pill">
                            <strong style={{ color: '#321fdb' }}>{messages.length} mensajes</strong>
                        </CBadge>
                    </CCardHeader>

                    <CCardBody
                        style={{
                            height: '400px',
                            overflowY: 'auto',
                            padding: '20px',
                            backgroundColor: '#f8f9fa',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-3 text-${message.sender === 'user' ? 'end' : 'start'}`}>
                                <div className="d-inline-block p-3 rounded-3"
                                    style={{
                                        backgroundColor: message.sender === 'user' ? '#e2f0fd' : 'white',
                                        maxWidth: '80%',
                                        boxShadow: message.sender === 'ai' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                        borderTopRightRadius: message.sender === 'user' ? '0!important' : '',
                                        borderTopLeftRadius: message.sender === 'ai' ? '0!important' : ''
                                    }}>
                                    <div style={{
                                        fontWeight: 'bold',
                                        color: message.sender === 'user' ? '#321fdb' : '#e55353'
                                    }} className="d-flex align-items-center">
                                        {message.sender === 'user' ? (
                                            <FaUser className="me-2" size={14} />
                                        ) : (
                                            <FaRobot className="me-2" size={14} />
                                        )}
                                        {message.sender === 'user' ? 'Tú' : 'Asistente'}
                                    </div>
                                    <p style={{
                                        marginBottom: '0.25rem',
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.5'
                                    }}>
                                        {message.text}
                                    </p>
                                    <small style={{
                                        color: '#6c757d',
                                        fontSize: '0.75rem',
                                        display: 'block',
                                        textAlign: message.sender === 'user' ? 'right' : 'left'
                                    }}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </small>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="text-start mb-3">
                                <div className="d-inline-block p-3 rounded-3"
                                    style={{
                                        backgroundColor: 'white',
                                        maxWidth: '80%',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                        borderTopLeftRadius: '0!important'
                                    }}>
                                    <div style={{ fontWeight: 'bold', color: '#e55353' }} className="d-flex align-items-center">
                                        <FaRobot className="me-2" size={14} />
                                        Asistente
                                    </div>
                                    <p style={{ marginBottom: '0.25rem' }}>
                                        <span className="typing-dots">
                                            <span style={{ animation: 'blink 1.4s infinite' }}>.</span>
                                            <span style={{ animation: 'blink 1.4s infinite 0.2s' }}>.</span>
                                            <span style={{ animation: 'blink 1.4s infinite 0.4s' }}>.</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </CCardBody>

                    <CCardFooter style={{
                        backgroundColor: '#f0f2f4',
                        borderTop: '1px solid #dee2e6',
                        padding: '1rem'
                    }}>
                        <CInputGroup>
                            <CFormInput
                                placeholder="Escribe tu mensaje aquí..."
                                aria-label="Mensaje"
                                style={{
                                    borderRight: 'none',
                                    borderRadius: '0.25rem 0 0 0.25rem'
                                }}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                            />
                            <CButton
                                color="primary"
                                onClick={handleSendMessage}
                                disabled={isLoading || !newMessage.trim()}
                                style={{
                                    minWidth: '45px',
                                    borderRadius: '0 0.25rem 0.25rem 0',
                                }}
                            >
                                <FaPaperPlane />
                            </CButton>
                            <CButton
                                onClick={handleEndAssistance}
                                style={{
                                    backgroundColor: theme.colorSecondary,
                                    minWidth: '45px',
                                    color: "white",
                                    borderRadius: '0 0.25rem 0.25rem 0',
                                    marginLeft: '1px'
                                }}
                            >
                                Terminar
                            </CButton>
                        </CInputGroup>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    );
}
