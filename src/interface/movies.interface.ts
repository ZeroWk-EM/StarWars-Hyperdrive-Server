interface IMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: string[];
  droid: string[];
  vehicles: string[];
}

export default IMovie;
