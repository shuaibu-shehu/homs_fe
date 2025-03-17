import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { History, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { DailyConsumption } from '@/lib/types/bed';
import { ChartControls } from './chart-controls';
import { Pagination } from './pagination';
import { getDailyConsumption } from '@/lib/actions/bed';
import { useParams } from 'next/navigation';

interface HistoricalDataProps {
    dailyConsumption: DailyConsumption[];
}

export const HistoricalData = ({ dailyConsumption }: HistoricalDataProps) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [left, setLeft] = useState<string | null>(null);
    const [right, setRight] = useState<string | null>(null);
    const [refAreaLeft, setRefAreaLeft] = useState<string>('');
    const [refAreaRight, setRefAreaRight] = useState<string>('');
    const [top, setTop] = useState<number | 'auto'>('auto');
    const [bottom, setBottom] = useState<number | 'auto'>('auto');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const chartRef = useRef<HTMLDivElement>(null);

    
    const sortedData = [...dailyConsumption].sort((a, b) => {
        const modifier = sortOrder === 'asc' ? 1 : -1;
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * modifier;
    });

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const chartData = sortedData.map(day => ({
        date: day.date,
        consumption: day.totalConsumption,
    }));

    const getAxisYDomain = (from: string, to: string, offset: number) => {
        const refData = chartData.filter(
            d => d.date >= from && d.date <= to
        );
        let [bottom, top] = [
            Math.min(...refData.map(d => d.consumption)),
            Math.max(...refData.map(d => d.consumption)),
        ];

        bottom = bottom - offset;
        top = top + offset;

        return [bottom, top];
    };

    const zoom = () => {
        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            setRefAreaLeft('');
            setRefAreaRight('');
            return;
        }

        let [newBottom, newTop] = getAxisYDomain(refAreaLeft, refAreaRight, 100);

        setRefAreaLeft('');
        setRefAreaRight('');
        setLeft(refAreaLeft);
        setRight(refAreaRight);
        setBottom(newBottom);
        setTop(newTop);
    };

    const zoomOut = () => {
        setLeft(null);
        setRight(null);
        setTop('auto');
        setBottom('auto');
        setRefAreaLeft('');
        setRefAreaRight('');
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!chartRef.current) return;
        const scrollAmount = 100;
        chartRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    if (dailyConsumption.length === 0) {
        return <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <p className="text-gray-400 text-sm mt-2">
                No historical data available for this bed
            </p>
        </div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                    <History className="w-5 h-5 mr-2 text-blue-400" />
                    Historical Consumption
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="flex items-center px-3 py-1 bg-custome-green-300 dark:bg-gray-700 rounded-md dark:text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                        <ArrowUpDown className="w-4 h-4 mr-1" />
                        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
                    </button>
                    <ChartControls
                        onZoomOut={zoomOut}
                        onScrollLeft={() => scroll('left')}
                        onScrollRight={() => scroll('right')}
                    />
                </div>
            </div>

            <div className="h-64 overflow-x-auto" ref={chartRef}>
                <div className="min-w-[800px] h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            onMouseDown={e => e && setRefAreaLeft(e.activeLabel || '')}
                            onMouseMove={e => refAreaLeft && e && setRefAreaRight(e.activeLabel || '')}
                            onMouseUp={zoom}
                            margin={{ left: 60, right: 20, top: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                                dataKey="date"
                                stroke="#9CA3AF"
                                tick={{ fill: '#9CA3AF' }}
                                domain={[left || 'auto', right || 'auto']}
                                allowDataOverflow
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                tick={{ fill: '#9CA3AF' }}
                                label={{
                                    value: 'Total Consumption (L)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    fill: '#9CA3AF',
                                    offset: -45,
                                    dy: 70
                                }}
                                domain={[bottom || 'auto', top || 'auto']}
                                allowDataOverflow
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                                labelStyle={{ color: '#9CA3AF' }}
                            />
                            <Bar dataKey="consumption" fill="#60A5FA" />
                            {refAreaLeft && refAreaRight && (
                                <ReferenceArea
                                    x1={refAreaLeft}
                                    x2={refAreaRight}
                                    strokeOpacity={0.3}
                                    fill="#60A5FA"
                                    fillOpacity={0.3}
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
                Drag to zoom: Click and drag horizontally to zoom into a specific time range
            </p>

            {/* <div className="overflow-x-auto mt-6">
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
                                key={day.date.toISOString()}
                                className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-750' : ''
                                    }`}
                            >
                                <td className="py-3 px-4 text-gray-300">
                                    {format(day.date, 'MMM dd, yyyy')}
                                </td>
                                <td className="py-3 px-4 text-gray-300">
                                    {day.totalConsumption.toLocaleString()} L
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div> */}
        </div>
    );
};