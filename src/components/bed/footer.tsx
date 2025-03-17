import React from 'react';
import { Wifi, Database, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mt-6">
            <div className="flex justify-between items-center text-sm">
                <div className="flex space-x-6">
                    <div className="flex items-center text-green-400">
                        <Wifi className="w-4 h-4 mr-1" />
                        Sensor Connected
                    </div>
                    <div className="flex items-center text-blue-400">
                        <Database className="w-4 h-4 mr-1" />
                        Data Sync Active
                    </div>
                    <div className="flex items-center text-purple-400">
                        <Activity className="w-4 h-4 mr-1" />
                        System Healthy
                    </div>
                </div>
                <div className="text-gray-400">
                    Last sync: {new Date().toLocaleTimeString()}
                </div>
            </div>
        </footer>
    );
};