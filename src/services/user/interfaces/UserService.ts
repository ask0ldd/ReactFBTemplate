import type IUser from "./IUser";

export interface UserService {
  findByUID(uid : string) : Promise<IUser>
  /*insert(user : Partial<IUser>) : Promise<IUser>
  updateByUID(uid : string, user : Partial<IUser>) : Promise<IUser>
  deleteByUID(uid : string) : Promise<void>*/
}