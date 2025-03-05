import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "./pagination.css";

// Define props interface
interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
}) => {
    const handlePagination = (page: number): void => {
        onPageChange(page);
    };

    const handlePrevious = (): void => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = (): void => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const generatePageNumbers = (): React.ReactNode[] => {
        const pageNumbers: React.ReactNode[] = [];
        const maxVisiblePages: number = 5; // Number of pages to show at a time
        const halfMaxVisiblePages: number = Math.floor(maxVisiblePages / 2);
        
        let startPage: number = Math.max(1, currentPage - halfMaxVisiblePages);
        let endPage: number = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First and Previous buttons
        if (startPage > 1) {
            pageNumbers.push(
                <button 
                    key="first" 
                    onClick={() => handlePagination(1)}
                    className="pagination-button pagination-first"
                >
                    «
                </button>
            );
            pageNumbers.push(
                <button 
                    key="prev" 
                    onClick={handlePrevious}
                    className="pagination-button pagination-prev"
                >
                    <FaAngleLeft />
                </button>
            );
        }

        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePagination(i)}
                    className={`pagination-button ${i === currentPage ? 'pagination-active' : ''}`}
                >
                    {i}
                </button>
            );
        }

        // Next and Last buttons
        if (endPage < totalPages) {
            pageNumbers.push(
                <button 
                    key="next" 
                    onClick={handleNext}
                    className="pagination-button pagination-next"
                >
                    <FaAngleRight />
                </button>
            );
            pageNumbers.push(
                <button 
                    key="last" 
                    onClick={() => handlePagination(totalPages)}
                    className="pagination-button pagination-last"
                >
                    »
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pagination-container">
            <div className="pagination-wrapper">
                <button 
                    onClick={handlePrevious} 
                    disabled={currentPage === 1}
                    className="pagination-button pagination-prev"
                >
                    <FaAngleLeft />
                </button>
                
                <div className="pagination-numbers">
                    {generatePageNumbers()}
                </div>
                
                <button 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages}
                    className="pagination-button pagination-next"
                >
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default PaginationComponent;