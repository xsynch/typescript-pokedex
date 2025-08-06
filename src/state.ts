import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";


export type State = {
    rl: Interface,    
    commands: Record<string,CLICommand>,
}


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};


export function initState(): State { 
    return {
        rl: createInterface({input, output}),
        commands: 
        {    
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
    }
}