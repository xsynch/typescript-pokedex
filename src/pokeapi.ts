export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    
      let response = pageURL ? await fetch(`${pageURL}`): await fetch(`${PokeAPI.baseURL}/location-area`)
      
      if (!response.ok){
          throw new Error(`There was an error with fetch request: ${response.statusText}`)
      } else {
        const jsonData:ShallowLocations = await response.json()
        return jsonData;
      }
      
    
    
    
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response =  await fetch(`${PokeAPI.baseURL}/${locationName}`)
    if(!response.ok){
      throw new Error(`There was an error retrieving location information: ${response.statusText}`)
    }
    else {
      const jsonData:Location = await response.json()
      return jsonData;
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: any;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};
