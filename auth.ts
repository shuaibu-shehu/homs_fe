import NextAuth from "next-auth"
import authCongig from "./auth.config"
import { getUserById } from "./data/user"
// import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationbyUserId } from "./data/two-factor-confirmation"



export const { handlers:{GET, POST},signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      console.log(user);
      
      //Allow 0Auth
      if(account?.provider!=="credentials") return true

       
      const existingUser= await getUserById(user.id!);
      // prevent sign in without email verification
       if(!existingUser || !existingUser.emailVerified){
        return false
      }

      if(existingUser.isFactorEnabled){

         const twoFactorTokenConfirmation = await getTwoFactorConfirmationbyUserId(existingUser.id) 
          
         if(!twoFactorTokenConfirmation) return false
          
         // Delete the two factor token confirmation
         await db.twoFactorConfirmation.delete({
           where:{
             id: twoFactorTokenConfirmation.id
           }
         })
        }
      return true
      },
    async session({ session, token }) {
      if(token.sub && session.user){
        session.user.id = token.sub
      }

      if(session.user && token.role){

        session.user.role=token.role 
      }
      if(session.user){
        session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean
        session.user.image=token.image as string
      }
      return session
    },
    async jwt({ token }) {

      if(!token.sub) return token
      const existingUser= await getUserById(token.sub)

      if(existingUser){
        token.role=existingUser.role
        token.isTwoFactorEnabled=existingUser.isFactorEnabled
        token.image=existingUser.image
      }

      return token
  }
}, 
  session: { strategy: "jwt"},
  ...authCongig,
})