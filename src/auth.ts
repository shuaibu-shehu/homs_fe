import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {

      // Allow OAuth or credentials-based login

      // console.log("user from signIn ", user);
      
      if (account?.provider !== "credentials") return true;

      return true;
    },

    async jwt(data) {
      const { user, token } = data;
            
      // Store user info in the token during initial sign-in
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.role = user.role;
        token.type = user.tokenType;
        token.id = user.userId; // Store user ID
      }

      return token; // Return updated token
    },

    async session({ session, token }) {
      // Use token data to set user details in the session
      // console.log("token from session ", token);        
      if (session.user) {
        session.user.id = token.sub; // User ID from token
        session.user.role = token.role; // User role from token
        session.access_token = token.accessToken as string;
        session.refresh_token = token.refreshToken as string;
        session.user.email = token.email as string;
        session.user.tokenType = token.type as string;
        session.user.userId = token.id as string;
      }

      return session; // Return updated session
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});



declare module 'next-auth' {
  interface Session {
    user: {
      id: User['id']
      first_name: User['first_name']
      last_name: User['last_name']
      email: User['email']
      role: User['role']
      bio?: string
      image_url?: User['image_url']
      user_id?: User['user_id']
      emailVerified: boolean
      google_login?: boolean
      is_parent: User['is_parent']
      is_teacher: User['is_teacher']
      payment_plan: User['payment_plan']
    } & DefaultSession['user']
    access_token?: string
    refresh_token?: string
  }
}


// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: User['id']
//       first_name: User['first_name']
//       last_name: User['last_name']
//       email: User['email']
//       role: User['role']
//       bio?: string
//       image_url?: User['image_url']
//       user_id?: User['user_id']
//       emailVerified: boolean
//       google_login?: boolean
//       is_parent: User['is_parent']
//       is_teacher: User['is_teacher']
//       payment_plan: User['payment_plan']
//     } & DefaultSession['user']
//     access_token?: string
//   }
// }