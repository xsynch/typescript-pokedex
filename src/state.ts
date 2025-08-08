import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";


export type State = {
    rl: Interface,    
    commands: Record<string,CLICommand>,
    pokeApi: PokeAPI
    nextLocationsURL: string,
    previousLocationsURL: string
}


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
            map: {
                name: "map",
                description: "Diaplay names of 20 location areas",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "Display names of previous 20 location areas",
                callback: commandMapB
            },
        },
        pokeApi: new PokeAPI(),
        nextLocationsURL: "",
        previousLocationsURL: "",
    }
}