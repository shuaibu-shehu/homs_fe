import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";  
import { FormSchema } from "@/lib/types";

export default {
providers:[
    Credentials({
        async authorize(credentials){
            const validatefields=FormSchema.safeParse(credentials);
            if(validatefields.success){
                const {email, password}=validatefields.data;
                const user= await getUserByEmail(email);
                if(user){
                    const verifyPassword= user.password ? await bcrypt.compare(password, user.password): false;
                    if(verifyPassword){
                        return user;
                    }
                }
            }
            return null
        }
    })
]
} satisfies NextAuthConfig