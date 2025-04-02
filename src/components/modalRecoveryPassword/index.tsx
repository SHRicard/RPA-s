import { CCard, CCardBody, CCol, CForm, CModal, CRow } from '@coreui/react';
import { theme } from '../../theme';
import { BtnPrimary } from '../../ui/btnPrimary';
import { CustomInput } from '../../ui/customInput';
import { CustomPassword } from '../../ui/CustomPassword';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks';
import { useEffect, useState } from 'react';

type ModalChildrenProps = {
    show: boolean;
    closeModal: () => void;
    currentEmail: string;
    loading: () => void
};
interface IForm {
    email: string;
    password: string;
    confirmPassword: string
}
export const ModalRecoveryPassword = ({ show, currentEmail, closeModal, loading }: ModalChildrenProps) => {
    const { register, handleSubmit, setValue, reset, setError, formState: { errors } } = useForm<IForm>();
    const [errorRecovery, setErrorRecovery] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const dataUser = useUser()

    useEffect(() => {
        if (dataUser) {
            setValue("email", dataUser?.email || "");
        }
    }, [dataUser, setValue]);

    const onSubmit = (data: IForm) => {
        console.log(data)
        if (!data.email) {
            setErrorMessage("Correo electrónico es requerido.")
            setError("email", {
                type: "manual",
                message: "Correo electrónico es requerido.",
            });
            setErrorRecovery(true)
            return;
        }

        if (!data.password) {
            console.log("No hay correo");
            setErrorMessage("Contraseña es requerida.")
            setError("password", {
                type: "manual",
                message: "Contraseña es requerida.",
            });
            setErrorRecovery(true)
            return;
        }

        if (!data.confirmPassword) {
            setErrorMessage("Confirmar contraseña es requerida.")
            setError("confirmPassword", {
                type: "manual",
                message: "Confirmar contraseña es requerida.",
            });
            setErrorRecovery(true)
            return;
        }
        if (data.password !== data.confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.")
            setError("confirmPassword", {
                type: "manual",
                message: "Las contraseñas no coinciden.",
            });
            setErrorRecovery(true)
            return;
        }
        closeModal();
        loading();
        reset();
    };


    return (
        <CModal visible={show} onClose={closeModal} size="lg" alignment="center" backdrop="static">
            <CCard className="shadow-lg">
                <CCardBody>
                    <CCol md={12} className=''>
                        <strong style={{ color: theme.colorPrimary, fontSize: 20, fontWeight: theme.semiBoldTextPrimary }}>
                            Recuperar Contraseña
                        </strong>
                    </CCol>
                    <CCol md={12} className='mt-3'>
                        <small style={{ color: theme.colorPrimary, fontSize: 15 }}>
                            Hemos detectado el correo con el cual te registraste y es <strong>{currentEmail}</strong>. Se enviará la nueva contraseña a ese correo.
                            Si el correo no es con el que te registraste, modifícalo, pero ten en cuenta que es una acción peligrosa. Proceda con cuidado.
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
                            <div className="text-start py-2">

                                <CustomPassword
                                    label="Nueva Contraseña"
                                    placeholder={"***************"}
                                    helpText={false}
                                    size="sm"
                                    id="password"
                                    register={register}
                                    required={true}
                                    validationRules={{
                                        required: "Contraseña is required",
                                    }}
                                    errorMessage={errors.password?.message as string}
                                />
                            </div>
                            <div className="text-start py-2">
                                <CustomPassword
                                    label="Confirmar Contraseña"
                                    placeholder={"***************"}
                                    helpText={false}
                                    size="sm"
                                    id="confirmPassword"
                                    register={register}
                                    required={true}
                                    validationRules={{
                                        required: "Contraseña is required",
                                    }}
                                    errorMessage={errors.confirmPassword?.message as string}
                                />
                            </div>
                            {
                                errorRecovery &&
                                <div className="text-start py-2">
                                    <CCol md={12} className='text-start'>
                                        <strong style={{ color: theme.errorColor, fontSize: 12, fontWeight: theme.semiBoldTextPrimary }}>
                                            {errorMessage}
                                        </strong>
                                    </CCol>
                                </div>
                            }
                            <CRow>
                                <CCol>
                                    <div className="d-grid pt-2">
                                        <BtnPrimary label="Recuperar Contraseña" color="primary" type="submit" />
                                    </div>
                                </CCol>
                                <CCol>
                                    <div className="d-grid pt-2">
                                        <BtnPrimary label="Cerrar" color="secondary" type="button" onClick={closeModal} />
                                    </div>
                                </CCol>
                            </CRow>


                        </CForm>
                    </CCol>
                </CCardBody>
            </CCard>
        </CModal>

    );
};


