export async function commandPokeDex(st, ...args) {
    if (st.pokedex) {
        console.log("Your Pokedex:");
        for (let pokeMon of Object.entries(st.pokedex)) {
            console.log(`  - ${pokeMon[1].name}`);
        }
    }
    else {
        console.log("No Pokemon caught yet");
    }
}
