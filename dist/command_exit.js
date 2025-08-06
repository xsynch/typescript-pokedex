export function commandExit(st) {
    console.log("Closing the Pokedex... Goodbye!");
    st.rl.close();
    process.exit(0);
}
