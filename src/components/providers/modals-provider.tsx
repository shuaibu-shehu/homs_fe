'use client'

import { useEffect } from "react"
import AddDepartmentModal from "../modals/add-department-modal"
import React from "react"
import AddStaffModal from "../modals/add-staff-modal"
import DeleteDepartmentModal from "../modals/delete-department-modal"

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
            <DeleteDepartmentModal />
            <AddDepartmentModal />
           <AddStaffModal/>
        </>
    )
}