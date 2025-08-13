import { createInterface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
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
        },
        pokeApi: new PokeAPI(),
        nextLocationsURL: "",
        previousLocationsURL: "",
    };
}
