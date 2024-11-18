import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const OxygenGraph = () => {
    // Sample data
    const overallData = [200, 220, 210, 230]; // Total hospital usage
    const icuData = [100, 110, 105, 115];
    const pediatricsData = [80, 90, 85, 95];
    const surgeryData = [20, 20, 20, 20];
    const radiologyData = [30, 35, 40, 45];
    const pharmacyData = [50, 55, 60, 65];

    const [showOverall, setShowOverall] = useState(true);

    // Chart data
    const data = {
        labels: ['12:00 AM', '6:00 AM', '12:00 PM', '6:00 PM'], // Time intervals
        datasets: showOverall
            ? [
                {
                    label: 'Overall Hospital',
                    data: overallData,
                    backgroundColor: 'rgba(0, 128, 0, 0.6)',
                    borderColor: 'green',
                    borderWidth: 1,
                },
            ]
            : [
                {
                    label: 'ICU',
                    data: icuData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'red',
                    borderWidth: 1,
                },
                {
                    label: 'Pediatrics',
                    data: pediatricsData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'blue',
                    borderWidth: 1,
                },
                {
                    label: 'Surgery',
                    data: surgeryData,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'orange',
                    borderWidth: 1,
                },
                {
                    label: 'Radiology',
                    data: radiologyData,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'purple',
                    borderWidth: 1,
                },
                {
                    label: 'Pharmacy',
                    data: pharmacyData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'teal',
                    borderWidth: 1,
                },
            ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4 bg-green rounded-lg w-[100%]  shadow-md">
            {/* Toggle Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowOverall(!showOverall)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {showOverall ? 'View By Department' : 'View Overall'}
                </button>
            </div>

            {/* Chart */}
            <Bar data={data} options={options} />
        </div>
    );
};

export default OxygenGraph;
