import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from '@coreui/react';
import { CustomSearch, BtnPrimary, CustomPagination, PopupLoading, TableSecurity } from "../../../ui";
import users from "../../../data/users.data.json";

interface User {
    _id: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    name: string;
    avatar: string;
    documents: string;
    dateBirth: string;
    genero: string;
    country: string;
    city: string;
    status: string;
}

const ITEMS_PER_PAGE = 10;

export const SecurityAdmin: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
            localStorage.removeItem("users");
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, []);

    const getUsersFromLocalStorage = (): User[] => {
        return JSON.parse(localStorage.getItem("users") || "[]");
    };

    const isRefresh = () => {
        setRefresh(!refresh);
        setSearchQuery("");
        setPage(1);
    };

    useEffect(() => {
        const allUsers = getUsersFromLocalStorage();

        const filtered = allUsers.filter(user =>
            user.role === "user" &&
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredUsers(filtered);
    }, [searchQuery, refresh]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const paginatedUsers = filteredUsers.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleOpenModal = () => {
        setLoading(true);
    };

    const handleCloseModal = () => {
        setLoading(false);
    };

    const deleteUser = (userId: string) => {
        handleOpenModal();
        setTimeout(() => {
            const allUsers = getUsersFromLocalStorage();
            const updatedUsers = allUsers.filter(user => user._id !== userId);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            const filtered = updatedUsers.filter(user =>
                user.role === "user" &&
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }, 2000);
    };


    const headerLarge = ["Avatar", "Nombre", "Email", "Estado", "Acciones"];
    const headerSmall = ["Nombre", "Estado", "Acciones"];

    return (
        <CContainer>
            <CCol style={{ paddingBottom: "0px" }}>
                <CRow className="d-flex justify-content-center">
                    <CCol md={8} lg={8} className="py-2">
                        <CustomSearch onSearch={setSearchQuery} refresh={refresh} />
                    </CCol>
                    <CCol md="auto" lg="auto" className="py-2">
                        <BtnPrimary onClick={isRefresh} type="button" color="primary" label="Borrar Búsqueda" />
                    </CCol>
                </CRow>

                <CRow className="d-flex justify-content-center align-items-center py-5">
                    <CCol md={10}>
                        <TableSecurity
                            isRefresh={isRefresh}
                            data={paginatedUsers}
                            onDelete={deleteUser}
                            toolTip={["Borrar Usuario", "Editar Usuario"]}
                            headerLarge={headerLarge}
                            headerSmall={headerSmall}
                        />
                    </CCol>
                    <CCol md={10} className="d-flex justify-content-center">
                        <CustomPagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </CCol>
                </CRow>
                <PopupLoading
                    showModal={loading}
                    closeLoading={handleCloseModal}
                    message={"Borrando Usuario..."}
                    subMessage={"Se ha borrado el usuario"}
                />
            </CCol>
        </CContainer>
    );
};
