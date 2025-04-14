import { CFormLabel, CFormSelect } from "@coreui/react";
import { UseFormRegister } from "react-hook-form";
import { theme } from "../../theme";

type CustomSelectProps = {
    label?: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    validationRules?: Record<string, unknown>;
    size?: "sm" | "lg";
    errorMessage?: string;
    required?: boolean;
    options: string[];
    value?: string;
    disabled?: boolean
};

export const CustomSelect = ({
    label,
    id,
    register,
    validationRules = {},
    errorMessage,
    size = "sm",
    required = false,
    disabled = false,
    options,
    value,
}: CustomSelectProps) => {
    const isError = !!errorMessage;

    const getOptions = () => [
        { label: `Selecciona ${id === "country" ? "un país" : "una opción"}`, value: "", disabled: true },
        ...options.map((option) => ({ label: option, value: option })),
    ];

    return (
        <div className="text-start" style={{ position: "relative" }}>

            {
                label && <CFormLabel
                    htmlFor={id}
                    className="mx-1"
                    style={{
                        color: isError ? theme.errorColor : theme.colorPrimary,
                        fontWeight: theme.semiBoldTextPrimary,
                        fontSize: 12,
                    }}
                >
                    {label}
                    {required && <span style={{ color: theme.errorColor }}>*</span>}
                </CFormLabel>
            }


            <CFormSelect
                disabled={disabled}
                aria-label={label}
                id={id}
                size={size}
                {...register(id, {
                    required: required ? "Este campo es obligatorio" : false,
                    ...validationRules,
                })}
                value={value}
                options={getOptions()}
                style={{
                    border: isError ? theme.borderError : theme.borderPrimary,
                    borderRadius: theme.borderRadius,
                    paddingLeft: "0.7rem",
                    height: size === "sm" ? "35px" : "40px",
                    fontSize: size === "sm" ? "12px" : "14px",
                    maxHeight: "200px",
                    overflowY: "auto" as const,
                }}
            />
        </div>
    );
};
