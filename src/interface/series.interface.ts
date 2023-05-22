interface ISerie {
  image: string;
  title: string;
  seasons: number;
  total_episodes: number;
  director: string;
  producer: string;
  release_date: Date;
  end_date: Date;
  characters: string[];
  droid: string[];
  vehicles: string[];
}

export default ISerie;
