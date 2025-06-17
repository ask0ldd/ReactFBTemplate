import { createContext, type ReactNode } from "react";
import FirebaseAuthService from "../services/auth/FirebaseAuthService";
import FirebaseUserService from "../services/user/FirebaseUserService";

export interface IServicesContext {
  authService: FirebaseAuthService,
  userService: FirebaseUserService
}

export const ServicesContext = createContext<IServicesContext|null>(null)

export function ServicesProvider({ children } : {children : ReactNode}) {

  return (
    <ServicesContext.Provider value={{
      authService : new FirebaseAuthService(), 
      userService : new FirebaseUserService()
    }}>
        {children}
    </ServicesContext.Provider>
  );
}