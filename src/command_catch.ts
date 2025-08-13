import { State } from "./state";

export async function commandCatch(st:State, pokemon:string){
    console.log(`Throwing a ball at ${pokemon}...`)
    const results = st.pokeApi.fetchLocations(`api/v2/pokemon/${pokemon}`);
}