'use server'

import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "../types";
import { Calls } from "./axios";
import { signIn } from "../../auth";
// import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";
import { AxiosError } from "axios";
// import { redirect } from "next/navigation";


const url = process.env.API_URL;
const $http = Calls(url);

export const actionSignUpUser = async (values: z.infer<typeof SignUpFormSchema>) => {
    try {
        const validateFields = SignUpFormSchema.safeParse(values);

        if (!validateFields.success) {
            return { error: "Invalid data", success: null, twoFactor: null };
        }

        const { name: username, email, password } = validateFields.data;

        const response = await $http.post('/auth/signup', { username, email, password });

        if (response.data.success) {
            return { data: response.data.data, message: response.data.message };
        }

    } catch (error) {
        // console.log("from erro: ",);
        if (error instanceof AxiosError && error.response) {
            return { error: error.response.data.detail };
        } else {
            return { error: "An unknown error occurred" };
        }

    }

}


export const newVerification = async (token: string) => {
    try {

        const response = await $http.get(`/auth/verify`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.data.success) {
            return response.data as { success: boolean, message: string };
        }
    } catch (error) {

        if (error instanceof AxiosError && error.response) {
            console.log("error from catch: ", error.response.data.detail);
            
            return { success: false, message: error.response.data.detail };
        } else {
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const actionLoginInUser = async (values: z.infer<typeof LoginFormSchema>) => {
   
    const validateFields = LoginFormSchema.safeParse(values);

    if (!validateFields.success) {
        return { message: "Invalid data", success: false };
    }

    try {

        const { email, password } = validateFields.data;
        
        const response = await $http.post(`/auth/login`,

            {
                email: email,
                password: password
            }
        );

        if (response.data.success) {

            const signInResponse = await signIn('credentials',
                {
                    email,
                    password,
                    redirect: false
                });
            
            if (!signInResponse?.error) {                
                return { success: true, message: "Login successful", data: response.data.user };
            }

        }
    } catch (error) {
        console.log("error from catch: ", error);

        if (error instanceof AuthError) {
            console.log("error authErro: ", error);
            switch (error.type) {

                case "CredentialsSignin":
                    return { message: "Invalid credentials", success: false };
                default:
                    return { message: "Something went wrong", success: false };
            }
        }
        return { message: "Something went wrong", success: false };
    }
}
