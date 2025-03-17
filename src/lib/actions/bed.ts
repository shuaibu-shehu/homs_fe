'use server'

import { httpWithBearer } from "./http"
import { AxiosError } from "axios";


export const getBeds = async (departmentId: string) => {
    const $httpWithBearer = await httpWithBearer()
    try {
        const response = await $httpWithBearer.get(`/beds/${departmentId}`)
        if (response?.data?.success){
            return { success: true, data: response.data.data }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error.response?.data.message }
        }
    }
}


export const getOxygenConsumption = async (departmentId: string, startDate: string, endDate: string) => {
    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);
    const $httpWithBearer = await httpWithBearer()
    try {
        const response = await $httpWithBearer.get (`/beds/oxygen-consumption/${departmentId}?start_date=${startDate}&end_date=${endDate}`)
        console.log("response: ", response);
        if (response?.data?.success) {
            return { success: true, data: response.data.data }
        }
    } catch (error) {
        console.log("error: ", error);
        if (error instanceof AxiosError) {
            return { success: false, message: error.response?.data.message }
        }
    }
}
    

export const deleteBed = async (bedId: string) => {
    const $httpWithBearer = await httpWithBearer()
    try {
        const response = await $httpWithBearer.delete(`/beds/${bedId}`)
        if (response?.data?.success) {
            return { success: true, message: response.data.message }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error.response?.data.message }
        }
    }
}


export const getSensorReadingOftheDay = async (bedId: string, date: string) => {
    try {
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.get(`/beds/${bedId}/sensor?date=${date}`)
        return { success: true, data: response.data.data }
    } catch (error) {
        console.log("error: ", error);
        if (error instanceof AxiosError) {
            return { success: false, message: error.response?.data.message }
        }
    }
}


export const getDailyConsumption = async (bedId: string) => {
    try {
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.get(`/beds/${bedId}/daily-consumption`)
        if (response?.data?.success) {
            return { success: true, data: response.data.data }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error.response?.data.message }
        }
    }
}


export const getTodaysConsumptionByDepartment = async (departmentId: string, date: string = new Date().toISOString().split('T')[0]) => {
    try {
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.get(`/beds/${departmentId}/today/${date}`)
        console.log("response: ", response);
        if (response?.data?.success) {
            return { success: true, data: response.data.data }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error.response?.data.message }
        }
    }
}



export async function getDailyConsumptionsByDepartment(departmentId: string) {
    console.log("departmentId: ", departmentId);
    try {
        const $httpWithBearer = await httpWithBearer()
        const response = await $httpWithBearer.get(`/beds/total-consumption/${departmentId}`)
        console.log("response: ", response);
        
        return response.data
    } catch (error) {
        console.log("error: ", error);
    }
} 
