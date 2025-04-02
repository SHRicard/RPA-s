import { useForm } from 'react-hook-form';
import { CCard, CCardBody, CForm, CRow, CCol, } from '@coreui/react';
import { BtnPrimary, CustomInput, CustomPassword, CustomSelect } from '../../ui';
import { theme } from '../../theme';
import { Link } from 'react-router-dom';
import countries from "../../data/pais.data.json"

export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: unknown) => {
        console.log('User Logged In:', data);
    };

    return (
        <CRow className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <CCol
                style={{
                    width: '50%',
                    maxWidth: '400px',
                }}
            >
                <CCard className="shadow-lg">
                    <CCardBody>
                        <CCol md={12}>
                            <strong style={{ color: theme.colorPrimary, fontSize: 20, fontWeight: theme.semiBoldTextPrimary }}>
                                Crear cuenta
                            </strong>
                        </CCol>
                        <CCol md={12} className='py-3'>
                            <CForm onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-start py-1">
                                    <CustomInput
                                        label="Nombre y Apellido"
                                        placeholder={"Ej: rricardo.23.11.2022@gmail.com"}
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
                                <div className="text-start py-1">
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
                                <div className="text-start py-1">
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
                                <div className="text-start py-1">
                                    <CustomSelect
                                        label="Género"
                                        id="genero"
                                        register={register}
                                        validationRules={{ required: true }}
                                        value={''}
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
                                <div className="text-start py-1">
                                    <CustomSelect
                                        label="País"
                                        id="country"
                                        register={register}
                                        validationRules={{ required: true }}
                                        options={countries}
                                        required={false}
                                        value={''}
                                    />
                                </div>
                                <div className="text-start py-1">
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
                                    helpText={false}
                                    size="sm"
                                    id="password"
                                    register={register}
                                    required={true}
                                    validationRules={{
                                        required: "Contraseña is required",
                                    }}
                                    errorMessage={errors.email?.message as string}
                                />
                                <div className="text-start py-1">
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
                                <div className="d-grid pt-4">
                                    <BtnPrimary label="Crear cuenta" color="primary" type="submit" />
                                </div>
                            </CForm>
                            <CCol md={12} className='pb-3'>
                                <small style={{ color: theme.colorPrimary }}>
                                    Ya tienes una cuenta?{" "}
                                    <Link to="/" style={{ color: theme.colorPrimary, textDecoration: 'none', fontWeight: 'bold' }}>
                                        Iniciar sesión
                                    </Link>
                                </small>

                            </CCol>
                        </CCol>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >
    );
};


