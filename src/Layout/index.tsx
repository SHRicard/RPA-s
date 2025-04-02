import { CContainer, CRow, CCol } from "@coreui/react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "../components";
import "../App.css";
import { Offcanvas } from "../ui";
import { useMobile } from "../hooks";

export const AppLayout = () => {
    const sidebarHeight = `calc(100vh - 62px - 131px)`;
    const sidebarCanvas = `calc(100vh - 62px - 133px)`;
    const isMobile = useMobile()

    return (
        <CContainer fluid style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <CRow style={{ overflow: "hidden" }}>
                <CCol md={12}>
                    <Navbar />
                </CCol>

                {!isMobile &&
                    <CCol md="auto" className="p-0"
                        style={{
                            height: sidebarHeight,
                        }}
                    >
                        <Sidebar sidebarHeight={sidebarHeight} />
                    </CCol>
                }

                <CCol md={10}
                    style={{
                        padding: "10px",
                        flex: 1,
                        maxHeight: "100vh",
                        overflowY: "auto",
                    }}
                >
                    <Outlet />
                </CCol>
                <CCol md={12}>
                    <Footer />
                </CCol>
            </CRow>
            <Offcanvas sidebarHeight={sidebarCanvas} />
        </CContainer>

    );
};
