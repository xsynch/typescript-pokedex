import { createInterface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
export function initState() {
    return {
        rl: createInterface({ input, output }),
        commands: {
            exit: {
                name: "exit",
                description: "Exits the pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: " Displays a help message",
                callback: commandHelp,
            },
        }
    };
}
