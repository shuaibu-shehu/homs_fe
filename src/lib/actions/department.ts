'use server'

import { z } from "zod"
import {http, httpWithBearer}  from "./http"
import { AddDepartmentSchema } from "../types"
// import { signOut } from"@/auth"
// import { getAccessToken  } from "../auth"
// const $http = http

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
    } catch (error) {
        if(error && error.status === 403) {
            return { success: false, message: error.response.data.detail.error, status: error.response.status }
        }
        
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
    } catch (error) {
        if(error && error.status === 403) {
            return { success: false, message: error.response.data.detail.error, status: error.response.status }
        }
        
    }
}
