'use server'

import { Calls, CallsWithBearer } from "./axios";
import { getAccessToken } from "../auth";

const url = process.env.API_URL!

export const http = Calls(url)

export const httpWithBearer =async () => {
    const token = await getAccessToken()
    console.log("token: ", token);
    
    return CallsWithBearer(url, token!)
} 