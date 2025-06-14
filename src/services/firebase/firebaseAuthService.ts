import type { AuthService } from "../authService";

export default class firebaseAuthService implements AuthService{
    async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
        console.log(email, password)
    }
    
}