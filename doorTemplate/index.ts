import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const log = (...items) => {
    if (process.env.DEBUG) {
        console.log(...items);
    }
}

const solvePart1 = (values: string[]): number => {
    return 0;
}

const solvePart2 = (values: string[]): number => {
    return 0;
}


function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2(values))
}

solve()