import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandCatch } from "./command_catch.js";


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
  callback: (state: State, ...args:string[]) => Promise<void>;
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
            explore: {
                name: "explore",
                description: "takes the name of a location to see a list of Pokemon in the area",
                callback: commandExplore,
            },
            catch: {
                name: "catch",
                description: "Provide a pokemon to catch to add to the pokedex",
                callback: commandCatch,
            },
        },
        pokeApi: new PokeAPI(),
        nextLocationsURL: "",
        previousLocationsURL: "",
    }
}