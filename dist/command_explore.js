export async function commandExplore(st, location) {
    const results = await st.pokeApi.fetchLocation(location);
    if (!results) {
        console.log(`no pokemon found in ${location}`);
    }
    else {
        console.log(`Exploring ${location}...`);
        console.log(`Found Pokemon: `);
        for (let pokemon of results.pokemon_encounters) {
            console.log(` - ${pokemon.pokemon.name}`);
        }
    }
}
