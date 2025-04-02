import React, { useEffect, useState } from "react";
import { CInputGroup, CFormInput, CButton, CCol } from "@coreui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../theme";

interface CustomSearchProps {
    onSearch: (query: string) => void;
    refresh: boolean,
    label?: string,
    placeholder?: string,
}

export const CustomSearch: React.FC<CustomSearchProps> = ({ onSearch, refresh, label, placeholder = "Buscar usuario..." }) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery("")
    }, [refresh]);

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <CCol className="d-flex justify-content-center align-items-center">
            {label &&
                <CCol md="auto" className="mx-3"

                    style={{
                        fontWeight: 600,
                        fontSize: "1.5rem",
                        color: theme.colorPrimary
                    }}>{label}</CCol>}
            <CCol md={10}>
                <CInputGroup>
                    <CFormInput
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <CButton color="primary" onClick={handleSearch} style={{ backgroundColor: theme.colorPrimary }}>
                        <FaSearch />
                    </CButton>
                </CInputGroup>
            </CCol>
        </CCol>

    );
};
