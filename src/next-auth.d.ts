import  {DefaultSession} from "next-auth"


export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean;
  access_token: string;
  refresh_token: string;
  }
  declare module "next-auth" {
    interface Session {
      user:ExtendedUser;
    }
  }