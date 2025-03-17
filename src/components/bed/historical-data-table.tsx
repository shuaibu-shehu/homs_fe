import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { DailyConsumption } from '@/lib/types/bed';
import { Pagination } from './pagination';

interface HistoricalDataTableProps {
    data: DailyConsumption[];
    sortOrder: 'asc' | 'desc';
    onSortOrderChange: (order: 'asc' | 'desc') => void;
    currentPage: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
}

export const HistoricalDataTable: React.FC<HistoricalDataTableProps> = ({
    data,
    sortOrder,
    onSortOrderChange,
    currentPage,
    onPageChange,
    itemsPerPage = 5,
}) => {
    const sortedData = [...data].sort((a, b) => {
        const modifier = sortOrder === 'asc' ? 1 : -1;
        return (a.date.localeCompare(b.date)) * modifier;
    });

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedData.length === 0) {
        return null
    }

    return (
        <div className=" dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white text-gray-800">Consumption History</h3>
                <button
                    onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center px-3 py-1 dark:bg-gray-700 bg-custome-green-300 text-white rounded-md drak:text-gray-800 hover:bg-gray-200 transition-colors"
                >
                    <ArrowUpDown className="w-4 h-4 mr-1" />
                    Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-3 px-4 text-gray-400">Date</th>
                            <th className="py-3 px-4 text-gray-400">Total Consumption (L)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((day, index) => (
                            <tr
                                key={day.date}
                                className={`border-b border-gray-700 ${index % 2 === 0 ? ' dark:bg-slate-600 bg-slate-100' : ''
                                    }`}
                            >
                                <td className="py-3 px-4 text-gray-400 dark:text-gray-300">
                                    {format(new Date(day.date), 'MMM dd, yyyy')}
                                    {/* {day.date} */}
                                </td>
                                <td className="py-3 px-4 text-gray-400 dark:text-gray-300">
                                    {day.totalConsumption.toLocaleString()} L
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};