import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { RouterPrivate } from "./routerPrivate";
import { RouterPublic } from "./routerPublic";
import { CCol, CRow } from "@coreui/react";
import {
    Signin,
    RecoveryPassword,
    Signup,
    DashboardAdmin,
    DashboardUser,
    Profile,
    UserManagement,
    SupportAdmin,
    SupportUser,
    Landing,
    SecurityAdmin,
    ProfileRPAs,
    SettingUser
} from "../components/index";
import '../App.css'
import { AppLayout } from "../Layout";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RouterPublic>
                            <Landing />
                        </RouterPublic>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RouterPublic>
                            <CRow className="d-flex justify-content-center Signin">
                                <CCol className="m-1" style={{ position: 'relative', zIndex: 3 }}>
                                    <Signin />
                                </CCol>
                            </CRow>
                        </RouterPublic>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RouterPublic>
                            <CRow className="d-flex justify-content-center Signup">
                                <CCol className="m-1" style={{ position: 'relative', zIndex: 3 }}>
                                    <Signup />
                                </CCol>
                            </CRow>
                        </RouterPublic>
                    }
                />
                <Route
                    path="/recovery-password"
                    element={
                        <RouterPublic>
                            <CRow className="d-flex justify-content-center Signup">
                                <CCol className="m-1" style={{ position: 'relative', zIndex: 3 }}>
                                    <RecoveryPassword />
                                </CCol>
                            </CRow>
                        </RouterPublic>
                    }
                />
                {/* Admin View */}
                <Route element={<RouterPrivate><AppLayout /></RouterPrivate>}>
                    <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                    <Route path="/profile-admin" element={<Profile />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/support-admin" element={<SupportAdmin />} />
                    <Route path="/security-admin" element={<SecurityAdmin />} />


                </Route>

                {/* User View */}
                <Route element={<RouterPrivate><AppLayout /></RouterPrivate>}>
                    <Route path="/dashboard-user" element={<DashboardUser />} />
                    <Route path="/profile-user" element={<Profile />} />
                    <Route path="/support-user" element={<SupportUser />} />
                    <Route path="/profile-rpas-user/:id" element={<ProfileRPAs />} />
                    <Route path="/settings-user" element={<SettingUser />} />


                </Route>
            </Routes>
        </Router>
    );
};
