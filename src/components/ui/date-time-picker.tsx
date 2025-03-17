'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DateTimePickerProps {
    date: Date
    setDate: (date: Date) => void
    className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP HH:mm') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                />
                <div className="flex items-center justify-center p-2 border-t border-gray-600">
                    <Select
                        value={date.getHours().toString()}
                        onValueChange={(value) => {
                            const newDate = new Date(date)
                            newDate.setHours(parseInt(value))
                            setDate(newDate)
                        }}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="mx-2">:</span>
                    <Select
                        value={date.getMinutes().toString()}
                        onValueChange={(value) => {
                            const newDate = new Date(date)
                            newDate.setMinutes(parseInt(value))
                            setDate(newDate)
                        }}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                            {minuteOptions.map((minute) => (
                                <SelectItem key={minute} value={minute.toString()}>
                                    {minute.toString().padStart(2, '0')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    )
}

