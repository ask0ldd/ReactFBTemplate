/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react';
import './App.css'
import { FirebaseError } from 'firebase/app';
import FirebaseAuthService from './services/auth/FirebaseAuthService';
import { auth } from './firebase';
import FirebaseUserService from './services/user/FirebaseUserService';
import { useAuthContext } from './hooks/context/useAuth';
import { useServicesContext } from './hooks/context/useServices';

// https://hackernoon.com/how-to-set-up-firebase-authentication-with-react
// https://firebase.google.com/docs/auth
// https://www.youtube.com/watch?v=WpIDez53SK4&t=2s

// https://rnfirebase.io/#installation-for-expo-projects

function App() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailR, setEmailR] = useState<string>('');
  const [passwordR, setPasswordR] = useState<string>('');
  const [displayNameR, setDisplayNameR] = useState<string>('');
  const [firstnameR, setFirstnameR] = useState<string>('');
  const [lastnameR, setLastnameR] = useState<string>('');

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

  async function handleDeleteUser(event : React.MouseEvent){
    event.preventDefault();
    try{
      if(!auth.currentUser?.uid) throw new Error("A user must be logged first.")
      await userService.deleteByUID(auth.currentUser?.uid)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Firebase error:", error.message);
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  async function handleRetrieveUser(event : React.MouseEvent){
    event.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently signed in.");

      // const userService = new FirebaseUserService()

      const retrievedUser = await userService.findByUID(user.uid)
      console.log(JSON.stringify(retrievedUser))

      const users = await userService.getAll()
      console.log("All users : ", users);

    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Firebase error:", error.message);
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

    /*const userDocRef = doc(firestore, "users", uid)
  const usersSnapshot = await getDoc(userDocRef)
  if (usersSnapshot.exists()) {
    console.log("User data:", usersSnapshot.data())
  } else {
    console.log("doesn't exist")
  }*/

  function handleDisconnectUser(){
    auth.signOut()
  }

  return (
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

      <form onSubmit={handleRegister}>

        <label htmlFor="email">Register Login</label>
        <input id="emailR" name="emailR" type="text" value={emailR} onChange={e => setEmailR(e.target.value)} />

        <label htmlFor="passwordR" style={{ marginTop: '20px' }}>Register Password</label>
        <input id="passwordR" name="passwordR" type="password" value={passwordR} onChange={e => setPasswordR(e.target.value)} />

        <label htmlFor="displayNameR" style={{ marginTop: '20px' }}>Register Username</label>
        <input id="displayNameR" name="displayNameR" type="text" value={displayNameR} onChange={e => setDisplayNameR(e.target.value)} />
        
        <label htmlFor="firstnameR" style={{ marginTop: '20px' }}>Register Firstname</label>
        <input id="firstnameR" name="firstnameR" type="text" value={firstnameR} onChange={e => setFirstnameR(e.target.value)} />
        
        <label htmlFor="lastnameR" style={{ marginTop: '20px' }}>Register Lastname</label>
        <input id="lastnameR" name="lastnameR" type="text" value={lastnameR} onChange={e => setLastnameR(e.target.value)} />
        
        <input type="submit" value="Register" style={{ marginTop: '20px' }}/>
      </form>

      <button style={{ marginTop: '60px', width:'100%', maxWidth:'600px' }} onClick={handleRetrieveUser}>getUser</button>
      
      <button style={{ marginTop: '60px', width:'100%', maxWidth:'600px' }} onClick={handleDisconnectUser}>Disconnect</button>
      <button style={{ marginTop: '60px', width:'100%', maxWidth:'600px' }} onClick={handleDeleteUser}>Delete Active User</button>
    </main>
  );
}

export default App
