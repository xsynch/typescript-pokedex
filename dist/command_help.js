export async function commandHelp(st) {
    console.log(`Welcome to the Pokedex!\nUsage:\n\n`);
    // for (let cmd of Object.entries(st.commands)){
    //     console.log(`${cmd[1].name}: ${cmd[1].description}`)
    // }
    for (let key in st.commands) {
        if (st.commands.hasOwnProperty(key)) {
            const value = st.commands[key];
            console.log(`${value.name}: ${value.description}`);
        }
    }
}
