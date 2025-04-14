import React, { useEffect, useMemo, useState } from "react";
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import { BtnPrimary, CustomPagination, CustomSearch, ModalCreate, PerformanceCard, SmallBotCard } from "../../../ui";
import bots from "../../../data/bots.data.json";
import { theme } from "../../../theme";
import { IBots } from "../../../interface";




const ITEMS_PER_PAGE = 4;

export const DashboardUser: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [allBots, setAllBots] = useState<IBots[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [page, setPage] = useState(1);
    const [botsStatus, setBotsStatus] = useState<{ id: string, status: string }[]>([]);

    const isRefresh = () => {
        setRefresh(!refresh);
        setSearchQuery("");
        setPage(1);
    };

    useEffect(() => {
        const storedBots = localStorage.getItem("bots");
        if (!storedBots) {
            localStorage.setItem("bots", JSON.stringify(bots));
            setAllBots(bots as unknown as IBots[]);
        } else {
            setAllBots(JSON.parse(storedBots) as IBots[]);
        }
    }, [refresh]);

    const filteredBots = useMemo(() => {
        if (!searchQuery.trim()) return allBots;

        const query = searchQuery.toLowerCase();
        return allBots.filter(bot =>
            bot.name.toLowerCase().includes(query) ||
            bot.type.toLowerCase().includes(query) ||
            bot.status.toLowerCase().includes(query)
        );
    }, [allBots, searchQuery]);

    useEffect(() => {
        const totalPages = Math.ceil(filteredBots.length / ITEMS_PER_PAGE);
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        } else if (filteredBots.length === 0) {
            setPage(1);
        }
    }, [filteredBots, page]);

    useEffect(() => {
        const storedBots = localStorage.getItem("bots");
        if (storedBots) {
            const bots = JSON.parse(storedBots);
            setBotsStatus(bots.map((bot: any) => ({
                id: bot.id,
                status: bot.status || 'inactive'
            })));
        }
    }, []);
    const totalPages = Math.ceil(filteredBots.length / ITEMS_PER_PAGE);
    const paginatedBots: IBots[] = filteredBots.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const openModal = (pros: boolean) => {
        setShowModal(pros)
    }
    const closeModal = (pros: boolean) => {
        setShowModal(pros)
    }
    const hasActiveBots = botsStatus.some(bot => bot.status === 'active');
    return (
        <CContainer style={{ paddingBottom: "200px" }}>
            <CRow className="d-flex justify-content-center align-items-center text-center pt-3">
                <CCol md={4} className="py-2">
                    <CustomSearch
                        onSearch={setSearchQuery}
                        refresh={refresh}
                        label={"RPA's"}
                        placeholder="Buscar Bots..."
                    />
                </CCol>
                <CCol md="auto" lg="auto" className="py-2">
                    <BtnPrimary
                        onClick={isRefresh}
                        type="button"
                        color="primary"
                        label="Borrar Búsqueda"
                    />
                </CCol>
                <CCol md="auto" lg="auto" className="py-2">
                    <BtnPrimary
                        onClick={() => openModal(true)}
                        type="button"
                        color="primary"
                        label="Crear RPA's"
                    />
                </CCol>
            </CRow>

            <CRow style={{ backgroundColor: theme.colorThree }} className="m-5 rounded-3">
                {paginatedBots.length > 0 ? (
                    <>
                        {paginatedBots.map((bot: IBots) => (
                            <CCol key={bot.id} sm={12} md={6} lg={3} className="py-5">
                                <SmallBotCard bot={bot} refresh={refresh} setRefresh={setRefresh} />
                            </CCol>
                        ))}

                        <CCol md={12} className="d-flex justify-content-center">
                            {filteredBots.length > ITEMS_PER_PAGE && (
                                <CustomPagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            )}
                        </CCol>
                    </>
                ) : (
                    <CCol xs={12} className="py-5 text-center">
                        <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <i className="fas fa-robot fa-4x mb-4" style={{ color: theme.colorSecondary }}></i>
                            <h4 style={{ color: theme.colorPrimary }}>No hay bots creados aún</h4>
                            <p className="mb-4" style={{ maxWidth: "500px", color: theme.colorPrimary }}>
                                Actualmente no tienes ningún bot configurado. Crea tu primer bot para comenzar a automatizar procesos.
                            </p>
                            <CButton
                                color="primary"
                                onClick={() => setShowModal(true)}
                                style={{ backgroundColor: theme.colorPrimary }}
                            >
                                <i className="fas fa-plus me-2"></i> Crear primer bot
                            </CButton>
                        </div>
                    </CCol>
                )}
            </CRow>

            <CRow style={{ backgroundColor: theme.colorThree }} className="m-5 rounded-3">
                <CCardHeader
                    className="py-2 rounded-top"
                    style={{ backgroundColor: theme.colorPrimary }}
                >
                    Análisis de Rendimiento de los Bots
                </CCardHeader>
                {!hasActiveBots || paginatedBots.length === 0 ? (

                    <CCol xs={12} className="py-3">
                        <CCard>
                            <CCardBody className="text-center" style={{ backgroundColor: theme.colorThree }}>
                                <CAlert color="warning" className="mb-0">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="fas fa-robot fa-3x mb-3 text-warning"></i>
                                        <h5>Todos los bots están apagados</h5>
                                        <p className="mb-0">Active al menos un bot para visualizar las métricas de rendimiento</p>
                                    </div>
                                </CAlert>
                            </CCardBody>
                        </CCard>
                    </CCol>
                ) : (
                    <>
                        {[
                            { title: "Tasa de Tarea completada", rate: 80, interval: 3000 },
                            { title: "Uso de Recursos", rate: 55, interval: 8000 },
                            { title: "Tasa de Escalabilidad", rate: 40, interval: 5000 },
                            { title: "Costo-Beneficio", rate: 70, interval: 10000 }
                        ].map((metric, index) => (
                            <CCol key={index} xs={12} md={6} lg={3} className="py-3">
                                <PerformanceCard
                                    title={metric.title}
                                    completeRate={metric.rate}
                                    intervalTime={metric.interval}
                                />
                            </CCol>
                        ))}
                    </>
                )}

            </CRow>
            <ModalCreate show={showModal} onClose={closeModal} refresh={refresh} setRefresh={setRefresh} />
        </CContainer>
    );
};