import { TypeDroid } from "./enum/droidtype.enum";

interface IDroid {
  name: string;
  type: TypeDroid;
  height: number;
  weight: number;
  owner: string;
  factions: string[];
  weapons: string[];
}

export default IDroid;
