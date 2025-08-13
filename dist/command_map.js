export async function commandMap(st) {
    let locationResults = st.nextLocationsURL ? await st.pokeApi.fetchLocations(st.nextLocationsURL) : await st.pokeApi.fetchLocations();
    st.nextLocationsURL = locationResults.next;
    st.previousLocationsURL = locationResults.previous;
    for (let location of locationResults.results) {
        console.log(location.name);
    }
}
export async function commandMapB(st) {
    if (st.previousLocationsURL) {
        const location = await st.pokeApi.fetchLocations(st.previousLocationsURL);
        st.nextLocationsURL = location.next;
        st.previousLocationsURL = location.previous;
        for (let loc of location.results) {
            console.log(loc.name);
        }
    }
    else {
        console.log("You are on the first page");
    }
}
