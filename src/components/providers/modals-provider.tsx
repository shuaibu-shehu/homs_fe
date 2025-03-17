'use client'

import { useEffect } from "react"
import AddDepartmentModal from "../modals/add-department-modal"
import React from "react"
import AddStaffModal from "../modals/add-staff-modal"
import DeleteDepartmentModal from "../modals/delete-department-modal"
import DeleteStaffModal from "../modals/delete-staff-modal"
import AddOxygenEntryModal from "../modals/add-oxygen-entry-modal"
import DeleteOxygenEntryModal from "../modals/delete-oxygen-entry-modal"
import AddBedModal from "../modals/add-bed-modal"
import DeleteBedModal from "../modals/delete-bed-modal"

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
            <DeleteStaffModal />
            <AddDepartmentModal />
            <AddStaffModal />
            <AddOxygenEntryModal />
            <DeleteOxygenEntryModal />
            <AddBedModal />
            <DeleteBedModal />
        </>
    )
}