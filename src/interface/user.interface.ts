import { RoleType } from "./enum/role.enum";

interface IUser {
  image: string;
  name: string;
  surname: string;
  role: RoleType;
  username: string;
  email: string;
  password: string;
}

export default IUser;
