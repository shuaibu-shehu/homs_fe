"use client"

import * as React from "react"
// import { useTheme } from "next-themes"


import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { setTheme } = useTheme()
    const [isDarkMode, setIsDarkMode] = React.useState(false)
    return (
        <div className="flex items-center lg:space-x-2">
            <Label className="text-gray-400 hidden lg:block" htmlFor="airplane-mode">Dark Mode</Label>
            <Switch
                checked={isDarkMode}
                onCheckedChange={() => {
                    setTheme(isDarkMode ? "light" : "dark")
                    setIsDarkMode(!isDarkMode)
                }}
                id="airplane-mode" />
        </div>
    )

}
