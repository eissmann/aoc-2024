import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const solvePart1 = (values: string[]): number => {
    return values.reduce((acc, val) => {
        [...val.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)].forEach((match) => {
            const [x,y] = match[0].slice(4,-1).split(',').map(Number);
            acc += x*y;
        });
        return acc;
    },0);
}

const solvePart2 = (values: string): number => {

    const dos = values.split('do()');

    return dos.reduce((acc, val) => {
        [...val.split("don't()")[0].matchAll(/mul\(\d{1,3},\d{1,3}\)/g)].forEach((match) => {
            const [x,y] = match[0].slice(4,-1).split(',').map(Number);
            acc += x*y;
        });
        return acc;
    }, 0);
}


function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2('do()xxx' + getFileContent(inputName)))
}

solve()