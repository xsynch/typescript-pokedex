import { Cache } from "./pokecache.js";

const cache = new Cache(15)

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if(pageURL && cache.get(pageURL)){
      const content = cache.get(pageURL)
      return content?.val
    }
      if(!pageURL){
        pageURL = `${PokeAPI.baseURL}/location-area`
      }
      // let response = pageURL ? await fetch(`${pageURL}`): await fetch(`${PokeAPI.baseURL}/location-area`)
      let response = await fetch(`${pageURL}`)
      
      if (!response.ok){
          throw new Error(`There was an error with fetch request: ${response.statusText}`)
      } else {
        
        const jsonData:ShallowLocations = await response.json()
        cache.add(pageURL, jsonData)
        return jsonData;
      }
      
    
    
    
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const checkLocation = cache.get(locationName)
    if(checkLocation){
      return checkLocation

    }
    const response =  await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`)
    if(!response.ok){
      throw new Error(`There was an error retrieving location information: ${response.statusText}`)
    }
    else {
      const jsonData:Location = await response.json()
      cache.add(locationName, jsonData)
      return jsonData;
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: any;
  results: {name: string, url: string}[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};


export type Pokemon = {
  id: number,
  name: string,
  base_experience: number,
  height: number,
  is_default: boolean,
  order: number,
  weight: number,
  abilities: {
    is_hidden: boolean,
    slot: number,
    ability: {
      name: string,
      url: string,
    }
  }[],
  form: {
    name: string,
    url: string,
  }[],
  game_indicies: {
    game_index: number,
    version: {
      name: string,
      url:string,
    }
  }[],
  held_items:{
    item:{
      name: string,
      url: string,
    },
    version_details: {
        rarity: number,
        version: {
          name: string,
          url: string,
        }
    }[]
  }[]
}