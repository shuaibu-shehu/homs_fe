import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-1 bg-custome-green-300 dark:bg-gray-700 rounded-md dark:text-gray-300 hover:bg-custome-green-400 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-1 bg-custome-green-300 dark:bg-gray-700 rounded-md dark:text-gray-300 hover:bg-custome-green-400 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    );
};