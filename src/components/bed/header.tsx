import React from 'react';
import { Bed, Activity } from 'lucide-react';

interface HeaderProps {
    bedNumber: string;
    department: string;
    type: 'sensor' | 'manual';
    onTypeChange: (type: 'sensor' | 'manual') => void;
    dailyConsumption: any;
}

export const Header: React.FC<HeaderProps> = ({ bedNumber, department, type, onTypeChange, dailyConsumption }) => {
    const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onTypeChange(e.target.value as 'sensor' | 'manual');
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Bed className="w-8 h-8 text-blue-400" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bed {bedNumber}</h1>
                        <p className="text-gray-400 dark:text-gray-400">{department}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <select className="bg-gray-700 text-white rounded-md px-3 py-1" value={type} onChange={handleMethodChange}>
                        <option value="sensor">Sensor</option>
                        <option value="manual">Manual</option>
                    </select>
                    <div className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-green-400" />
                        <span className="text-green-400">Monitoring Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};