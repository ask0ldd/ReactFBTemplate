import { collection, getDocs, query, where } from "firebase/firestore";
import type IUser from "./interfaces/IUser";
import type { UserService } from "./interfaces/UserService";
import { firestore } from "../../firebase";

export default class FirebaseUserService implements UserService{
    async findByUID(uid: string): Promise<IUser> {
        try{
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("uid", "==", uid));
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                throw new Error("No user document found for the requested user.");
            }

            const doc = snapshot.docs[0]
            
            // !!! zod?
            const user = doc.data()

            return ({
                id: doc.id,
                firstname: user.firstname,
                lastname: user.lastname,
                displayName: user.displayName,
                uid: user.uid
            })
        }catch(error : unknown){
            console.error(error)
            throw error
        }
    }

    async getAll(): Promise<IUser[]> {
        try{
            const usersCollection = collection(firestore, "users");
            const snapshot = await getDocs(usersCollection);
            const users = snapshot.docs.map(doc => {
                // !!! zod?
                const user = doc.data()
                return ({
                    id: doc.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    displayName: user.displayName,
                    uid: user.uid
                })
            })
            return users
        }catch(error : unknown){
            console.error(error)
            throw error
        }
    }

}