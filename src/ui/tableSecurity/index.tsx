import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CRow,
    CAvatar,
    CTooltip,
    CModal,
    CModalBody,
    CForm,
    CCardBody,
    CCol,
    CModalFooter,
} from '@coreui/react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { theme } from '../../theme';
import { useMediaQuery } from 'react-responsive';
import { getStatusColor } from '../../utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomSelect } from '../customSelect';
import { BtnPrimary } from '../btnPrimary';
import { PopupLoading } from '../popupLoading';


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

interface TableProps {
    headerLarge: string[]
    headerSmall: string[]
    data: User[];
    onDelete: (userId: string) => void;
    toolTip: string[]
    isRefresh: () => void;
}

export const TableSecurity = ({
    headerLarge,
    headerSmall,
    data,
    onDelete,
    toolTip,
    isRefresh,

}: TableProps) => {
    const { register, setValue, handleSubmit } = useForm();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [urlAvatar, setUrlAvatar] = useState<string>("");
    const [loadingUpProfile, setLoadingUpProfile] = useState(false);

    const openModal = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };


    useEffect(() => {
        if (selectedUser) {
            setUrlAvatar(selectedUser.avatar)
        }
    }, [selectedUser, setValue]);

    const handleOpenModalUpProfile = () => {
        setLoadingUpProfile(true);
    };

    const handleCloseModalUpProfile = () => {
        setLoadingUpProfile(false);
        closeModal();
        isRefresh()
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        console.log({ data })
        handleOpenModalUpProfile()
        if (!selectedUser?._id) return;
        const storedUsers = localStorage.getItem("users");
        if (!storedUsers) return;
        const users = JSON.parse(storedUsers);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedUsers = users.map((user: any) => {
            if (user._id === selectedUser._id) {
                return {
                    ...user,
                    ...data,
                    _id: user._id,
                };
            }
            return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    return (
        <>
            <CRow>
                {data.length === 0 ? (
                    <p className="text-center w-100 my-4" style={{ fontWeight: 600, color: theme.colorPrimary }}>
                        No hay usuarios disponibles
                    </p>
                ) : !isSmallScreen ? (
                    <CTable>
                        <CTableHead>
                            <CTableRow className='text-start'>
                                {headerLarge.map((header, index) => (
                                    <CTableHeaderCell key={index} scope="col" className='pb-4'>
                                        {header}
                                    </CTableHeaderCell>
                                ))}
                            </CTableRow>
                        </CTableHead>
                        <CTableBody style={{ marginTop: '20px' }}>
                            {data.map((user, index) => (
                                <CTableRow key={index} className='text-start'>
                                    <CTableDataCell>
                                        <CAvatar src={user?.avatar} size="xl" style={{ width: "30px", height: "30px" }} />
                                    </CTableDataCell>
                                    <CTableDataCell>{user.name}</CTableDataCell>
                                    <CTableDataCell>{user.email}</CTableDataCell>
                                    <CTableDataCell style={{ color: getStatusColor(user.status) }}>{user.status}</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-3">
                                            <CTooltip content={toolTip[0]} placement="bottom">
                                                <RiDeleteBin6Line
                                                    style={{ color: theme.errorColor, cursor: 'pointer' }}
                                                    onClick={() => onDelete(user._id)}
                                                    size={20}
                                                />
                                            </CTooltip>

                                            <CTooltip content={toolTip[1]} placement="bottom">
                                                <MdOutlineModeEdit
                                                    style={{ color: 'black', cursor: 'pointer' }}
                                                    onClick={() => openModal(user)}
                                                    size={20}
                                                />
                                            </CTooltip>
                                        </div>
                                    </CTableDataCell>

                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                ) : (
                    <CTable>
                        <CTableHead>
                            <CTableRow className='text-start'>
                                {headerSmall.map((header, index) => (
                                    <CTableHeaderCell key={index} scope="col" className='pb-4'>
                                        {header}
                                    </CTableHeaderCell>
                                ))}
                            </CTableRow>
                        </CTableHead>
                        <CTableBody style={{ marginTop: '20px' }}>
                            {data.map((user, index) => (
                                <CTableRow key={index} className='text-start'>
                                    <CTableDataCell>
                                        {user.name}
                                        <div style={{ fontWeight: 'bold' }}>{user.email}</div>
                                    </CTableDataCell>
                                    <CTableDataCell style={{ color: getStatusColor(user.status) }}>{user.status}</CTableDataCell>
                                    <CTableDataCell>
                                        <CTooltip content={toolTip[0]} placement="bottom">
                                            <RiDeleteBin6Line style={{ color: theme.errorColor, cursor: 'pointer' }} onClick={() => onDelete(user._id)} />
                                        </CTooltip>
                                        <CTooltip content={toolTip[1]} placement="bottom">
                                            <MdOutlineModeEdit style={{ color: "black", cursor: 'pointer' }} onClick={() => openModal(user)} />
                                        </CTooltip>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                )}
            </CRow>

            <CModal visible={showModal} onClose={closeModal} alignment="center" size='lg' backdrop="static">
                <CModalBody>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CModalBody>
                            <CCardBody>
                                <CRow className="justify-content-start mx-3 pt-3">
                                    <CCol sm={12} md={6} lg={6} className="d-flex flex-column align-items-center justify-content-center pb-sm-3">
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                backgroundColor: theme.colorPrimary,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                overflow: "hidden",
                                                marginBottom: "15px",
                                            }}
                                        >
                                            <CAvatar
                                                src={urlAvatar}
                                                size="xl"
                                                style={{ width: "90px", height: "90px" }}
                                            />
                                        </div>

                                        <strong
                                            style={{
                                                color: theme.colorPrimary,
                                                fontSize: "18px",
                                                textAlign: "center",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {selectedUser?.name || "Usuario Anónimo"}
                                        </strong>
                                        <strong
                                            style={{
                                                color: theme.colorPrimary,
                                                fontSize: "12px",
                                                textAlign: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {selectedUser?._id || "ID Anónimo"}
                                        </strong>

                                        <div
                                            style={{
                                                marginBottom: "10px",
                                                width: "100%",
                                                textAlign: "center",
                                            }}
                                        >
                                            <span
                                                className="badge"
                                                style={{
                                                    backgroundColor: theme.colorSecondary,
                                                    color: "#fff",
                                                    fontWeight: theme.semiBoldTextPrimary,
                                                    fontSize: "0.9rem",
                                                    padding: "0.3rem 0.6rem",
                                                    borderRadius: "1rem",
                                                    width: "130px"
                                                }}
                                            >
                                                {selectedUser?.role || "Desconocido"}
                                            </span>
                                        </div>

                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor: getStatusColor(selectedUser?.status || "Desconocido"),
                                                color: "#fff",
                                                fontWeight: theme.semiBoldTextPrimary,
                                                fontSize: "0.9rem",
                                                padding: "0.3rem 0.6rem",
                                                borderRadius: "1rem",
                                                width: "100px"
                                            }}
                                        >
                                            {selectedUser?.status || "Desconocido"}
                                        </span>
                                    </CCol>
                                    <CCol sm={12} md={6} lg={6} className="d-flex flex-column pb-3">
                                        <strong
                                            style={{
                                                color: theme.colorPrimary,
                                                marginBottom: "10px",
                                            }}
                                        >
                                            Cambiar Estado
                                        </strong>
                                        <CRow>
                                            <CCol md={12} className='py-3'>
                                                <CustomSelect
                                                    // disabled={disabledFields.status}
                                                    label=""
                                                    id="status"
                                                    register={register}
                                                    validationRules={{ required: true }}
                                                    options={["Activo", "Pendiente", "Suspendido"]}
                                                    required={false}
                                                />
                                            </CCol>
                                        </CRow>

                                        <strong
                                            style={{
                                                color: theme.colorPrimary,
                                                marginTop: "20px",
                                            }}
                                        >
                                            Gestionar Cuenta
                                        </strong>
                                        <CCol md={12} className='py-3'>
                                            <CustomSelect
                                                // disabled={disabledFields.role}
                                                label=""
                                                id="chanelRole"
                                                register={register}
                                                validationRules={{ required: true }}
                                                options={["Usuario", "Administrador"]}
                                                required={false}
                                            />
                                        </CCol>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CModalBody>
                        <CModalFooter>
                            <CRow className="w-100">
                                <CCol md={6}>
                                    <div className="text-start d-grid">
                                        <BtnPrimary label="Editar" color="secondary" type="submit" />
                                    </div>
                                </CCol>
                                <CCol md={6}>
                                    <div className="text-start d-grid">
                                        <BtnPrimary label="Cerrar" color="primary" type="button" onClick={closeModal} />
                                    </div>
                                </CCol>
                            </CRow>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
            <PopupLoading
                showModal={loadingUpProfile}
                closeLoading={handleCloseModalUpProfile}
                message={"Actualizando tu perfil..."}
                subMessage={"¡Tu perfil se ha actualizado correctamente!"}
            />
        </>
    );
};
