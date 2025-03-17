import React, { useState } from 'react';
import { ClipboardEdit, AlertCircle } from 'lucide-react';

export const ManualEntry: React.FC<{ sendManualData: (data: any) => void }> = ({ sendManualData }) => {
    const [flowRate, setFlowRate] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [totalConsumption, setTotalConsumption] = useState<number | null>(null);

    const calculateConsumption = () => {
        const rate = parseFloat(flowRate);
        const mins = parseFloat(duration);

        if (isNaN(rate) || isNaN(mins)) {
            setError('Please enter valid numbers');
            return;
        }

        if (rate < 0 || mins < 0) {
            setError('Values cannot be negative');
            return;
        }

        setError('');
        const consumption = rate * mins;
        setTotalConsumption(consumption);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (totalConsumption === null) {
            setError('Please calculate consumption first');
            return;
        }
        // Handle submission logic here

        sendManualData({ oxygen_flow: flowRate, duration: duration, total_consumption: totalConsumption });
        console.log("sendManualData ",{ oxygen_flow: flowRate, duration: duration, total_consumption: totalConsumption });
        
    };


    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <ClipboardEdit className="w-5 h-5 mr-2 text-blue-400" />
                Manual Data Entry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 mb-1">
                            Flow Rate (L/min)
                        </label>
                        <input
                            type="number"
                            value={flowRate}
                            onChange={(e) => setFlowRate(e.target.value)}
                            className="w-full dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-custome-green-300 dark:focus:ring-blue-500 focus:outline-none"
                            step="0.1"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">
                            Duration (minutes)
                        </label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-custome-green-300 dark:focus:ring-blue-500 focus:outline-none"
                            min="0"
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {error}
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={calculateConsumption}
                        className="px-4 py-2 bg-custome-green-300 dark:bg-gray-700 rounded-md hover:bg-custome-green-500 text-white dark:hover:bg-gray-600 transition-colors"
                    >
                        Calculate
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Log Data
                    </button>
                </div>

                {totalConsumption !== null && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                        <span className="text-gray-400">Total Consumption:</span>
                        <span className="ml-2 text-white font-semibold">
                            {totalConsumption.toFixed(2)} L
                        </span>
                    </div>
                )}
            </form>
        </div>
    );
};