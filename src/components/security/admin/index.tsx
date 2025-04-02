import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from '@coreui/react';
import { CustomSearch, BtnPrimary, CustomTable, CustomPagination, PopupLoading, EditModal } from "../../../ui";
import users from "../../../data/users.data.json"

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
    const [editFilterUser, setEditFilterUser] = useState<User[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const loadUsers = () => {
        const storedUsers: User[] = JSON.parse(localStorage.getItem('editUser') || '[]');
        const allUsers = [...users];
        if (storedUsers.length > 0) {
            storedUsers.forEach(storedUser => {
                const index = allUsers.findIndex(u => u._id === storedUser._id);
                if (index !== -1) {
                    allUsers[index] = { ...allUsers[index], ...storedUser };
                }
            });
        }
        return allUsers;
    };

    const isRefresh = () => {
        setRefresh(!refresh);
        setSearchQuery("");
    }
    // solo role User
    useEffect(() => {
        const allUsers = loadUsers();

        if (searchQuery.trim() === "") {
            setFilteredUsers(allUsers.filter(user => user.role === "user"));
        } else {
            setFilteredUsers(
                allUsers.filter(
                    user => user.role === "user" &&
                        user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
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
            const updatedUsers = filteredUsers.filter(user => user._id !== userId);
            setFilteredUsers(updatedUsers);
        }, 2000);
    };

    const handleEditModal = (status: boolean) => {
        setEditModal(status);
        if (!status) {
            setRefresh(prev => !prev);
        }
    };

    const handleEditById = (userId: string) => {
        const userToEdit = filteredUsers.filter(user => user._id === userId);
        setEditFilterUser(userToEdit);
    };

    const headerLarge = [
        "Avatar",
        "Nombre",
        "Email",
        "Estado",
        "Acciones"
    ];

    const headerSmall = [
        "Nombre",
        "Estado",
        "Acciones"
    ];

    return (
        <CContainer>
            <CCol style={{ paddingBottom: "0px" }}>
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
                            handleEditModal={handleEditModal}
                            handleEditById={handleEditById}
                            data={paginatedUsers}
                            onDelete={deleteUser}
                            toolTip={["Borrar Usuario", "Editar Usuario"]}
                            headerLarge={headerLarge}
                            headerSmall={headerSmall}
                            type="seguridad"
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
                <EditModal
                    show={editModal}
                    onClose={handleEditModal}
                    users={editFilterUser}
                />
            </CCol>
        </CContainer>
    );
};