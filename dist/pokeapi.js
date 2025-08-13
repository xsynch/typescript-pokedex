import { Cache } from "./pokecache.js";
const cache = new Cache(15);
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        if (pageURL && cache.get(pageURL)) {
            const content = cache.get(pageURL);
            return content?.val;
        }
        if (!pageURL) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }
        // let response = pageURL ? await fetch(`${pageURL}`): await fetch(`${PokeAPI.baseURL}/location-area`)
        let response = await fetch(`${pageURL}`);
        if (!response.ok) {
            throw new Error(`There was an error with fetch request: ${response.statusText}`);
        }
        else {
            const jsonData = await response.json();
            cache.add(pageURL, jsonData);
            return jsonData;
        }
    }
    async fetchLocation(locationName) {
        const checkLocation = cache.get(locationName);
        if (checkLocation) {
            return checkLocation;
        }
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        if (!response.ok) {
            throw new Error(`There was an error retrieving location information: ${response.statusText}`);
        }
        else {
            const jsonData = await response.json();
            cache.add(locationName, jsonData);
            return jsonData;
        }
    }
}
