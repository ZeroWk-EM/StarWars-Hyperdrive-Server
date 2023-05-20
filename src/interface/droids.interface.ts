import { DroidEnum } from "./enum/droid.enum";

interface IDroid {
  name: string;
  type: DroidEnum;
  height: number;
  weight: number;
  owner: string;
  factions: string[];
  weapons: string[];
}

export default IDroid;
