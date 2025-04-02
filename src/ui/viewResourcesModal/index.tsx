import {
    CModal, CModalHeader, CModalTitle, CModalBody,
    CModalFooter, CButton, CAccordion, CAccordionItem,
    CAccordionHeader, CAccordionBody, CBadge
} from '@coreui/react';

interface Resource {
    _id: number;
    type: string;
    title: string;
    description: string;
    date: string;
    priority: string;
}


interface ViewResourcesModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
    resources: Resource[];
}

export const ViewResourcesModal: React.FC<ViewResourcesModalProps> = ({ show, onClose, resources }) => {


    const storedResources = JSON.parse(localStorage.getItem('miResources') || '[]');
    const combinedFAQs = [...resources, ...storedResources];


    return (
        <CModal visible={show} onClose={() => onClose(false)} alignment="center" size='lg'>
            <CModalHeader closeButton>
                <CModalTitle>Recursos y Notificaciones</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CAccordion alwaysOpen>
                    {combinedFAQs.map((resource) => (
                        <CAccordionItem key={resource._id}>
                            <CAccordionHeader style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {resource.title}
                                <CBadge color={
                                    resource.priority === "alta" ? "danger" :
                                        resource.priority === "media" ? "warning" : "success"
                                } className="ms-2">
                                    {resource.priority.toUpperCase()}
                                </CBadge>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <p><strong>Descripción:</strong> {resource.description}</p>
                                <p><small><strong>Fecha:</strong> {resource.date}</small></p>
                                <p><small><strong>Tipo:</strong> {resource.type}</small></p>
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