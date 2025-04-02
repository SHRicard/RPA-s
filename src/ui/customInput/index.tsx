import { CFormLabel, CFormInput, CFormTextarea } from '@coreui/react';
import { UseFormRegister, } from 'react-hook-form';
import { theme } from '../../theme';

type CustomInputProps = {
    label: string;
    type: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationRules: any;
    size: "sm" | "lg";
    errorMessage?: string;
    required: boolean;
    placeholder: string;
    rows?: number;
    disabled?: boolean
};

export const CustomInput = ({
    label,
    type,
    id,
    register,
    validationRules,
    errorMessage,
    size = "sm",
    required,
    placeholder,
    rows,
    disabled = false
}: CustomInputProps) => {
    const isError = errorMessage ? true : false;
    return (
        <div className="text-start">
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
            {type === 'textarea' ? (
                <CFormTextarea
                    disabled={disabled}
                    id={id}
                    placeholder={placeholder}
                    rows={rows}
                    style={{
                        border: isError ? theme.borderError : theme.borderPrimary,
                        borderRadius: theme.borderRadius,
                        paddingLeft: '0.7rem',
                    }}
                    {...register(id, {
                        required: required ? 'Este campo es obligatorio' : false,
                        ...validationRules,
                    })}
                />
            ) : (
                <CFormInput
                    disabled={disabled}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    size={size}
                    style={{
                        border: isError ? theme.borderError : theme.borderPrimary,
                        borderRadius: theme.borderRadius,
                        paddingLeft: '0.7rem',
                    }}
                    {...register(id, {
                        required: required ? 'Este campo es obligatorio' : false,
                        ...validationRules,
                    })}
                />
            )}

        </div>
    );
};
