import { useState } from 'react';
import { CFormLabel, CFormInput } from '@coreui/react';
import { UseFormRegister, } from 'react-hook-form';
import { theme } from '../../theme';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Usa react-icons para el ojo

type CustomInputProps = {
    label: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationRules: any;
    size: "sm" | "lg";
    errorMessage?: string;
    required: boolean;
    placeholder: string;
    helpText?: boolean
    RecoveryPassword?: () => void
};

export const CustomPassword = ({
    label,
    id,
    register,
    validationRules,
    errorMessage,
    size = "sm",
    required,
    placeholder,
    helpText = false,
    RecoveryPassword
}: CustomInputProps) => {
    const isError = errorMessage ? true : false;
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="text-start" style={{ position: 'relative' }}>
            <CFormLabel
                htmlFor={id}
                className='mx-1'
                style={{
                    color: isError ? theme.errorColor : theme.colorPrimary,
                    fontWeight: theme.semiBoldTextPrimary,
                    fontSize: 12,
                }}
            >
                {label}
                {required && <span style={{ color: theme.errorColor }}>*</span>}
            </CFormLabel>

            <div style={{ position: 'relative' }}>
                <CFormInput
                    style={{
                        border: isError ? theme.borderError : theme.borderPrimary,
                        borderRadius: theme.borderRadius,
                        paddingLeft: '0.7rem',
                        paddingRight: '2.5rem',
                    }}
                    placeholder={placeholder}
                    size={size}
                    type={isPasswordVisible ? 'text' : 'password'}
                    id={id}
                    {...register(id, {
                        required: required ? 'Este campo es obligatorio' : false,
                        ...validationRules,
                    })}
                />
                <div
                    onClick={togglePasswordVisibility}
                    style={{
                        position: 'absolute',
                        right: '0.7rem',
                        top: '50%',
                        transform: 'translateY(-60%)',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                >
                    {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
                </div>
            </div>
            {
                helpText && <div className='col-12 text-end'>
                    <button
                        type="button"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: theme.colorPrimary,
                            textDecoration: 'underline',
                            padding: '0',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            fontWeight: theme.semiBoldTextPrimary,
                        }}
                        onClick={RecoveryPassword}
                    >
                        ¿Cambiar contraseña?
                    </button>
                </div>
            }

        </div>
    );
};
