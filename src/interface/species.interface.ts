import { DesignationEnum } from "./enum/designation.enum";

interface ISpecie {
    name: string;
    designation: DesignationEnum;
    average_height: number;
    skin_color: string;
    average_lifespan: number;
    homeworld: string;
    language: string[];
}

export default ISpecie;
