import { State } from "./state.js";

export async function commandPokeDex(st: State, ...args:string[]){
    if(st.pokedex) {
        console.log("Your Pokedex:")
        for(let pokeMon of Object.entries(st.pokedex)){
            console.log(`  - ${pokeMon[1].name}`)
        }
    } else {
        console.log("No Pokemon caught yet")
    }
}