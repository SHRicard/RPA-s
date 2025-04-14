import {
    CModal, CModalHeader, CModalTitle,
    CModalFooter, CButton, CRow,
    CCol, CAvatar
} from '@coreui/react';
import { theme } from '../../theme';
import { getStatusColor } from '../../utils';
import { CustomSelect } from '../customSelect';
import { useForm } from 'react-hook-form';
import { BtnPrimary } from '../btnPrimary';
import { useEffect, useState } from 'react';

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

interface FAQModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
    users: User[];
}

export const ModalEditUser: React.FC<FAQModalProps> = ({ show, onClose, users }) => {
    const { register, watch, setValue } = useForm();
    const [disabledFields, setDisabledFields] = useState({
        status: false,
        role: false
    });
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUsers: User[] = JSON.parse(localStorage.getItem('editUser') || '[]');
        const existingUser = storedUsers.find(u => u._id === users[0]?._id);
        const initialUser = existingUser || users[0];

        setSelectedUser(initialUser);

        if (initialUser) {
            setValue('status', initialUser.status);
            setValue('chanelRole', initialUser.role);
        }
    }, [show, users, setValue]);

    const handleUserUpdate = (field: 'status' | 'role') => {
        if (!selectedUser) return;

        const value = watch(field === 'status' ? 'status' : 'chanelRole');
        const updatedUser = { ...selectedUser, [field]: value };

        const storedUsers: User[] = JSON.parse(localStorage.getItem('editUser') || '[]');
        const filteredUsers = storedUsers.filter(u => u._id !== updatedUser._id);
        const updatedUsers = [...filteredUsers, updatedUser];
        localStorage.setItem('editUser', JSON.stringify(updatedUsers));
        setSelectedUser(updatedUser);
        setDisabledFields(prev => ({ ...prev, [field]: true }));
    };

    const refresh = () => {
        onClose(false);
        setDisabledFields({
            status: false,
            role: false
        });
    };
    return (
        <CModal visible={show} onClose={() => onClose(false)} alignment="center" size='lg'>
            <CModalHeader closeButton>
                <CModalTitle>Gestionar Cuenta</CModalTitle>
            </CModalHeader>
            {users.map((user) => (
                <CRow key={user._id} className="justify-content-start mx-3 pt-3">
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
                                src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
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
                            {selectedUser?.name || user?.name || "Usuario Anónimo"}
                        </strong>
                        <strong
                            style={{
                                color: theme.colorPrimary,
                                fontSize: "12px",
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >
                            {selectedUser?._id || user?._id || "ID Anónimo"}
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
                                {selectedUser?.role || user.role || "Desconocido"}
                            </span>
                        </div>

                        <span
                            className="badge"
                            style={{
                                backgroundColor: getStatusColor(selectedUser?.status || user.status),
                                color: "#fff",
                                fontWeight: theme.semiBoldTextPrimary,
                                fontSize: "0.9rem",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "1rem",
                                width: "100px"
                            }}
                        >
                            {selectedUser?.status || user.status || "Desconocido"}
                        </span>
                    </CCol>

                    <CCol sm={12} md={6} lg={6} className="d-flex flex-column pb-3">
                        {/* Cambiar Estado */}
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
                                    disabled={disabledFields.status}
                                    label=""
                                    id="status"
                                    register={register}
                                    validationRules={{ required: true }}
                                    options={["Activo", "Pendiente", "Suspendido"]}
                                    required={false}
                                />
                            </CCol>
                            <CCol md={12}>
                                <div className="text-start d-grid">
                                    <BtnPrimary
                                        disabled={disabledFields.status}
                                        label="Cambiar Estado"
                                        color="primary"
                                        type="button"
                                        onClick={() => handleUserUpdate('status')}
                                    />
                                </div>
                            </CCol>
                        </CRow>

                        {/* Gestionar Cuenta */}
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
                                disabled={disabledFields.role}
                                label=""
                                id="chanelRole"
                                register={register}
                                validationRules={{ required: true }}
                                options={["Usuario", "Administrador"]}
                                required={false}
                            />
                        </CCol>
                        <CCol md={12}>
                            <div className="text-start d-grid">
                                <BtnPrimary
                                    disabled={disabledFields.role}
                                    label="Gestionar Cuenta"
                                    color="primary"
                                    type="button"
                                    onClick={() => handleUserUpdate('role')}
                                />
                            </div>
                        </CCol>
                    </CCol>
                </CRow>
            ))}
            <CModalFooter>
                <CButton color="secondary" onClick={refresh}>Cerrar</CButton>
            </CModalFooter>
        </CModal>
    );
};