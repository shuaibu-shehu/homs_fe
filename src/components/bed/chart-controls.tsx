import React from 'react';
import { ChevronLeft, ChevronRight, ZoomOut } from 'lucide-react';

interface ChartControlsProps {
    onZoomOut: () => void;
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({
    onZoomOut,
    onScrollLeft,
    onScrollRight,
}) => {
    return (
        <div className="flex space-x-2">
            <button
                onClick={onScrollLeft}
                className="flex items-center px-3 py-1 bg-custome-green-300 dark:bg-gray-700 rounded-md dark:text-gray-300 hover:bg-gray-600 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                onClick={onScrollRight}
                className="flex items-center px-3 py-1 bg-custome-green-300 dark:bg-gray-700 rounded-md dark:text-gray-300 hover:bg-gray-600 transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
            <button
                onClick={onZoomOut}
                className="flex items-center px-3 py-1 bg-custome-green-300 dark:bg-gray-700 rounded-md dark:text-gray-300 hover:bg-gray-600 transition-colors"
            >
                <ZoomOut className="w-4 h-4 mr-1" />
                Reset Zoom
            </button>
        </div>
    );
};