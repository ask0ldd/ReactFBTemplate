export interface AuthService {
  signInWithEmailAndPassword(email : string, password : string) : Promise<void>
}