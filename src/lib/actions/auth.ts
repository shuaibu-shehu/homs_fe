'use server'

import { z } from "zod";
import { SignUpFormSchema } from "../types";
import { Calls } from "./axios";

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

        console.log("signup response: ",response.data);
        if (response.data.success) { 
            return { data:response.data.data, message:response.data.message };
        } 

    } catch (error) {
        // console.log("from erro: ",);
        return { error: error.response.data.detail }
        
    }
   
}

export const newVerification = async (tokenId: string) => { 
    try {
        const response = await $http.get(`/auth/verify?tokenId=${tokenId}`);
        console.log("response: ",response.data);
        if (response.data.success) {
            return { success: response.data.message }
        }
    } catch (error) {
        return { error: error.response.data.detail }
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
