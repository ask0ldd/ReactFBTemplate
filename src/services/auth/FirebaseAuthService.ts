import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, type User, type UserCredential } from "@firebase/auth";
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

    async signInWithProvider(provider : GoogleAuthProvider){
        try{
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            console.log(JSON.stringify(user))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error : any){
            // const errorCode = error.code;
            if (error?.message) {
                console.error("Sign-in error:", error.message);
            } else {
                console.error("Unknown sign-in error:", error);
            }
        }

    }

    async disconnect(){
        try{
            await auth.signOut()
        }catch(error : unknown){
            console.error(JSON.stringify(error))
        }

    }
}