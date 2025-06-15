import type IUser from "./IUser";

export interface UserService {
  find(uid : string) : Promise<IUser>
  insert(user : Partial<IUser>) : Promise<IUser>
  update(uid : string, user : Partial<IUser>) : Promise<IUser>
  delete(uid : string) : Promise<void>
}