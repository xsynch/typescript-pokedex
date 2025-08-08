import { initState } from './state.js';
export function cleanInput(input) {
    input = input.trim().toLowerCase();
    const result = input.split(/[ ]+/);
    return result;
}
export async function startRepl() {
    const st = initState();
    st.rl.setPrompt("Pokedex > ");
    st.rl.prompt();
    st.rl.on("line", async (stream) => {
        const results = cleanInput(stream);
        if (results.length === 0) {
            st.rl.prompt();
        }
        else {
            const val = st.commands[stream];
            if (val) {
                try {
                    await val.callback(st);
                }
                catch (error) {
                    console.log(`Error executing callback function ${error}`);
                }
            }
            else {
                console.log(`Unknown command`);
            }
            st.rl.prompt();
        }
    });
}
