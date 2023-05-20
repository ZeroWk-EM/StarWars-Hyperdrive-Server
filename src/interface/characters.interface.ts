interface ICharacter {
  name: string;
  surname: string;
  height: number;
  weight: number;
  gender: "Male" | "Female" | "Asexual" | "Unknown" | "Other";
  hair_color: string;
  skin_color: string;
  eye_color:
    | "Brown"
    | "Amber"
    | "Hazel"
    | "Green"
    | "Blue"
    | "Gray"
    | "Yellow"
    | "Red"
    | "Unknown";
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
