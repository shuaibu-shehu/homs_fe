import { useEffect, useState } from "react"

import React from 'react'

function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])
  return (
      <div>
          <p className="text-sm text-gray-600">
              {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </p>
    </div>
  )
}

export default CurrentTime