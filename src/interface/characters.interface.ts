import { EyeColor } from "./enum/eye_color.enum";
import { Gender } from "./enum/gender.enum";
interface ICharacter {
  name: string;
  surname: string;
  height: number;
  weight: number;
  gender: Gender;
  hair_color: string;
  skin_color: string;
  eye_color: EyeColor;
  birth_year: string;
  homeworld: string;
  factions: string[];
  movies: string[];
  series: string[];
  specie: string;
  vehicles: string[];
  weapons: string[];
}

export default ICharacter;
