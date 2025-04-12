import {
    CContainer,
    CCol,
    CRow,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CAlert
} from "@coreui/react";
import FAQ from "../../data/FAQ.data.json";
import { theme } from "../../theme";
import { useState } from "react";

export const FaqAccordionList = () => {
    const [visible, setVisible] = useState(true);

    const midIndex = Math.ceil(FAQ.length / 2);
    const firstHalf = FAQ.slice(0, midIndex);
    const secondHalf = FAQ.slice(midIndex);

    return (
        <CContainer>
            <CRow className="py-3">
                <CCol md={12}>
                    <strong style={{ color: theme.colorPrimary, fontSize: "1.5rem" }}>
                        Preguntas Frecuentes (FAQ)
                    </strong>
                </CCol>

                {visible && (
                    <CCol md={12} className="mt-3">
                        <CAlert
                            color="info"
                            dismissible
                            visible={visible}
                            onClose={() => setVisible(false)}
                        >
                            Esta sección se actualiza constantemente. Revisa seguido para ver nuevas preguntas o respuestas.
                        </CAlert>
                    </CCol>
                )}
            </CRow>

            <CRow className="mt-4">
                <CCol md={6}>
                    <CAccordion>
                        {firstHalf.map((faq, index) => (
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

                <CCol md={6}>
                    <CAccordion>
                        {secondHalf.map((faq, index) => (
                            <CAccordionItem key={faq.id} itemKey={index + 1 + firstHalf.length}>
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
        </CContainer>
    );
};
