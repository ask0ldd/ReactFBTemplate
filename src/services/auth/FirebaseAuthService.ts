import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type User, type UserCredential } from "@firebase/auth";
import { auth } from "../../firebase";
import type IAuthUser from "./interfaces/IAuthUser";
import type { AuthService } from "./interfaces/AuthService";

export default class FirebaseAuthService implements AuthService{
    async signInWithEmailAndPassword(email: string, password: string): Promise<IAuthUser> {
        try {
            const userCredential : UserCredential = await signInWithEmailAndPassword(auth, email, password)
            const user : User = userCredential.user
            return ({
                email : user.email,
                displayName : user.displayName,
                uid : user.uid,
                refreshToken : user.refreshToken,
                accessToken : await user.getIdToken()
            })
        } catch (error : unknown) {
            console.error(error)
            throw error
        }
    }
    
    async createUserWithEmailAndPassword(email : string, password : string) : Promise<IAuthUser>{
        try{
            const userCredential : UserCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            return ({
                email : user.email,
                displayName : user.displayName,
                uid : user.uid,
                refreshToken : user.refreshToken,
                accessToken : await user.getIdToken()
            })
        } catch (error : unknown) {
            console.error(error)
            throw error
        }
    }
}