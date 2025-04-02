import { useState } from 'react';
import {

    CCol, CTab, CTabContent, CTabList, CTabPanel, CTabs,
} from '@coreui/react';
import conversacion from "../../data/conversacion.data.json";
import { CustomCardChats } from "../../ui/customCardsChats";
import { CustomPagination } from '../../ui';

const ITEMS_PER_PAGE = 2;


export const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [pageAll, setPageAll] = useState(1);
    const [pageSolved, setPageSolved] = useState(1);
    const [pageUnsolved, setPageUnsolved] = useState(1);

    const solved = conversacion.filter(conv => conv.status === "solucionado");
    const unsolved = conversacion.filter(conv => conv.status === "no solucionado");

    const totalPagesAll = Math.ceil(conversacion.length / ITEMS_PER_PAGE);
    const totalPagesSolved = Math.ceil(solved.length / ITEMS_PER_PAGE);
    const totalPagesUnsolved = Math.ceil(unsolved.length / ITEMS_PER_PAGE);

    const paginatedConvs = conversacion.slice(
        (pageAll - 1) * ITEMS_PER_PAGE,
        pageAll * ITEMS_PER_PAGE
    );

    const paginatedSolved = solved.slice(
        (pageSolved - 1) * ITEMS_PER_PAGE,
        pageSolved * ITEMS_PER_PAGE
    );

    const paginatedUnsolved = unsolved.slice(
        (pageUnsolved - 1) * ITEMS_PER_PAGE,
        pageUnsolved * ITEMS_PER_PAGE
    );



    return (
        <CCol md={12} >
            <CTabs activeItemKey={activeTab}>
                <CTabList variant="underline-border" className="d-flex justify-content-between w-100">
                    <CTab
                        onClick={() => setActiveTab(1)}
                        itemKey={1}
                        className="flex-grow-1 text-center"
                    >
                        Todas ({conversacion.length})
                    </CTab>
                    <CTab
                        onClick={() => setActiveTab(2)}
                        itemKey={2}
                        className="flex-grow-1 text-center"
                    >
                        Solucionado ({solved.length})
                    </CTab>
                    <CTab
                        onClick={() => setActiveTab(3)}
                        itemKey={3}
                        className="flex-grow-1 text-center"
                    >
                        No solucionado ({unsolved.length})
                    </CTab>
                </CTabList>

                <CTabContent className="w-100">
                    {/* TAB - Todas las conversaciones */}
                    <CTabPanel className="p-3" itemKey={1}>
                        {paginatedConvs.map((conv) => (
                            <CustomCardChats conversation={conv} key={conv.id} />
                        ))}
                        <CCol md={12} className='d-flex justify-content-center'>
                            <CustomPagination
                                currentPage={pageAll}
                                totalPages={totalPagesAll}
                                onPageChange={setPageAll}
                            />
                        </CCol>
                    </CTabPanel>

                    <CTabPanel className="p-3" itemKey={2}>
                        {paginatedSolved.map((conv) => (
                            <CustomCardChats conversation={conv} key={conv.id} />
                        ))}
                        <CCol md={12} className='d-flex justify-content-center'>
                            <CustomPagination
                                currentPage={pageSolved}
                                totalPages={totalPagesSolved}
                                onPageChange={setPageSolved}
                            />
                        </CCol>
                    </CTabPanel>
                    <CTabPanel className="p-3" itemKey={3}>
                        {paginatedUnsolved.map((conv) => (
                            <CustomCardChats conversation={conv} key={conv.id} />
                        ))}
                        <CCol md={12} className='d-flex justify-content-center'>
                            <CustomPagination
                                currentPage={pageUnsolved}
                                totalPages={totalPagesUnsolved}
                                onPageChange={setPageUnsolved}
                            />
                        </CCol>
                    </CTabPanel>
                </CTabContent>
            </CTabs>
        </CCol>
    );
};
