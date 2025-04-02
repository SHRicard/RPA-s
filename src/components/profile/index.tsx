import React, { useEffect, useState } from "react";
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CForm,
    CAvatar
} from '@coreui/react';
import {
    CustomInput,
    BtnPrimary,
    CustomSelect,
    CustomPassword,
    PopupLoading,
    CustomFile,
} from "../../ui";
import { useForm } from "react-hook-form";
import { useUser, useUpdateUser } from "../../hooks";
import countries from "../../data/pais.data.json"
import { theme } from "../../theme";
import { ModalRecoveryPassword } from "../modalRecoveryPassword";
import { useRefresh } from "../../store/useRefresh";


type AuthData = {
    email: string;
    role: "admin" | "user" | null;
    name: string | null;
    avatar: string | null;
    isAuthenticated: boolean;
    documents: string | null;
    dateBirth: string | null;
    genero: string | null;
    country: string | null;
    city: string | null;
    password: string | null;
};

export const Profile: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<AuthData>();
    const [currentEmail, setCurrentEmail] = useState<string>();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingUpProfile, setLoadingUpProfile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const dataUser = useUser()
    const { updateUser } = useUpdateUser();
    const { triggerRefresh } = useRefresh();

    useEffect(() => {
        if (dataUser && dataUser.avatar) {
            setAvatarUrl(dataUser.avatar);
        } else {
            setAvatarUrl("https://randomuser.me/api/portraits/men/28.jpg");
        }
    }, [dataUser]);

    const openModalRecoveryPassword = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };




    useEffect(() => {
        if (dataUser) {
            setValue("name", dataUser.name);
            setValue("documents", dataUser.documents);
            setValue("dateBirth", dataUser.dateBirth);
            setValue("genero", dataUser.genero);
            setValue("country", dataUser.country);
            setValue("city", dataUser.city);
            setValue("email", dataUser.email);
            setValue("password", dataUser.password);
            setCurrentEmail(dataUser.email);

        }
    }, [dataUser, setValue]);

    const handleOpenModal = () => {
        setLoading(true);
    };

    const handleCloseModal = () => {
        setLoading(false);
    };
    const handleOpenModalUpProfile = () => {
        setLoadingUpProfile(true);
    };

    const handleCloseModalUpProfile = () => {
        setLoadingUpProfile(false);
    };
    const onSubmit = (data: AuthData) => {
        handleOpenModalUpProfile();

        updateUser({ name: data.name });
        updateUser({ documents: data.documents });
        updateUser({ dateBirth: data.dateBirth });
        updateUser({ genero: data.genero });
        updateUser({ country: data.country });
        updateUser({ city: data.city });
        updateUser({ email: data.email });
        updateUser({ password: data.password });
        if (avatarUrl) {
            updateUser({ avatar: avatarUrl });
        }

        setTimeout(() => {
            triggerRefresh()
        }, 2000)
    };


    const handleAvatarChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const avatar = reader.result as string;
                setAvatarUrl(avatar);
                localStorage.setItem("authData", JSON.stringify({ avatar }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <CContainer style={{

            maxHeight: "80vh", // Define la altura máxima para que se active el scroll
            overflowY: "auto", // Activa el scroll si el contenido excede la altura
        }}>
            <CRow className="d-flex justify-content-center align-items-center">
                <CCol md={12} lg={4} xl={4} className="py-3 d-flex justify-content-center">
                    <div style={{ position: "relative", display: "inline-block", textAlign: "center" }}>
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
                                src={avatarUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
                                size="xl"
                                style={{
                                    width: "95%",
                                    minHeight: "95%",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <CustomFile
                            id="avatar"
                            onChange={handleAvatarChange}
                            position={{ top: "15px", right: "15px" }}
                        />
                    </div>
                </CCol>
                <CCol md={12} lg={8} xl={6} className="pb-5">
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CCol md={12}>
                            <CCard className="shadow-sm">
                                <CCardBody>
                                    <div className="text-start">
                                        <CustomInput
                                            label="Nombre y Apellido"
                                            placeholder={"Ej: Ricardo Ramirez"}
                                            size="sm"
                                            type="text"
                                            id="name"
                                            register={register}
                                            required={true}
                                            validationRules={{
                                                required: "El nombre es obligatorio",
                                                pattern: {
                                                    value: /^[a-zA-ZÀ-ÿ\s]+$/,
                                                    message: "Por favor ingresa un nombre válido (solo letras y un espacio entre nombres)"
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
                                            required={true}
                                            validationRules={{
                                                required: "El documento es obligatorio",
                                                pattern: {
                                                    value: /^[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/,
                                                    message: "Por favor ingresa un documento válido (ej: 34.567.890-1)"
                                                }
                                            }}
                                            errorMessage={errors.documents?.message as string}
                                        />
                                    </div>
                                    <div className="text-start">
                                        <CustomInput
                                            label="Fecha de nacimiento"
                                            placeholder={"Ej: 20/04/1991"}
                                            type="text"
                                            size="sm"
                                            id="dateBirth"
                                            register={register}
                                            required={true}
                                            validationRules={{
                                                required: "La fecha de nacimiento es obligatoria",
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
                                            value={dataUser?.genero || ''}
                                            options={[
                                                "Masculino",
                                                "Femenino",
                                                "No binario",
                                                "Prefiero no decirlo",
                                                "Otro"
                                            ]}
                                            required={false}
                                        />
                                    </div>
                                    <div className="text-start">
                                        <CustomSelect
                                            label="País"
                                            id="country"
                                            register={register}
                                            validationRules={{ required: true }}
                                            options={countries}
                                            required={false}
                                            value={dataUser?.country || ''}
                                        />
                                    </div>
                                    <div className="text-start">
                                        <CustomInput
                                            label="Cuidad"
                                            placeholder={"ej: Buenos Aires"}
                                            type="text"
                                            size="sm"
                                            id="city"
                                            register={register}
                                            required={true}
                                            validationRules={{
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                                    message: "Ingrese una ciudad válida (solo letras y espacios)"
                                                }
                                            }}
                                            errorMessage={errors.city?.message as string}
                                        />
                                    </div>
                                    <CustomPassword
                                        label="Contraseña"
                                        placeholder={"***************"}
                                        helpText={true}
                                        size="sm"
                                        id="password"
                                        register={register}
                                        required={true}
                                        validationRules={{
                                            required: "Contraseña is required",
                                        }}
                                        errorMessage={errors.email?.message as string}
                                        RecoveryPassword={openModalRecoveryPassword}
                                    />
                                    <div className="text-start">
                                        <CustomInput
                                            label="Correo"
                                            placeholder={"Selecione una Opc"}
                                            type="email"
                                            size="sm"
                                            id="email"
                                            register={register}
                                            required={true}
                                            validationRules={{
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: "Please enter a valid email"
                                                }
                                            }}
                                            errorMessage={errors.email?.message as string}
                                        />
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md={6}>
                            <div className="text-start d-grid pt-4">
                                <BtnPrimary label="Guardar" color="primary" type="submit" />
                            </div>
                        </CCol>
                    </CForm>
                </CCol>
            </CRow>
            <ModalRecoveryPassword
                show={modalVisible}
                closeModal={closeModal}
                currentEmail={currentEmail || ""}
                loading={handleOpenModal}
            />
            <PopupLoading
                showModal={loading}
                closeLoading={handleCloseModal}
                message={"Enviando Contraseña..."}
                subMessage={"Se ha enviado la contraseña a su correo."}
            />
            <PopupLoading
                showModal={loadingUpProfile}
                closeLoading={handleCloseModalUpProfile}
                message={"Actualizando tu perfil..."}
                subMessage={"¡Tu perfil se ha actualizado correctamente!"}
            />
        </CContainer>
    );
};
