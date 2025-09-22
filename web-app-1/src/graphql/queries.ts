import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          dimension
        }
        location {
          id
          name
          dimension
        }
        image
        episode {
          id
          name
          episode
        }
        created
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        dimension
        type
        residents {
          id
          name
        }
      }
      location {
        id
        name
        dimension
        type
        residents {
          id
          name
        }
      }
      image
      episode {
        id
        name
        episode
        air_date
        characters {
          id
          name
        }
      }
      created
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
        created
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
        created
      }
    }
  }
`;
