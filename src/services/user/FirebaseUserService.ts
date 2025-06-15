import { collection, getDocs, query, where } from "firebase/firestore";
import type IUser from "./interfaces/IUser";
import type { UserService } from "./interfaces/UserService";
import { firestore } from "../../firebase";

export default class FirebaseUserService implements UserService{
    async findByUID(uid: string): Promise<IUser> {
        try{
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("uid", "==", uid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("No user document found for the current user.");
            }

            const doc = querySnapshot.docs[0];
            // !!! zod?
            const user = doc.data();

            return {
                id: doc.id,
                firstname: user.firstname,
                lastname: user.lastname,
                displayName: user.displayName,
                uid: user.uid
            };
        }catch(error : unknown){
            console.error(error)
            throw error
        }
    }

}