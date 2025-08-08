import { State } from "./state.js";

export async function commandExit(st: State){
    console.log("Closing the Pokedex... Goodbye!")
    st.rl.close()
    process.exit(0);
}
