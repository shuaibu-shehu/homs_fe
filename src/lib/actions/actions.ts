'use server'

import { Calls } from "./axios";
import { HospitalOnboardingSchema } from "../types";
import { z } from "zod";
import { AxiosError } from "axios";



const url = process.env.API_URL

const $http = Calls(url)


export const actionAddHospital = async (values:z.infer<typeof HospitalOnboardingSchema>) => { 
    try {
        const data = {
            "name": values.hospitalName,
            "address": values.address,
            "contact_number": values.contactNumber,
            "contact_person": values.contactPerson,
            "email": values.email,
            "city": values.city,
            "state": values.state,
            "country": values.country
        }
        
        const response = await $http.post('/hospital/onboard', data)
        console.log("response: ", response.data)
        if (response.status === 201) {
            return { success:true, ...response.data, status: response.status }
        }
    } catch (error: AxiosError | any) {
        if (error.response) {
            return { success: false, ...error.response.data, status: error.response.status };
        } else {
            // Handle cases where error.response is undefined (e.g., network error)
            return { success: false, message: "Oops! Something went wrong", status: 500 };
        }
        // return { success: false, ...error.response.data, status: error.response.status }
    }
} 