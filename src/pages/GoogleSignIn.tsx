/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../components/Header";
import { useAuthContext } from "../hooks/context/useAuth";
import { useServicesContext } from "../hooks/context/useServices";
import { GoogleAuthProvider } from "firebase/auth";

export default function GoogleSignIn(){

    const {authenticatedUser} = useAuthContext()
    const {authService, userService} = useServicesContext()

    function handleGoogleSignIn(){
        authService.signInWithProvider(new GoogleAuthProvider())
    }

    return(
        <div className="globalContainer">
            <Header activeMenuItem="login"/>
            <main>
                <div>{authenticatedUser?.email ?? ''}</div>
    
                <button onClick={handleGoogleSignIn} className="button">Google</button>
            </main>
            </div>
    )
}