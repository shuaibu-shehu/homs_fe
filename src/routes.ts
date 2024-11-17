export const publicRoutes = [
    "/",
    "/new-verification",
    "/about",
    "/add-new-hospital",
    
       
] 


// these riutes will redirect logged in users to the settings
export const authRoutes = [
    "/login",
    "/signup",
    "/reset",
    "/new-password"
];

// for api authentication purposes
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/admin"