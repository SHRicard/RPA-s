import React, { ChangeEvent } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { theme } from "../../theme";

interface CustomFileInputProps {
    id: string;
    onChange: (file: File | null) => void;
    position: { top: string; right: string };
}

export const CustomFile: React.FC<CustomFileInputProps> = ({ id, onChange, position }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onChange(file);
    };

    return (
        <div>
            <div
                style={{
                    width: "35px",
                    height: "35px",
                    background: theme.colorPrimary,
                    borderRadius: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "absolute",
                    top: position.top,
                    right: position.right,
                }}
                onClick={() => document.getElementById(id)?.click()}
            >
                <MdOutlineModeEdit size={24} style={{ color: "white" }} />
            </div>

            <input
                id={id}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                    display: "none",
                }}
            />
        </div>
    );
};
