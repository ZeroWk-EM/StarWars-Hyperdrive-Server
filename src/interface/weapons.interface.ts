import { WeaponType } from "./enum/weapontype.enum";

interface IWeapons {
  name: string;
  type: WeaponType;
  description: string;
  owner: string;
}

export default IWeapons;
