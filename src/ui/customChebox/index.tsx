import { CFormCheck, CFormLabel } from '@coreui/react';
import { theme } from '../../theme';

interface CheckboxProps {
    id: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    errorMessage?: string;
    required: boolean;
}

export const CustomCheckbox: React.FC<CheckboxProps> = ({ id, label, register, errorMessage, required }) => {
    return (
        <div className="d-flex align-items-center ">
            <CFormCheck
                style={{
                    border: theme.borderPrimary,
                    marginRight: '0.5rem', // Espacio entre el checkbox y el label
                }}
                id={id}
                {...register(id, { required: required ? 'Este campo es obligatorio' : false })}
            />
            <CFormLabel
                className='m-0'
                htmlFor={id}
                style={{
                    color: theme.colorPrimary,
                    fontWeight: theme.regularWeightTextSecondary,
                }}
            >
                {label}
            </CFormLabel>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>} {/* Añado margen superior al error */}
        </div>
    );
};


