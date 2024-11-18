import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const OxygenPieChart = () => {
    // Aggregated or focused data (e.g., total usage or usage at a specific time)
    const totalUsage = {
        ICU: 105, // Example: Total or average usage
        Pediatrics: 90,
        Surgery: 20,
        Radiology: 35,
        Pharmacy: 55,
    };

    // Pie Chart data
    const data = {
        labels: ['ICU', 'Pediatrics', 'Surgery', 'Radiology', 'Pharmacy'],
        datasets: [
            {
                label: 'Oxygen Consumption by Department',
                data: Object.values(totalUsage),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // ICU
                    'rgba(54, 162, 235, 0.6)', // Pediatrics
                    'rgba(255, 159, 64, 0.6)', // Surgery
                    'rgba(153, 102, 255, 0.6)', // Radiology
                    'rgba(75, 192, 192, 0.6)', // Pharmacy
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        const value = tooltipItem.raw;
                        return `${tooltipItem.label}: ${value} liters`;
                    },
                },
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-lg max-w-[300px]  shadow-md">
            <h2 className="text-center text-lg font-semibold mb-4">
                Oxygen Consumption by Department
            </h2>
            {/* Pie Chart */}
            <Pie data={data} options={options} />
        </div>
    );
};

export default OxygenPieChart;
