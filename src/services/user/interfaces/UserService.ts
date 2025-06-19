import type IUser from "./IUser";

export interface UserService {
  findByUID(uid : string) : Promise<IUser>
  getAll() : Promise<IUser[]>
  insert(user : Omit<IUser, 'id'>) : Promise<IUser>
  deleteByUID(uid : string) : Promise<void>
  updateByUID(uid : string, user : Omit<IUser, 'id'>) : Promise<IUser>
  updateUserNames(uid: string, newNames: {firstname : string, lastname : string}): Promise<void>
}