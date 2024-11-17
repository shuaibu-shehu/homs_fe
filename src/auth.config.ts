import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";  
import { FormSchema } from "@/lib/types";
import { Calls } from "./lib/actions/axios";

const url = process.env.API_URL

const $http = Calls(url);

export default {

    providers: [
    Credentials({
        async authorize(credentials: Partial<Record<string, unknown>>) {
            console.log("credentials: ",credentials);
            const data = {
                email: credentials?.email as string || '',
                password: credentials?.password as string || ''
            }
            const validatefields=FormSchema.safeParse(data);
            if(validatefields.success){
                
               try {

                    const response = await $http.post('/auth/login', data);
                    
                    console.log("response ", response.data);
                     return {
                         accessToken: response.data.access_token,
                         refreshToken: response.data.refresh_token,
                         email: response.data.user.email,
                         tokenType: response.data.token_type,
                         userId: response.data.user.uid,
                         role: response.data.user.role.toLowerCase(),
                         name: response.data.user.name
                     };
                    
                } catch (error) {
                    console.log("error: ",error);
                    return null
              }
                
            }         
            return null
        }
    })
]
} satisfies NextAuthConfig