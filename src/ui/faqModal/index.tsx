import {
    CModal, CModalHeader, CModalTitle, CModalBody,
    CModalFooter, CButton, CAccordion, CAccordionItem,
    CAccordionHeader, CAccordionBody
} from '@coreui/react';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    admin: {
        id: string;
        name: string;
    };
}

interface FAQModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
    faqs: FAQ[];
}

export const FAQModal: React.FC<FAQModalProps> = ({ show, onClose, faqs }) => {

    const storedFAQs: FAQ[] = JSON.parse(localStorage.getItem('miFAQ') || '[]');

    const combinedFAQs = [...faqs, ...storedFAQs];
    return (
        <CModal visible={show} onClose={() => onClose(false)} alignment="center" size='lg'>
            <CModalHeader closeButton>
                <CModalTitle>Mis FAQs Personalizadas</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CAccordion alwaysOpen>
                    {combinedFAQs.map((faq) => (
                        <CAccordionItem key={faq.id}>
                            <CAccordionHeader style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {faq.question}
                            </CAccordionHeader>
                            <CAccordionBody>
                                <p><strong>Respuesta:</strong> {faq.answer}</p>
                                <p><small>Creado por: {faq.admin.name}</small></p>
                            </CAccordionBody>
                        </CAccordionItem>
                    ))}
                </CAccordion>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => onClose(false)}>Cerrar</CButton>
            </CModalFooter>
        </CModal>
    );
};


