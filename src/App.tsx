/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react';
import './App.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

// https://hackernoon.com/how-to-set-up-firebase-authentication-with-react
// https://firebase.google.com/docs/auth
// https://www.youtube.com/watch?v=WpIDez53SK4&t=2s

function App() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(event : React.FormEvent) {
    event.preventDefault()
    console.log('Login:', email);
    console.log('Password:', password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
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
    </main>
  );
}

export default App
