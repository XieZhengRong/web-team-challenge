export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
  created: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents?: Character[];
  created?: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersResponse {
  characters: {
    info: Info;
    results: Character[];
  };
}

export interface CharacterResponse {
  character: Character;
}

export interface EpisodesResponse {
  episodes: {
    info: Info;
    results: Episode[];
  };
}

export interface LocationsResponse {
  locations: {
    info: Info;
    results: Location[];
  };
}

export interface FilterCharacter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export interface FilterEpisode {
  name?: string;
  episode?: string;
}

export interface FilterLocation {
  name?: string;
  type?: string;
  dimension?: string;
}

export interface GetCharactersVariables {
  page?: number;
  filter?: FilterCharacter;
}

export interface GetCharacterVariables {
  id: string;
}

export interface GetEpisodesVariables {
  page?: number;
  filter?: FilterEpisode;
}

export interface GetLocationsVariables {
  page?: number;
  filter?: FilterLocation;
}
