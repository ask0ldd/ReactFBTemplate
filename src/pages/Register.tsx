/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useAuthContext } from "../hooks/context/useAuth";
import { useServicesContext } from "../hooks/context/useServices";
import { FirebaseError } from "@firebase/app";
import Header from "../components/Header";

export default function Register(){

    const [emailR, setEmailR] = useState<string>('');
    const [passwordR, setPasswordR] = useState<string>('');
    const [displayNameR, setDisplayNameR] = useState<string>('');
    const [firstnameR, setFirstnameR] = useState<string>('');
    const [lastnameR, setLastnameR] = useState<string>('');
    
    const {authenticatedUser} = useAuthContext()
    const {authService, userService} = useServicesContext()

    async function handleRegister(event : React.FormEvent){
        event.preventDefault()
        try{
          // const authService = new FirebaseAuthService()
          const user = await authService.createUserWithEmailAndPassword(emailR, passwordR)
          if(user.uid == null) throw new Error("No UID generated.")
          userService.insert({
            uid: user.uid,
            firstname : firstnameR,
            lastname : lastnameR,
            displayName : displayNameR,
          })
          // console.log(JSON.stringify(user))
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
        <Header activeMenuItem="register"/>
        <main>

            <div>{authenticatedUser?.email ?? ''}</div>

            <form onSubmit={handleRegister}>
                <label htmlFor="email">Register Login</label>
                <input id="emailR" name="emailR" type="text" value={emailR} onChange={e => setEmailR(e.target.value)} />

                <label htmlFor="passwordR" style={{ marginTop: '20px' }}>Password</label>
                <input id="passwordR" name="passwordR" type="password" value={passwordR} onChange={e => setPasswordR(e.target.value)} />

                <label htmlFor="displayNameR" style={{ marginTop: '20px' }}>Username</label>
                <input id="displayNameR" name="displayNameR" type="text" value={displayNameR} onChange={e => setDisplayNameR(e.target.value)} />
                
                <label htmlFor="firstnameR" style={{ marginTop: '20px' }}>Firstname</label>
                <input id="firstnameR" name="firstnameR" type="text" value={firstnameR} onChange={e => setFirstnameR(e.target.value)} />
                
                <label htmlFor="lastnameR" style={{ marginTop: '20px' }}>Lastname</label>
                <input id="lastnameR" name="lastnameR" type="text" value={lastnameR} onChange={e => setLastnameR(e.target.value)} />
                
                <input type="submit" value="Register" style={{ marginTop: '20px' }}/>
            </form>
        </main>
      </div>
    )
}