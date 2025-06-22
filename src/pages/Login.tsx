/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useAuthContext } from "../hooks/context/useAuth";
import { useServicesContext } from "../hooks/context/useServices";
import Header from "../components/Header";

export default function Login(){

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {authenticatedUser} = useAuthContext()
    const {authService, userService} = useServicesContext()

    async function handleLogin(event : React.FormEvent) {
        event.preventDefault()
        try {
          // const authService = new FirebaseAuthService()
          const user = await authService.signInWithEmailAndPassword(email, password)
          console.log(JSON.stringify(user))
        } catch (error : unknown) {
          if (error instanceof FirebaseError) {
            console.error('Firebase error:', error.message);
          } else {
            console.error('Unknown error:', error);
          }
        }
    }

    return(
      <div className="globalContainer">
        <Header activeMenuItem="login"/>
        <main>
            <div>{authenticatedUser?.email ?? ''}</div>

            <form onSubmit={handleLogin}>
                <label htmlFor="email">Login</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password" style={{ marginTop: '20px' }}>Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" style={{ marginTop: '20px' }}/>
            </form>
        </main>
      </div>
    )
}