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


export async function startRepl(){

    const st = initState()


    
    st.rl.setPrompt("Pokedex > ")
    st.rl.prompt()
    st.rl.on("line", async (stream) => {
        const results = cleanInput(stream)
        if (results.length === 0 ){
            st.rl.prompt()
        } else {           
            const val = st.commands[results[0]]
            if(val){
                try {
                    if(results.length == 2){
                        await val.callback(st, results[1])
                    } else {
                        await val.callback(st)
                    }
                    
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