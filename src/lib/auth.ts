'use server'

import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();
    // console.log("session:", session);
    
    return session?.user;
}
export const currentRole = async () => {
    const session = await auth();

    return session?.user.role;
    
}

// export const userRole = async () => {
//     const session = await auth();

//     return session?.user.role;
// }

export const getAccessToken = async () => {
    const session = await auth();

    return session?.access_token;

}

export const getRefreshToken = async () => {
    const session = await auth();

    return session?.refresh_token;  

}

// export const useAuth = () => {
//     const session = useSession();
//     return session.data.;
// }