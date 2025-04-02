import { useForm } from 'react-hook-form';
import { CCard, CCardBody, CForm, CRow, CCol, } from '@coreui/react';
import { BtnPrimary, CustomCheckbox, CustomInput } from '../../ui';
import { theme } from '../../theme';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { dashboard } from '../../utils';

export const Signin = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const { login, role } = useAuthStore();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        const email = data.email;
        const password = data.password;

        const success = login(email, password);
        console.log("Llamando a saveAuthData con:")
        if (success) {
            if (role === "admin") {
                navigate(dashboard[0].rotuer[0]);
            }
            if (role === "user") {
                navigate(dashboard[1].rotuer[0]);
            }

            setErrorLogin(false);
        } else {
            setError("email", {
                type: "manual",
                message: "Correo electrónico o contraseña incorrectos.",
            });
            setError("password", {
                type: "manual",
                message: "Correo electrónico o contraseña incorrectos.",
            });
            setErrorLogin(true);
        }
    };


    return (
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
                                Iniciar sesión
                            </strong>
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
                                <div className="text-start py-2">
                                    <CustomInput
                                        label="Contraseña"
                                        placeholder={"***************"}
                                        type="password"
                                        size="sm"
                                        id="password"
                                        register={register}
                                        required={true}
                                        validationRules={{
                                            required: "Contraseña is required",
                                        }}
                                        errorMessage={errors.email?.message as string}
                                    />
                                </div>
                                <div className="text-start py-2 mx-2">
                                    <CustomCheckbox
                                        id="recordarme"
                                        label="Recordarme"
                                        register={register}
                                        required={false}
                                        errorMessage={errors.recordarme?.message as string}
                                    />
                                </div>
                                {
                                    errorLogin && <CCol md={12} className='text-start'>
                                        <strong style={{ color: theme.errorColor, fontSize: 12, fontWeight: theme.semiBoldTextPrimary }}>
                                            Credenciales incorrectas
                                        </strong>
                                    </CCol>
                                }
                                <div className="d-grid pt-2 m-2">
                                    <BtnPrimary label="Iniciar sesión" color="primary" type="submit" />
                                </div>
                            </CForm>
                            <CCol md={12} className='pb-3'>
                                <small style={{ color: theme.colorPrimary }}>
                                    No tienes cuenta?{" "}
                                    <Link to="/register" style={{ color: theme.colorPrimary, textDecoration: 'none', fontWeight: 'bold' }}>
                                        Crear cuenta
                                    </Link>
                                </small>

                            </CCol>
                        </CCol>
                        <CCol md={12} className='pb-2'>
                            <Link to="/recovery-password" style={{ color: theme.colorPrimary, textDecoration: 'none', fontSize: 12, fontWeight: 'bold' }}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </CCol>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >
    );
};


