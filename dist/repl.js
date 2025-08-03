import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
export function cleanInput(input) {
    input = input.trim().toLowerCase();
    const result = input.split(/[ ]+/);
    return result;
}
export function startRepl() {
    const rl = readline.createInterface({ input, output });
    rl.setPrompt("Pokedex > ");
    rl.prompt();
    rl.on("line", (stream) => {
        if (stream.length === 0) {
            rl.prompt();
        }
        else {
            const results = cleanInput(stream);
            console.log(`Your command was: ${results[0]}`);
            rl.prompt();
        }
    });
}
