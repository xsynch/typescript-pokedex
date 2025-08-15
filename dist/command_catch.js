export async function commandCatch(st, pokemon) {
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    const results = await st.pokeApi.fetchPokemon(`${pokemon}`);
    const catchChance = Math.floor(Math.random() * results.base_experience);
    if (catchChance > 40) {
        console.log(`${pokemon} escaped!`);
        return;
    }
    console.log(`${pokemon} was caught!`);
    st.pokedex[results.name] = results;
}
