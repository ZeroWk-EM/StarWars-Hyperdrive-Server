import { Designation } from "./enum/designation.enum";
import { EyeColor } from "./enum/eye_color.enum";

interface ICreature {
  name: string;
  description: string;
  designation: Designation;
  height: number;
  weight: number;
  skin_color: string;
  eye_color: EyeColor;
  location: string[];
}

export default ICreature;
