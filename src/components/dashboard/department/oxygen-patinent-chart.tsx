'use client'

import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Function to generate dates for the last 30 days
const generateDates = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        data.push({
            time: date.toLocaleDateString('en-US', { 
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            }),
            patients: Math.floor(Math.random() * 50) + 10, // Random data between 10-60
            oxygenConsumption: Math.floor(Math.random() * 30) + 5, // Random data between 5-35
        });
    }
    return data;
};

const fullData = generateDates();
const ITEMS_PER_PAGE = 7; // Show a week of data at a time

const OxygenPerPatientChart = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(fullData.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const visibleData = fullData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <ResponsiveContainer className={"m-3 max-w-[800px] rounded-lg bg-white"} height={400}>
                <BarChart
                    data={visibleData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 25 }} // Increased bottom margin
                    barSize={28}
                    barGap={10}
                    barCategoryGap={20}
                >
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '12px' }}
                        angle={-45} // Angle the date text
                        textAnchor="end" // Align the rotated text
                        height={60} // Increase height to accommodate angled text
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                    <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '12px' }}
                    />
                    <Bar
                        dataKey="patients"
                        fill="#00ff00"
                        name="Patients"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="oxygenConsumption"
                        fill="#90EE90"
                        name="Oxygen Consumption"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded ${currentPage === 0
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                >
                    Previous
                </button>
                <span className="text-sm">
                    Week {currentPage + 1} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className={`px-4 py-2 rounded ${currentPage === totalPages - 1
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OxygenPerPatientChart;