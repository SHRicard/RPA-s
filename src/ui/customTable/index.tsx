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
    CModalFooter
} from '@coreui/react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { theme } from '../../theme';
import { useMediaQuery } from 'react-responsive';
import { getStatusColor } from '../../utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomInput } from '../customInput';
import { CustomSelect } from '../customSelect';
import { BtnPrimary } from '../btnPrimary';
import countries from "../../data/pais.data.json"
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
    type?: "usuario" | "seguridad"
    isRefresh: () => void;
}

export const CustomTable = ({
    headerLarge,
    headerSmall,
    data,
    onDelete,
    toolTip,
    type = "usuario",
    isRefresh
}: TableProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
            setValue("name", selectedUser.name);
            setValue("documents", selectedUser.documents);
            setValue("dateBirth", selectedUser.dateBirth);
            setValue("genero", selectedUser.genero);
            setValue("country", selectedUser.country);
            setValue("city", selectedUser.city);
            setValue("email", selectedUser.email);
            setValue("password", selectedUser.password);
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
                                    {type === "usuario" ? (
                                        <CTableDataCell>{user.phone}</CTableDataCell>
                                    ) : (
                                        <CTableDataCell style={{ color: getStatusColor(user.status) }}>{user.status}</CTableDataCell>
                                    )}
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
                                    {type === "usuario" ? (
                                        <CTableDataCell>{user.phone}</CTableDataCell>
                                    ) : (
                                        <CTableDataCell style={{ color: getStatusColor(user.status) }}>{user.status}</CTableDataCell>
                                    )}
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

            {/* Modal */}
            <CModal visible={showModal} onClose={closeModal} alignment="center" size='lg'>
                <CModalBody>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CModalBody>
                            <CCardBody>
                                <div className="d-flex justify-content-center mb-4">
                                    <div
                                        style={{
                                            width: "12rem",
                                            height: "12rem",
                                            borderRadius: "50%",
                                            backgroundColor: theme.colorSecondary,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <CAvatar
                                            src={urlAvatar}
                                            size="xl"
                                            style={{
                                                width: "95%",
                                                minHeight: "95%",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="text-start">
                                    <CustomInput
                                        label="Nombre y Apellido"
                                        placeholder="Ej: Ricardo Ramirez"
                                        size="sm"
                                        type="text"
                                        id="name"
                                        register={register}
                                        required={false}
                                        validationRules={{
                                            pattern: {
                                                value: /^[a-zA-ZÀ-ÿ\s]+$/,
                                                message: "Por favor ingresa un nombre válido (solo letras y espacios)"
                                            }
                                        }}
                                        errorMessage={errors.name?.message as string}
                                    />
                                </div>

                                <div className="text-start">
                                    <CustomInput
                                        label="Documento de Identidad"
                                        placeholder="Ej: 34.567.890-1"
                                        type="text"
                                        size="sm"
                                        id="documents"
                                        register={register}
                                        required={false}
                                        validationRules={{
                                            pattern: {
                                                value: /^[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/,
                                                message: "Por favor ingresa un documento válido"
                                            }
                                        }}
                                        errorMessage={errors.documents?.message as string}
                                    />
                                </div>

                                <div className="text-start">
                                    <CustomInput
                                        label="Fecha de nacimiento"
                                        placeholder="Ej: 20/04/1991"
                                        type="text"
                                        size="sm"
                                        id="dateBirth"
                                        register={register}
                                        required={false}
                                        validationRules={{
                                            pattern: {
                                                value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                                                message: "Por favor ingresa una fecha válida (dd/mm/yyyy)"
                                            }
                                        }}
                                        errorMessage={errors.dateBirth?.message as string}
                                    />
                                </div>

                                <div className="text-start">
                                    <CustomSelect
                                        label="Género"
                                        id="genero"
                                        register={register}
                                        validationRules={{ required: true }}
                                        value={selectedUser?.genero || ''}
                                        options={[
                                            "Masculino",
                                            "Femenino",
                                            "No binario",
                                            "Prefiero no decirlo",
                                            "Otro"
                                        ]}
                                    />
                                </div>

                                <div className="text-start">
                                    <CustomSelect
                                        label="País"
                                        id="country"
                                        register={register}
                                        validationRules={{ required: true }}
                                        options={countries}
                                        value={selectedUser?.country || ''}
                                    />
                                </div>

                                <div className="text-start">
                                    <CustomInput
                                        label="Ciudad"
                                        placeholder="Ej: Buenos Aires"
                                        type="text"
                                        size="sm"
                                        id="city"
                                        register={register}
                                        required={false}
                                        validationRules={{
                                            pattern: {
                                                value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                                message: "Ingrese una ciudad válida"
                                            }
                                        }}
                                        errorMessage={errors.city?.message as string}
                                    />
                                </div>

                                <div className="text-start">
                                    <CustomInput
                                        label="Correo"
                                        placeholder="Ej: correo@ejemplo.com"
                                        type="email"
                                        size="sm"
                                        id="email"
                                        register={register}
                                        required={false}
                                        validationRules={{
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Ingresa un correo válido"
                                            }
                                        }}
                                        errorMessage={errors.email?.message as string}
                                    />
                                </div>
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
