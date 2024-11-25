import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Droplet } from 'lucide-react'

export default function OverviewCards({dailyOxygenConsumption}: {dailyOxygenConsumption: any}) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{dailyOxygenConsumption?.patients_count || 0}</div>
                    <p className="text-xs text-muted-foreground">today</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Oxygen Consumption</CardTitle>
                    <Droplet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{dailyOxygenConsumption?.total_consumption || 0} L</div>
                    <p className="text-xs text-muted-foreground">today</p>
                </CardContent>
            </Card>
          
        </div>
    )
}

