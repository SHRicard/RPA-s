import {
    CContainer,
    CCol,
    CRow,
} from "@coreui/react";
import { theme } from "../../../theme";
import { ChatIA } from "../../../ui";
import { FaRobot } from "react-icons/fa";

export const SupportUser: React.FC = () => {
    return (
        <CContainer>
            <CRow className=" py-3">
                <CCol md={12} className="d-flex align-items-center justify-content-center py-2">
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
                <CCol md={12}>
                    <ChatIA />
                </CCol>
            </CRow>
        </CContainer>
    );
};
