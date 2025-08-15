export async function commandInspect(st, ...args) {
    if (args.length != 1) {
        console.log(`Invalid argument`);
        return;
    }
    const pokemonName = args[0];
    const pokeData = st.pokedex[pokemonName];
    if (pokeData) {
        console.log(`Name: ${pokeData.name}
Height: ${pokeData.height}
Weight: ${pokeData.weight}
Stats:`);
        for (let l of pokeData.stats) {
            console.log(`  -${l.stat.name}: ${l.base_stat}`);
        }
        console.log(`Types:`);
        for (let l of pokeData.types) {
            console.log(`  - ${l.type.name}`);
        }
    }
    else {
        console.log(`Pokemon ${pokemonName} has not been caught yet`);
    }
}
