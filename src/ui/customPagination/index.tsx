import React from "react";
import { CPagination, CPaginationItem } from "@coreui/react";

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <CPagination size="sm" aria-label="Page navigation">
            <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                style={{ cursor: currentPage === 1 ? "default" : "pointer" }}

            >
                Previous
            </CPaginationItem>

            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <CPaginationItem
                        key={pageNumber}
                        active={currentPage === pageNumber}
                        style={{
                            cursor: currentPage === pageNumber ? "default" : "pointer"
                        }}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </CPaginationItem>
                );
            })}

            <CPaginationItem
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
            >
                Next
            </CPaginationItem>
        </CPagination>
    );
};


