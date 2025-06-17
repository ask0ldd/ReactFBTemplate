import type { User } from "firebase/auth"
import { createContext, type ReactNode, useState, useEffect } from "react"
import { auth } from "../firebase"

export interface IAuthContext {
  authenticatedUser: User | null
}

export const AuthContext = createContext<IAuthContext|null>({authenticatedUser : null})

export function AuthProvider({ children } : {children : ReactNode}) {
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser ?? null)
      })
      return unsubscribe; // Cleanup subscription on unmount
  }, [])

  return (
    <AuthContext.Provider value={{authenticatedUser : user}}>
        {children}
    </AuthContext.Provider>
  );
}