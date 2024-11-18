'use client'

import { useEffect } from "react"
import AddDepartmentModal from "../modals/add-department-modal"
import React from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <AddDepartmentModal />
           
        </>
    )
}