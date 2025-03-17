export interface OxygenReading {
    timestamp: Date;
    flowRate: number;
}

export interface DailyConsumption {
    date: string;
    totalConsumption: number;
}

export interface BedDetails {
    bedNumber: string;
    department: string;
    currentFlowRate: number;
    lastUpdated: Date;
    recentReadings: OxygenReading[];
    dailyConsumption: DailyConsumption[];
}