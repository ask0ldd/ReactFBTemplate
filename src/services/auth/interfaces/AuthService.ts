import type IAuthUser from "./IAuthUser"

export interface AuthService {
  signInWithEmailAndPassword(email : string, password : string) : Promise<IAuthUser>
  createUserWithEmailAndPassword(email : string, password : string) : Promise<IAuthUser>
}