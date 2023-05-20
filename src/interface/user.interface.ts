import { RoleType } from "./enum/role.enum";

interface IUser {
  name: string;
  surname: string;
  role: RoleType;
  username: string;
  email: string;
  password: string;
}


export default IUser;