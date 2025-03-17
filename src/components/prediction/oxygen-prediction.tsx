'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type PredictionType = 'short-term' | 'long-term'

export default function OxygenPredictionForm() {
    const [predictionType, setPredictionType] = useState<PredictionType>('short-term')
    const [predictionDate, setPredictionDate] = useState<Date>(new Date())
    const [shortTermPrediction, setShortTermPrediction] = useState<number | null>(null)
    const [longTermPrediction, setLongTermPrediction] = useState<number | null>(null)
    const [shortTermChartData, setShortTermChartData] = useState<{ time: string; consumption: number }[]>([])
    const [longTermChartData, setLongTermChartData] = useState<{ time: string; consumption: number }[]>([])

    const handlePredict = () => {
        // Generate random base prediction
        const basePrediction = Math.random() * 10 + 5 // Random value between 5 and 15

        if (predictionType === 'short-term') {
            setShortTermPrediction(basePrediction)
            // Generate mock short-term chart data (24 hours)
            const newShortTermData = Array.from({ length: 24 }, (_, i) => ({
                time: `${i}:00`,
                consumption: basePrediction * (1 + Math.random() * 0.4 - 0.2) // Random fluctuation ±20%
            }))
            setShortTermChartData(newShortTermData)
        } else {
            setLongTermPrediction(basePrediction * 1.5)
            // Generate mock long-term chart data (30 days)
            const newLongTermData = Array.from({ length: 30 }, (_, i) => ({
                time: `Day ${i + 1}`,
                consumption: basePrediction * (1.5 + i * 0.05 + Math.random() * 0.2 - 0.1) // Increasing trend with random fluctuation
            }))
            setLongTermChartData(newLongTermData)
        }
    }

    return (
        <Card className="w-full bg-transparent  max-w-5xl dark:bg-gray-800 text-gray-100">
            <CardHeader>
                <CardTitle className="text-2xl">Oxygen Consumption Predictor</CardTitle>
            </CardHeader>
            <CardContent className='max-w-2xl mx-auto'>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="predictionType">Prediction Type</Label>
                            <Select onValueChange={(value: PredictionType) => setPredictionType(value)}>
                                <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
                                    <SelectValue placeholder="Select prediction type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="short-term">Short-Term</SelectItem>
                                    <SelectItem value="long-term">Long-Term</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="predictionDate">Prediction Date</Label>
                            <DateTimePicker
                                date={predictionDate}
                                setDate={setPredictionDate}
                                className="bg-gray-700 text-gray-100 border-gray-600"
                            />
                        </div>
                    </div>
                    <Button onClick={handlePredict} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Generate Oxygen Consumption Prediction
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-6">
                {shortTermPrediction !== null && predictionType === 'short-term' && (
                    <div className="w-full space-y-4">
                        <h3 className="text-xl font-semibold">Short-Term Prediction</h3>
                        <p className="text-lg">
                            Predicted Oxygen Consumption: <span className="font-bold text-blue-400">{shortTermPrediction.toFixed(2)} L/min</span>
                        </p>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={shortTermChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="time" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                                    <Line type="monotone" dataKey="consumption" stroke="#8884d8" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
                {longTermPrediction !== null && predictionType === 'long-term' && (
                    <div className="w-full space-y-4">
                        <h3 className="text-xl font-semibold">Long-Term Prediction</h3>
                        <p className="text-lg">
                            Predicted Oxygen Consumption: <span className="font-bold text-blue-400">{longTermPrediction.toFixed(2)} L/min</span>
                        </p>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={longTermChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="time" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                                    <Line type="monotone" dataKey="consumption" stroke="#22c55e" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

