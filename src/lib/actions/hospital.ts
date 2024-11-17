'use server'

import { Calls } from "./axios";
// import { HospitalOnboardingSchema } from "../types";
// import { z } from "zod";
import { AxiosError } from "axios";
import { getAccessToken } from '@/lib/auth';






const url = process.env.API_URL

const $http = Calls(url)

// const token = await  currentUser()
export const getUsers = async () => {
    try {
        const token = await getAccessToken()
        // console.log(token);
        
        const response = await $http.get(`/hospital/users`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("response: ", response.data);
        if (response.data.success) {
            return response.data as { success: boolean, message: string };
        }
    } catch (error) {
        
        console.log("error: ", error);
        
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail };
        } else {
            return { success: false, message: "An unknown error occurred" };
        }
    }
}