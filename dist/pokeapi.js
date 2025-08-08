export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        let response = pageURL ? await fetch(`${pageURL}`) : await fetch(`${PokeAPI.baseURL}/location-area`);
        if (!response.ok) {
            throw new Error(`There was an error with fetch request: ${response.statusText}`);
        }
        else {
            const jsonData = await response.json();
            return jsonData;
        }
    }
    async fetchLocation(locationName) {
        const response = await fetch(`${PokeAPI.baseURL}/${locationName}`);
        if (!response.ok) {
            throw new Error(`There was an error retrieving location information: ${response.statusText}`);
        }
        else {
            const jsonData = await response.json();
            return jsonData;
        }
    }
}
