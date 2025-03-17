'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBedStore } from "@/hooks/bed-store";
import { Users, Droplet } from 'lucide-react'

export default function OverviewCards({ totalTodaysConsumption}: { totalTodaysConsumption: number}) {
   const { beds } = useBedStore();
        
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className='dark:bg-gray-800 border-none'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Beds</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{ beds?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">today</p>
                </CardContent>
            </Card>
            <Card className='dark:bg-gray-800 border-none'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Oxygen Consumption</CardTitle>
                    <Droplet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalTodaysConsumption || 0} L</div>
                    <p className="text-xs text-muted-foreground">today</p>
                </CardContent>
            </Card>
          
        </div>
    )
}

