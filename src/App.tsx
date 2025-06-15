/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react';
import './App.css'
import { FirebaseError } from 'firebase/app';
import FirebaseAuthService from './services/auth/FirebaseAuthService';
import { auth, firestore } from './firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// https://hackernoon.com/how-to-set-up-firebase-authentication-with-react
// https://firebase.google.com/docs/auth
// https://www.youtube.com/watch?v=WpIDez53SK4&t=2s

function App() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailR, setEmailR] = useState<string>('');
  const [passwordR, setPasswordR] = useState<string>('');

  async function handleLogin(event : React.FormEvent) {
    event.preventDefault()
    try {
      const authService = new FirebaseAuthService()
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
      const authService = new FirebaseAuthService()
      const user = await authService.createUserWithEmailAndPassword(emailR, passwordR)
      console.log(JSON.stringify(user))
    } catch (error : unknown) {
      if (error instanceof FirebaseError) {
        console.error('Firebase error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }

  async function handleRetrieveUser(event : React.MouseEvent){
    event.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently signed in.");

      // Query for the current user using indexed field 'uid'
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.warn("No user document found for the current user.");
        return;
      }

      // Process user document(s) as needed
      querySnapshot.forEach((doc) => {
        // Avoid logging sensitive data in production
        console.log("User document : ", { id: doc.id, ...doc.data() });
      });

      const usersCollection = collection(firestore, "users");
      const snapshot = await getDocs(usersCollection);
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  return (
    <main>
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
        <input type="submit" value="Submit" style={{ marginTop: '20px' }}/>
      </form>

      <form onSubmit={handleRegister}>
        <label htmlFor="email">LoginR</label>
        <input
          id="emailR"
          name="emailR"
          type="text"
          value={emailR}
          onChange={e => setEmailR(e.target.value)}
        />
        <label htmlFor="passwordR" style={{ marginTop: '20px' }}>PasswordR</label>
        <input
          id="passwordR"
          name="passwordR"
          type="password"
          value={passwordR}
          onChange={e => setPasswordR(e.target.value)}
        />
        <input type="submit" value="Submit" style={{ marginTop: '20px' }}/>
      </form>

      <button style={{ marginTop: '60px', width:'100%', maxWidth:'600px' }} onClick={handleRetrieveUser}>getUser</button>
    </main>
  );
}

export default App
