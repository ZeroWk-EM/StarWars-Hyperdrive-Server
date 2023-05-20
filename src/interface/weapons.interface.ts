import { WeaponEnum } from "./enum/weapon.enum";

interface IWeapons {
  name: string;
  type: WeaponEnum;
  description: string;
  owner: string;
}

export default IWeapons;
