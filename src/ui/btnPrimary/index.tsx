import React from 'react';
import { CButton } from '@coreui/react';
import { theme } from '../../theme';
import { IoMdAdd } from 'react-icons/io';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    color: 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'warning' | "white";
    type?: 'button' | 'submit' | 'reset';
    newUser?: boolean
    disabled?: boolean
}

export const BtnPrimary: React.FC<ButtonProps> = ({ label, onClick, color, type = 'button', newUser = false, disabled = false }) => {

    const colorMap = {
        primary: theme.colorPrimary,
        secondary: theme.colorSecondary,
        danger: theme.errorColor,
        success: theme.colorPrimary,
        info: theme.colorThree,
        warning: theme.colorWarning,
        white: theme.colorWhite,
    };
    const buttonColor = colorMap[color];
    return (
        <CButton
            disabled={disabled}
            color={color}
            type={type}
            onClick={onClick}
            style={{
                backgroundColor: buttonColor,
                border: `1px solid ${buttonColor}`,
                borderRadius: theme.borderRadius,
                padding: '0.5rem 1rem',
                fontWeight: theme.semiBoldTextPrimary,
            }}
        >
            {newUser && <IoMdAdd size={25} />}  {label}
        </CButton>
    );
};
