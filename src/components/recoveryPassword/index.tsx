import { useForm } from 'react-hook-form';
import { CCard, CCardBody, CForm, CRow, CCol, } from '@coreui/react';
import { BtnPrimary, CustomInput, PopupLoading } from '../../ui';
import { theme } from '../../theme';
import { useState } from 'react';

export const RecoveryPassword = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);


    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const onSubmit = async (data: unknown) => {
        console.log('User Logged In:', data);
        handleOpenModal();
        reset();

    };


    return (
        <>
            <CRow className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <CCol
                    style={{
                        width: '50%',
                        maxWidth: '360px',
                    }}
                >
                    <CCard className="shadow-lg">
                        <CCardBody>
                            <CCol md={12} className=''>
                                <strong style={{ color: theme.colorPrimary, fontSize: 20, fontWeight: theme.semiBoldTextPrimary }}>
                                    Recuperar Contraseña
                                </strong>
                            </CCol>
                            <CCol md={12} className='mt-3'>
                                <small style={{ color: theme.colorPrimary, fontSize: 15 }}>
                                    Introduce el correo con el cual te registraste. Recibirás una copia de tu contraseña en ese correo para que puedas acceder a tu cuenta nuevamente.
                                </small>
                            </CCol>

                            <CCol md={12} className='py-4'>
                                <CForm onSubmit={handleSubmit(onSubmit)}>
                                    <div className="text-start py-2">
                                        <CustomInput
                                            label="Correo"
                                            placeholder={"Ej: rricardo.23.11.2022@gmail.com"}
                                            size="sm"
                                            type="email"
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
                                    <div className="d-grid pt-2">
                                        <BtnPrimary label="Recuperar Contraseña" color="primary" type="submit" />
                                    </div>
                                </CForm>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow >
            <PopupLoading
                showModal={showModal}
                closeLoading={handleCloseModal}
                message={"Enviando Contraseña..."}
                subMessage={"Se ha enviado la contraseña a su correo."}
            />
        </>
    );
};


