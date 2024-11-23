'use server'

import { z } from "zod"
import {httpWithBearer}  from "./http"
import { AddDepartmentSchema, AddStaffSchema } from "../types"
import { AxiosError } from 'axios';


export const addDepartment = async (value: z.infer<typeof AddDepartmentSchema>) => { 
    const $httpWithBearer = await httpWithBearer()
    try {
        
        const response = await $httpWithBearer.post('/departments', value)
        console.log("responsegdf: ", response.data)
        if (response.data.success) {
            return { success: true, ...response.data.message, status: response.status, data: response.data.data }
        } else {
            return { success: false, message: response.data.message }
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail }
        }
        return { success: false, message: "An unexpected error occurred" }
    }
}


export const getDepartmentById = async (id: string) => { 
    const $httpWithBearer = await httpWithBearer()
    try {
        const response = await $httpWithBearer.get(`/departments/${id}`)
        console.log("response: ", response.data)
        if (response.data.success) {
            return { success: true, ...response.data.message, status: response.status, data: response.data.data }
        } else {
            return { success: false, message: response.data.message }
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail }
        }
        return { success: false, message: "An unexpected error occurred" }
    }
}

export const addStaff = async (data: z.infer<typeof AddStaffSchema>, departmentId: string) => { 
    const $httpWithBearer = await httpWithBearer()
    try {

        const response = await $httpWithBearer.post(`/departments/staffs/${departmentId}`, data)
        if (response.data.success) {
            return { success: true, ...response.data.message, status: response.status, data: response.data.data }
        } else {
            return { success: false, message: response.data.message }
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail }
        }
        return { success: false, message: "An unexpected error occurred" }
    }
}


export const getDepartments = async () => {
    try {
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.get(`/departments`)
        // console.log("response: ", response.data)
        return response.data
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail }
        }
        return { success: false, message: "An unexpected error occurred" }
    }
}

export const getUsersInHospital = async (hospitalId: string) => {
    try {
        console.log("hospitalId kljlkjm: ", hospitalId);
        
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.get(`/hospital/users/${hospitalId}`)
        console.log("response users in hospital: ", response.data);
        
        return response.data
        
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail }
        }
        return { success: false, message: "An unexpected error occurred" }
    }   
}



export const deleteDepartment = async (departmentId: string) => {
    try {
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.delete(`/departments/${departmentId}`)
        if (response.data.success) {
            return { success: true, ...response.data.message, status: response.status, data: response.data.data }
        } else {
            return { success: false, message: response.data.message }
        }

    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail }
        }
        return { success: false, message: "An unexpected error occurred" }
    }
}
