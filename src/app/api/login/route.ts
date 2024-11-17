"use server"
import { setRefreshToken, setToken } from '@/lib/auth'
import { NextResponse } from 'next/server'
// import { Calls } from "./axios";
import { Calls } from '@/lib/actions/axios'


const url = process.env.API_URL

const $http = Calls(url)

export async function POST(request: Request) {
    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData)
   
    const response = await $http.post("auth/login", jsonData) 
    const responseData = await response.data
    console.log("response: ", response.data);
    
    if (response.data) {
        console.log("logged in")
        const { username, access, refresh } = responseData
        setToken(access)
        setRefreshToken(refresh)
        return NextResponse.json({ "loggedIn": true, "username": username }, { status: 200 })
    }
    return NextResponse.json({ "loggedIn": false, ...responseData }, { status: 400 })
}   