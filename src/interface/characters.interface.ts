import { EyeColorEnum } from "./enum/eyecolor.enum";
import { GenderEnum } from "./enum/gender.enum";
interface ICharacter {
  name?: string;
  surname?: string;
  height?: number;
  weight?: number;
  gender?: GenderEnum;
  hair_color?: string;
  skin_color?: string;
  eye_color?: EyeColorEnum;
  birth_year?: string;
  homeworld?: string;
  factions?: string[];
  movies?: string[];
  series?: string[];
  specie?: string;
  vehicles?: string[];
  weapons?: string[];
}

export default ICharacter;