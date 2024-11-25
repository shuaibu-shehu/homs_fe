'use server'

import {  z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "../types";
import { Calls } from "./axios";
import { signIn } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";
import { AxiosError } from "axios";
// import { setRefreshToken, setToken } from "../auth";

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

        console.log("signup response: ", response.data);
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
        console.log("response: ", response.data);
        if (response.data.success) {
            return response.data as { success: boolean, message: string };
        }
    } catch (error) {
        console.log("error: ", error.response.data.detail);
        
        if (error instanceof AxiosError && error.response) {
            return { success: false, message: error.response.data.detail.error };
        } else {
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const actionLoginInUser = async (values: z.infer<typeof LoginFormSchema>) => {
    const validateFields = LoginFormSchema.safeParse(values);

    if (!validateFields.success) {
        return { message: "Invalid data", success: false};
    }

    try {
        
    const { email, password } = validateFields.data;
        const response = await $http.post(`/auth/login`,

            {
                email: email,
                password: password
            }
        );

        console.log("response in action: ", response.data);
        const redirecUrl = "/" + response.data.user.role.toLowerCase();
        
        console.log("redirecUrl: ", redirecUrl);
        

        if (response.data.success) {
            await signIn('credentials',
                {
                    email,
                    password,
                    redirectTo: redirecUrl
                });
            }
            console.log("complete");
            

    } catch (error) {
        console.log("error: ", error);
        
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




// const hashedPassword= await bcrypt.hash(password, 10);
// if(existingUser){
//     return {error:"Email in use", success:null, twoFactor: null};
// }

// await db.user.create({
//     data:{
//         name,
//         email,
//         password: hashedPassword,
//     }
// })

// const verificationToken = await generateVerificationToken(email)

//TODO: send verification token emain
// await sendVerificationEmail(verificationToken.email,verificationToken.token);
