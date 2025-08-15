import { createInterface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokeDex } from "./command_pokedex.js";
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
            inspect: {
                name: "inspect",
                description: "Get details about a specific pokemon in the pokedex",
                callback: commandInspect
            },
            pokedex: {
                name: "pokedex",
                description: "Print out all caught pokemon so far",
                callback: commandPokeDex
            }
        },
        pokeApi: new PokeAPI(),
        nextLocationsURL: "",
        previousLocationsURL: "",
        pokedex: {}
    };
}
