'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const generateData = () => {
    const data = []
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 2)

    const baseConsumption = 800
    const trend = 2 // Slight upward trend

    for (let i = 0; i < 60; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)

        const fluctuation = Math.sin(i / 7) * 50 // Weekly cycle
        const randomness = Math.random() * 30 - 15 // Daily randomness
        const consumption = Math.floor(baseConsumption + fluctuation + randomness + (i * trend))

        data.push({
            date: date.toISOString().split('T')[0],
            consumption: Math.max(700, Math.min(1100, consumption))
        })
    }
    return data
}

const oxygenConsumptionData = generateData()

export default function OxygenConsumptionChart() {
    const [startIndex, setStartIndex] = useState(0)
    const [visibleDataPoints, setVisibleDataPoints] = useState(14)

    const updateVisibleDataPoints = useCallback(() => {
        const width = window.innerWidth
        if (width < 640) { // Mobile
            setVisibleDataPoints(7)
        } else if (width < 1024) { // Tablet
            setVisibleDataPoints(14)
        } else { // Desktop
            setVisibleDataPoints(30)
        }
    }, [])

    useEffect(() => {
        updateVisibleDataPoints()
        window.addEventListener('resize', updateVisibleDataPoints)
        return () => window.removeEventListener('resize', updateVisibleDataPoints)
    }, [updateVisibleDataPoints])

    const handleScroll = useCallback((direction: number) => {
        setStartIndex((prevIndex) => {
            const newIndex = prevIndex + direction * Math.floor(visibleDataPoints / 2)
            return Math.max(0, Math.min(newIndex, oxygenConsumptionData.length - visibleDataPoints))
        })
    }, [visibleDataPoints])

    return (
        <Card className="w-full max-w-[800px]   justify-center items-center">
            <CardHeader>
                <CardTitle>Oxygen Consumption - Last Two Months</CardTitle>
                <CardDescription>Daily oxygen consumption in the Pulmonology Department</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-[300px] sm:h-[400px] w-full sm:max-w-[800px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={oxygenConsumptionData.slice(startIndex, startIndex + visibleDataPoints)}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 10 }}
                                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                interval={'preserveStartEnd'}
                            />
                            <YAxis
                                tick={{ fontSize: 10 }}
                                label={{ value: 'Consumption (L)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                                domain={[700, 1100]}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <p className="text-xs font-semibold">{new Date(label).toLocaleDateString()}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Consumption: <span className="font-medium">{payload[0].value} L</span>
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="consumption"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={false}
                                name="Oxygen Consumption (L)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleScroll(-1)}
                            disabled={startIndex === 0}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Scroll left</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleScroll(1)}
                            disabled={startIndex + visibleDataPoints >= oxygenConsumptionData.length}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Scroll right</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}