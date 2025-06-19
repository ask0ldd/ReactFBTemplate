import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import type IUser from "./interfaces/IUser";
import type { UserService } from "./interfaces/UserService";
import { firestore } from "../../firebase";
import userSchema from "../../zod/userSchema";

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

    // addDoc for auto-generated IDs, or setDoc if you want to use a custom ID
    async insert(user : Omit<IUser, 'id'>) : Promise<IUser>{
        try {
            // Optional: Validate user data (uncomment and adapt as needed)
            const parsedUser = userSchema.parse(user);

            const usersRef = collection(firestore, "users");
            // Create a document reference with the user's UID as the document ID
            const userDocRef = doc(usersRef, parsedUser.uid);
            // Set the document data
            await setDoc(userDocRef, parsedUser);

            // Return the inserted user with the new document ID
            return {
                id: parsedUser.uid,
                ...parsedUser
            };
        } catch (error: unknown) {
            // !!! deal with ZodError instance
            console.error("Error inserting user:", error);
            throw error;
        }
    }

    async deleteByUID(uid: string): Promise<void> {
        try{
            const usersRef = collection(firestore, "users");
            const userDocRef = doc(usersRef, uid);
            await deleteDoc(userDocRef);
        } catch (error: unknown) {
            // !!! deal with ZodError instance
            console.error("Error inserting user:", error);
            throw error;
        }
    }
}