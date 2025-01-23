import { User } from "firebase/auth";

export interface UserModel extends Partial<User> {
  isAcceptUserAgreeMent: boolean;
  lastLogin?: string
  createdAt?:string
}
