import { DroidEnum } from "./enum/droid.enum";

interface IDroid {
  image: string;
  name: string;
  type: DroidEnum;
  height: number;
  weight: number;
  owner: string;
  factions: string[];
  weapons: string[];
}

export default IDroid;
