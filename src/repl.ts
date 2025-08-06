import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process';
import { getCommands } from './commands.js';
import { initState, State } from './state.js';


type rl = readline.Interface

export function cleanInput(input: string){
    input = input.trim().toLowerCase();
    const result = input.split(/[ ]+/)
    return result;
}


export function startRepl(){

    const st = initState()

    // const rl = readline.createInterface({input, output})
    // const cmds = getCommands();
    
    st.rl.setPrompt("Pokedex > ")
    st.rl.prompt()
    st.rl.on("line", (stream) => {
        const results = cleanInput(stream)
        if (results.length === 0 ){
            st.rl.prompt()
        } else {           
            const val = st.commands[stream]
            if(val){
                try {
                    val.callback(st)               
                } catch (error) {
                    console.log(`Error executing callback function ${error}`)
                }
                
            }
            else {
                console.log(`Unknown command`)
            }
            st.rl.prompt()
        }
    });
}