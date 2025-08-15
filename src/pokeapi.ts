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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
      const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`  
      const checkPokemon = cache.get(url)
      if(checkPokemon){
        return checkPokemon

      }
      const response =  await fetch(url)
      if(!response.ok){
        throw new Error(`There was an error retrieving pokemon information: ${response.statusText}`)
      }
      else {
        const jsonData:Pokemon = await response.json()
        cache.add(url, jsonData)
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


// export type Pokemon = {
//   id: number,
//   name: string,
//   base_experience: number,
//   height: number,
//   is_default: boolean,
//   order: number,
//   weight: number,
//   abilities: {
//     is_hidden: boolean,
//     slot: number,
//     ability: {
//       name: string,
//       url: string,
//     }
//   }[],
//   form: {
//     name: string,
//     url: string,
//   }[],
//   game_indicies: {
//     game_index: number,
//     version: {
//       name: string,
//       url:string,
//     }
//   }[],
//   held_items:{
//     item:{
//       name: string,
//       url: string,
//     },
//     version_details: {
//         rarity: number,
//         version: {
//           name: string,
//           url: string,
//         }
//     }[]
//   }[],
//   location_area_encounters: string,
//   moves: {
//     move: {
//       name: string,
//       url: string,
//     },
//     version_group_details: {
//       level_learned_at: number,
//       version_group: {
//         name: string,
//         url: string,
//       },
//       move_learn_method: {
//         name: string,
//         url: string,
//       },order: number,
//     }[],
//   },
//   species: {
//     name: string,
//     url: string,

//   },
//   sprites: {
//     back_default: string,
//     back_female: string,
//     back_shiny: string,
//     back_shiny_female: any,
//     front_default: string,
//     front_female: any,
//     front_shiny: string,
//     front_shiny_female: any,
//     other: {
//       dream_world: {
//         front_default: string,
//         front_female: any,
//       },
//       versions: {
//         name: string
//         url: string
//       },
//     }
//   },
//   cries: {
//     latest: string
//     legacy: string
//   },
//   stats: {
//     base_stat: number
//     effort: number,
//     stat: {
//       name: string,
//       url: string,
//     }
//   }[],
//   types: {

//   }[],
//   past_types: {

//   }[],
//   past_abilities: {

//   }[],

// }


export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  forms: Form[]
  game_indices: Index[]
  held_items: HeldItem[]
  location_area_encounters: string
  moves: Mfe[]
  species: Species
  sprites: Sprites
  cries: Cries
  stats: Stat[]
  types: Type[]
  past_types: PastType[]
  past_abilities: PastAbility[]
}

export interface Ability {
  is_hidden: boolean
  slot: number
  ability: Ability2
}

export interface Ability2 {
  name: string
  url: string
}

export interface Form {
  name: string
  url: string
}

export interface Index {
  game_index: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface HeldItem {
  item: Item
  version_details: VersionDetail[]
}

export interface Item {
  name: string
  url: string
}

export interface VersionDetail {
  rarity: number
  version: Version2
}

export interface Version2 {
  name: string
  url: string
}

export interface Mfe {
  move: Move
  version_group_details: VersionGroupDetail[]
}

export interface Move {
  name: string
  url: string
}

export interface VersionGroupDetail {
  level_learned_at: number
  version_group: VersionGroup
  move_learn_method: MoveLearnMethod
  order: number
}

export interface VersionGroup {
  name: string
  url: string
}

export interface MoveLearnMethod {
  name: string
  url: string
}

export interface Species {
  name: string
  url: string
}

export interface Sprites {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
  other: Other
  versions: Versions
}

export interface Other {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Showdown
}

export interface DreamWorld {
  front_default: string
  front_female: any
}

export interface Home {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface OfficialArtwork {
  front_default: string
  front_shiny: string
}

export interface Showdown {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface Versions {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": GenerationVi
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export interface GenerationI {
  "red-blue": RedBlue
  yellow: Yellow
}

export interface RedBlue {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

export interface Yellow {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

export interface GenerationIi {
  crystal: Crystal
  gold: Gold
  silver: Silver
}

export interface Crystal {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface Gold {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface Silver {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface GenerationIii {
  emerald: Emerald
  "firered-leafgreen": FireredLeafgreen
  "ruby-sapphire": RubySapphire
}

export interface Emerald {
  front_default: string
  front_shiny: string
}

export interface FireredLeafgreen {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface RubySapphire {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface GenerationIv {
  "diamond-pearl": DiamondPearl
  "heartgold-soulsilver": HeartgoldSoulsilver
  platinum: Platinum
}

export interface DiamondPearl {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface HeartgoldSoulsilver {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface Platinum {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface GenerationV {
  "black-white": BlackWhite
}

export interface BlackWhite {
  animated: Animated
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface Animated {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface GenerationVi {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire
  "x-y": XY
}

export interface OmegarubyAlphasapphire {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface XY {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface GenerationVii {
  icons: Icons
  "ultra-sun-ultra-moon": UltraSunUltraMoon
}

export interface Icons {
  front_default: string
  front_female: any
}

export interface UltraSunUltraMoon {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface GenerationViii {
  icons: Icons2
}

export interface Icons2 {
  front_default: string
  front_female: any
}

export interface Cries {
  latest: string
  legacy: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}

export interface PastType {
  generation: Generation
  types: Type3[]
}

export interface Generation {
  name: string
  url: string
}

export interface Type3 {
  slot: number
  type: Type4
}

export interface Type4 {
  name: string
  url: string
}

export interface PastAbility {
  generation: Generation2
  abilities: Ability3[]
}

export interface Generation2 {
  name: string
  url: string
}

export interface Ability3 {
  ability: any
  is_hidden: boolean
  slot: number
}
