import { useState, useEffect } from 'react';
import { OxygenReading } from '@/lib/types/bed';
import { getSensorReadingOftheDay } from '@/lib/actions/bed';
import { Bed } from './bed-store';

interface WebSocketState {
    connected: boolean;
    currentFlowRate: number;
    lastUpdated: Date | null;
    recentReadings: OxygenReading[];

}

export const useWebSocket = (bed: Bed) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [state, setState] = useState<WebSocketState>({
        connected: false,
        currentFlowRate: 0,
        lastUpdated: new Date("00:00:00"),
        recentReadings: []
    });


    // Fetch initial data automatically
    useEffect(() => {
        const fetchSensorReadingOftheDay = async () => {
            const sensorReadingOftheDay = await getSensorReadingOftheDay(bed.id, new Date().toISOString().split('T')[0]);
            if (sensorReadingOftheDay?.success) {
                console.log("sensorReadingOftheDay", sensorReadingOftheDay.data);
                
                setState(prev => ({
                    ...prev,
                    lastUpdated: sensorReadingOftheDay.data[sensorReadingOftheDay.data.length - 1]?.timestamp && new Date(sensorReadingOftheDay.data[sensorReadingOftheDay.data.length - 1]?.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: "UTC"
                    }),
                    currentFlowRate: sensorReadingOftheDay.data[sensorReadingOftheDay.data.length - 1]?.oxygen_flow || 0,
                }));
                
                setState(prev => {
                    const updated: string = sensorReadingOftheDay.data[sensorReadingOftheDay.data.length - 1]?.timestamp && new Date(sensorReadingOftheDay.data[sensorReadingOftheDay.data.length - 1]?.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: "UTC"
                    })
                    
                    
                    const flowRate= sensorReadingOftheDay.data[sensorReadingOftheDay.data.length - 1]?.oxygen_flow || 0
                    return {
                      
                        lastUpdated: updated,
                        currentFlowRate: flowRate,
                        recentReadings: sensorReadingOftheDay.data.map((reading: any) => ({
                            timestamp: reading.timestamp && new Date(reading.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                timeZone: "UTC"
                            }),
                            flowRate: reading.oxygen_flow,
                            duration: reading.duration
                        }))
                    }
                });

                
            }
        };
        
        fetchSensorReadingOftheDay();
    }, [bed.id]);
    
    const startConnection = (type: string) => {
        try {
            const url = type === "sensor" ? `ws://localhost:8888/ws/beds/${bed.sensor_id}` : `ws://localhost:8888/ws/beds/${bed.id}`;   
            const wsInstance = new WebSocket(url);
            setWs(wsInstance);
            
            wsInstance.onopen = () => {
                setState(prev => ({ ...prev, connected: true }));
                console.log('WebSocket connected');
            };

            wsInstance.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("Data from WebSocket:", data);
                    
                    setState(prev => ({
                        ...prev,
                        currentFlowRate: data.oxygen_flow,
                        lastUpdated: data.timestamp && new Date(data.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            timeZone: "UTC"
                        }),
                        recentReadings: [
                            ...prev.recentReadings.slice(-99),
                            {
                                timestamp: data.timestamp && new Date(data.timestamp).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    timeZone: "UTC"
                                }),
                                flowRate: data.oxygen_flow
                            }
                        ]
                    }));
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            };
            
            wsInstance.onclose = () => {
                console.log("WebSocket closed");
                setState(prev => ({ ...prev, connected: false }));
            };
            
            wsInstance.onerror = (error) => {
                console.error("WebSocket error:", error);
                setState(prev => ({ ...prev, connected: false }));
            };
        } catch (error) {
            console.error("Error setting up WebSocket:", error);
        }
    };

    const stopConnection = () => {
        ws?.close();
        setWs(null);
    };
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            ws?.close();
        };
    }, [ws]);

    const sendManualData = (data: any) => {
        if (ws?.readyState === WebSocket.OPEN) {
            console.log("sendManualData from useWebSocket ",{...data, bed_id: bed.id, input_type: 'manual', timestamp: new Date().toISOString()});
            
            ws?.send(JSON.stringify({...data, bed_id: bed.id, input_type: 'manual', timestamp: new Date().toISOString()}));
        }
    }
    
    return {
        ...state,
        startConnection,
        stopConnection,
        sendManualData
    };
}; 