import {
    CContainer,
    CCol,
    CRow,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CTooltip,
} from "@coreui/react";
import FAQ from "../../../data/FAQ.data.json";
import { theme } from "../../../theme";
import conversacion from "../../../data/conversacion.data.json";
import { useUser } from "../../../hooks";
import { ChatIA } from "../../../ui";
import { useRefresh } from "../../../store/useRefresh";
import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";

export const SupportUser: React.FC = () => {
    const dataUser = useUser()
    const userID = dataUser?._id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [combinedConversations, setCombinedConversations] = useState<any[]>([]);
    const { refreshKey } = useRefresh();


    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chatHistories') || '[]');
        const filtered = conversacion.filter((conv) => conv.user._id === userID);
        setCombinedConversations([...filtered, ...storedChats]);
    }, [refreshKey, userID]);


    return (
        <CContainer>
            <CCol style={{ paddingBottom: "200px" }}>
                <CRow className="d-flex justify-content-center align-items-center">
                    <CCol md={12}>
                        <strong style={{ color: theme.colorPrimary, fontSize: "1.5rem" }}>
                            Preguntas Frecuentes (FAQ)
                        </strong>
                    </CCol>
                </CRow>

                <CRow className="mt-4">
                    <CCol md={12}>
                        <CAccordion>
                            {FAQ.map((faq, index) => (
                                <CAccordionItem key={faq.id} itemKey={index + 1}>
                                    <CAccordionHeader style={{ fontSize: "18px", fontWeight: "bold" }}>{faq.question}</CAccordionHeader>
                                    <CAccordionBody>
                                        <p style={{ color: theme.colorSecondary }}>{faq.answer}</p>
                                        <strong style={{ color: theme.colorSecondary, fontSize: "10px" }}>
                                            Agregado por: {faq.admin.name}
                                        </strong>
                                    </CAccordionBody>
                                </CAccordionItem>
                            ))}
                        </CAccordion>
                    </CCol>
                </CRow>
                <CRow className="mt-5">
                    <CTooltip content="Asistente virtual de soporte técnico" placement="right">
                        <CCol md={12} className="d-flex align-items-center justify-content-center">
                            <strong style={{
                                color: theme.colorPrimary,
                                fontSize: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "help"
                            }}>
                                Soporte IA <FaRobot size={30} />
                            </strong>
                        </CCol>
                    </CTooltip>
                </CRow>
                <CRow className=" pt-2">
                    <CCol md={12}>
                        <ChatIA />
                    </CCol>
                </CRow>
                <CRow className="pt-3">
                    <CCol md={12} className="text-start py-4">
                        <strong style={{ color: theme.colorPrimary, fontSize: "1rem" }}>
                            Historial de Consultas
                        </strong>

                    </CCol>
                    <CCol md={12} className="">
                        <CAccordion>
                            {combinedConversations.map((conv, index) => (
                                <CAccordionItem key={conv.id} itemKey={index + 1}>
                                    <CAccordionHeader style={{ fontSize: "18px", fontWeight: "bold" }}>
                                        {conv.title}
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        {conv.conversacion.map((message, i) => (
                                            <CCol className="text-start" key={i} style={{ marginBottom: "20px" }}>
                                                <div
                                                    style={{
                                                        padding: "10px",
                                                        borderRadius: "8px",
                                                        backgroundColor: message.type === "user" ? "#f7f7f7" : "#e0f7fa",
                                                        marginBottom: "8px",
                                                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                    }}
                                                >
                                                    <strong
                                                        style={{
                                                            color: theme.colorSecondary,
                                                            fontWeight: "bold",
                                                            display: "block",
                                                            marginBottom: "5px",
                                                        }}
                                                    >
                                                        {message.type === "user" ? "Yo" : "Asistente Virtual"}
                                                    </strong>
                                                    <p
                                                        style={{
                                                            color: theme.colorPrimary,
                                                            marginBottom: "5px",
                                                            fontSize: "14px",
                                                            lineHeight: "1.5",
                                                        }}
                                                    >
                                                        {message.message}
                                                    </p>
                                                    <small
                                                        style={{
                                                            display: "block",
                                                            textAlign: "right",
                                                            color: theme.colorSecondary,
                                                            fontSize: "12px",
                                                            fontStyle: "italic",
                                                        }}
                                                    >
                                                        {new Date(message.timestamp).toLocaleString()}
                                                    </small>
                                                </div>
                                            </CCol>

                                        ))}
                                    </CAccordionBody>
                                </CAccordionItem>
                            ))}
                        </CAccordion>
                    </CCol>
                </CRow>
            </CCol>
        </CContainer>
    );
};
