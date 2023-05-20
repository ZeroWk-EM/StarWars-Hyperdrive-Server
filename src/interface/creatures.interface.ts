import { DesignationEnum } from "./enum/designation.enum";
import { EyeColorEnum } from "./enum/eyecolor.enum";

interface ICreature {
  name: string;
  description: string;
  designation: DesignationEnum;
  height: number;
  weight: number;
  skin_color: string;
  eye_color: EyeColorEnum;
  location: string[];
}

export default ICreature;
