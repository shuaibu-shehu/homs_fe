'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { Droplets, Clock } from 'lucide-react';
import { ChartControls } from './chart-controls';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Bed } from '@/hooks/bed-store';
import { Button } from '@mui/material';
import { ManualEntry } from './manual-entry';


interface RealTimeDataProps {
    bed: Bed;
    type: string;
}


export const RealTimeData = ({ bed, type }: RealTimeDataProps) => {
    const [left, setLeft] = useState<string | null>(null);
    const [right, setRight] = useState<string | null>(null);
    const [refAreaLeft, setRefAreaLeft] = useState<string>('');
    const [refAreaRight, setRefAreaRight] = useState<string>('');
    const [top, setTop] = useState<number | 'auto'>('auto');
    const [bottom, setBottom] = useState<number | 'auto'>('auto');
    const chartRef = useRef<HTMLDivElement>(null);
    const { currentFlowRate, lastUpdated, recentReadings,connected, startConnection, sendManualData } = useWebSocket(bed);
    
useEffect(() => {
    if(type === 'manual'){
        startConnection(type);
    }
}, [type]);
    const chartData = recentReadings.map(reading => ({
        time:reading.timestamp,
        flowRate: reading.flowRate,
    }));

    console.log(chartData);
    

    const getAxisYDomain = (from: string, to: string, offset: number) => {
        const refData = chartData.filter(
            d => new Date(d.time) >= new Date(from) && new Date(d.time) <= new Date(to)
        );
        const [bottom, top] = [
            Math.min(...refData.map(d => d.flowRate)),
            Math.max(...refData.map(d => d.flowRate)),
        ];

        const newBottom = bottom - offset;
        const newTop = top + offset;

        return [newBottom, newTop];
    };

    const zoom = () => {
        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            setRefAreaLeft('');
            setRefAreaRight('');
            return;
        }

        const [newBottom, newTop] = getAxisYDomain(refAreaLeft, refAreaRight, 1);

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


    return (
        <div className="flex flex-col gap-4">
            {type === 'manual' && <ManualEntry
                sendManualData={sendManualData}
            />}

        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-blue-400" />
                    Real-Time Oxygen Flow
                </h2>
                <ChartControls
                    onZoomOut={zoomOut}
                    onScrollLeft={() => scroll('left')}
                    onScrollRight={() => scroll('right')}
                />
            </div>
            {type === 'sensor' && <Button variant="contained" className="text-sm" size="small" color="primary" onClick={() => startConnection(type)}>
                    start
            </Button>}
          
                {connected ? <h1 className="text-green-500 my-3">realtime</h1> : <h1 className="text-red-500">disconnect</h1>}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-custome-green-300 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-gray-200 dark:text-gray-400 mb-1">Current Flow Rate</div>
                    <div className="text-2xl font-bold text-white">{currentFlowRate} L/min</div>
                </div>
                <div className="bg-custome-green-300 dark:bg-gray-700 p-4 rounded-lg ">
                    <div className="text-gray-200 dark:text-gray-400 mb-1 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Last Updated
                    </div>
                    <div className="text-lg text-white">
                        {lastUpdated?.toString() === 'Invalid Date' ? 'N/A' : lastUpdated}
                    </div>
                </div>
            </div>

                {chartData.length>0 && <div className="h-64 overflow-x-auto" ref={chartRef}>
                    <div className="min-w-[1200px] h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                                onMouseDown={e => e && setRefAreaLeft(e.activeLabel || '')}
                                onMouseMove={e => refAreaLeft && e && setRefAreaRight(e.activeLabel || '')}
                                onMouseUp={zoom}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#9CA3AF' }}
                                    domain={[left || 'auto', right || 'auto']}
                                    allowDataOverflow
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#9CA3AF' }}
                                    label={{ value: 'Flow Rate (L/min)', angle: -90, position: 'insideLeft', fill: '#9CA3AF', dy: 60 }}
                                    domain={[bottom || 'auto', top || 'auto']}
                                    allowDataOverflow
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                                    labelStyle={{ color: '#9CA3AF' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="flowRate"
                                    stroke="#60A5FA"
                                    strokeWidth={2}
                                    dot={false}
                                    animationDuration={300}
                                />
                                {refAreaLeft && refAreaRight && (
                                    <ReferenceArea
                                        x1={refAreaLeft}
                                        x2={refAreaRight}
                                        strokeOpacity={0.3}
                                        fill="#60A5FA"
                                        fillOpacity={0.3}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>}
                {chartData.length == 0 && <div className=" flex items-center text-gray-800 justify-center">No records for todays consumption in this bed </div>}
            <p className="text-gray-400 text-sm mt-2">
                Drag to zoom: Click and drag horizontally to zoom into a specific time range
            </p>
        </div>
        </div>
    ); 
};