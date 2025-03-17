'use client';

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RealTimeOxygenConsumption = () => {
    const [chartData, setChartData] = useState({
        labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
        datasets: [
            {
                label: 'Oxygen Consumption (L/min)',
                data: [5, 10, 15, 8], // Initial mock data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const mockData = [
                Math.floor(Math.random() * 20), // Mock data for Cardiology
                Math.floor(Math.random() * 15), // Mock data for Neurology
                Math.floor(Math.random() * 25), // Mock data for Orthopedics
                Math.floor(Math.random() * 10), // Mock data for Pediatrics
            ];

            setChartData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: mockData,
                    },
                ],
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Real-Time Oxygen Consumption by Department',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Departments',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Oxygen Consumption (L/min)',
                },
                beginAtZero: true,
            },
        },
    };

    return <div className="p-4 bg-white dark:bg-gray-800 rounded-lg w-[100%]  shadow-md">
    <Bar className='w-full' data={chartData} options={options} />;
</div>
};

export default RealTimeOxygenConsumption;
