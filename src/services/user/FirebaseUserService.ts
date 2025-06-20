import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import type IUser from "./interfaces/IUser";
import type { UserService } from "./interfaces/UserService";
import { firestore } from "../../firebase";
import userSchema from "../../zod/userSchema";

export default class FirebaseUserService implements UserService{
    async findByUID(uid: string): Promise<IUser> {
        try{
            const usersCollectionRef = collection(firestore, "users");
            const userDocRef = doc(usersCollectionRef, uid)
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                throw new Error("No user document found for the requested user.");
            }

            const userData = userDocSnap.data();
            const user = userSchema.omit({ uid: true }).parse(userData);

            return {
                uid: userDocSnap.id,
                firstname: user.firstname,
                lastname: user.lastname,
                displayName: user.displayName,
            };
            }catch(error : unknown){
                console.error(error)
                throw error
            }
        }

    async getAll(): Promise<IUser[]> {
        try{
            const usersCollectionRef = collection(firestore, "users");
            const snapshot = await getDocs(usersCollectionRef);
            const users = snapshot.docs.map(doc => {
                // !!! zod?
                const user = doc.data()
                return ({
                    uid: doc.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    displayName: user.displayName,
                })
            })
            return users
        }catch(error : unknown){
            console.error(error)
            throw error
        }
    }

    // addDoc for auto-generated IDs, or setDoc if you want to use a custom ID
    async insert(user : IUser) : Promise<IUser>{
        try {
            // user data validation
            const parsedUser = userSchema.parse(user);
            
            // create a ref to a doc having the specific uid
            const usersCollectionRef = collection(firestore, "users");
            const userDocRef = doc(usersCollectionRef, parsedUser.uid);
            
            // create the doc
            await setDoc(userDocRef, parsedUser);

            // !!! faire un get

            return {
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
            // create a ref to the target doc
            const usersCollectionRef = collection(firestore, "users");
            const userDocRef = doc(usersCollectionRef, uid);

            await deleteDoc(userDocRef);
        } catch (error: unknown) {
            // !!! deal with ZodError instance
            console.error("Error inserting user:", error);
            throw error;
        }
    }

    async updateByUID(uid: string, user: Omit<IUser, "id">): Promise<IUser> {
        try {
            // user data validation
            const parsedUser = userSchema.parse(user);

            // create a ref to the target doc
            const usersCollectionRef = collection(firestore, "users");
            const userDocRef = doc(usersCollectionRef, uid);

            // update the document with the new data
            await setDoc(userDocRef, parsedUser, { merge: true });

            return {
                ...parsedUser
            };
        } catch (error: unknown) {
            if (error instanceof Error && error.name === "ZodError") {
                // Handle Zod validation errors specifically
                console.error("Validation error updating user:", error);
                throw new Error("Validation failed: " + error.message);
            } else {
                // Handle other errors
                console.error("Error updating user:", error);
                throw error;
            }
        }
    }

    async updateUserNamesByUID(uid: string, newNames: {firstname : string, lastname : string}): Promise<void> {
        try {
            // names validation
            const parsedNames = userSchema.pick({ firstname: true, lastname: true }).parse(newNames)

            // create a ref to the target doc
            const usersCollectionRef = collection(firestore, "users");
            const userDocRef = doc(usersCollectionRef, uid);

            // update only the specified fields
            await updateDoc(userDocRef, {
                firstname: parsedNames.firstname,
                lastname: parsedNames.lastname
            });
        } catch (error: unknown) {
            console.error("Error updating user names:", error);
            throw error;
        }
    }
}