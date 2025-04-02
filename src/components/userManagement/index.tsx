import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from '@coreui/react';
import { BtnPrimary, CustomPagination, CustomSearch, CustomTable, PopupLoading } from "../../ui";
import users from "../../data/users.data.json"

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

const ITEMS_PER_PAGE = 5;
export const UserManagement: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);


    const isRefresh = () => {
        setRefresh(!refresh)
        setSearchQuery("")
    }

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredUsers(users.filter(user => user.role === "user"));
        } else {
            setFilteredUsers(
                users.filter(
                    user => user.role === "user" &&
                        user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery]);

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
            const updatedUsers = filteredUsers.filter(user => user._id !== userId);
            setFilteredUsers(updatedUsers);
        }, 2000);
    };



    const headerLarge = [
        "Avatar",
        "Nombre",
        "Email",
        "Telefono",
        "Acciones"
    ]
    const headerSmall = [
        "Nombre",
        "Telefono",
        "Acciones"
    ]
    return (
        <CContainer>
            <CRow className="d-flex justify-content-center">
                <CCol md={8} lg={8} className="py-2">
                    <CustomSearch onSearch={setSearchQuery} refresh={refresh} />
                </CCol>
                <CCol md="auto" lg="auto" className="py-2">
                    <BtnPrimary onClick={isRefresh} type="button" color="primary" label="Borrar Busqueda" />
                </CCol>
            </CRow>

            <CRow className="d-flex justify-content-center align-items-center py-5">
                <CCol md={10}>
                    <CustomTable
                        data={paginatedUsers}
                        onDelete={deleteUser}
                        type="usuario"
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
                message={"Enviando Contraseña..."}
                subMessage={"Se ha enviado la contraseña a su correo."}
            />
        </CContainer>
    );
};
