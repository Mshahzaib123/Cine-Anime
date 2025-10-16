import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisible = 5 }) => {
    // Calculate visible page numbers
    const getVisiblePages = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        // Adjust start if we're near the end
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap" data-animate="up">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                currentPage === 1
                    ? 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                    : 'bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white'
                }`}
                aria-label="Previous page"
            >
                <FiChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
            </button>

            {/* First Page */}
            {visiblePages[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="w-10 h-10 rounded-full font-semibold transition-all duration-300 bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white"
                    >
                        1
                    </button>
                    {visiblePages[0] > 2 && (
                        <span className="text-foreground/50">...</span>
                    )}
                </>
            )}

            {/* Visible Page Numbers */}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                        currentPage === page
                        ? 'bg-primary text-white shadow-shadow'
                        : 'bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Last Page */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className="text-foreground/50">...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="w-10 h-10 rounded-full font-semibold transition-all duration-300 bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                currentPage === totalPages
                    ? 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                    : 'bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white'
                }`}
                aria-label="Next page"
            >
                <span className="hidden sm:inline">Next</span>
                <FiChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;