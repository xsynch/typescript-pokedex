import { Location } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandExplore(st: State, location:string){
    const results:Location = await st.pokeApi.fetchLocation(location)
    if (!results){
        console.log(`no pokemon found in ${location}`)
    } else {
        console.log(`Exploring ${location}...`)
        console.log(`Found Pokemon: `)
        for (let pokemon of results.pokemon_encounters){
            console.log(` - ${pokemon.pokemon.name}`)
        }
    }

}