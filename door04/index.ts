import {getFileContent} from "../utils/fileHandling";
import {flipRC, rotate45} from "../utils/arrayHandling";

const inputName = __dirname + '/puzzle-input'

const countXmas = (matrix: string[]): number => {
    return matrix.reduce((acc, val) => {
        return acc += (val.match(/(?=(XMAS|SAMX))/g)|| []).length;
    }, 0);
}

const solvePart1 = (values: string[]): number => {
    let a = countXmas(values);

    // rotate 45 degrees
    const dia1 = rotate45(values.map((val) => val.split('')));
    a+= countXmas(dia1.map((val) => val.join('')));

    // mirror and rotate 45 degrees
    const dia2 = rotate45(values.map((val) => val.split('').reverse()));
    a+= countXmas(dia2.map((val) => val.join('')));

    // flip rows and columns
    const flipped = flipRC(values.map((val) => val.split('')))
    a+= countXmas(flipped.map((val) => val.join('')));

    return a;
}

const solvePart2 = (values: string[][]): number => {
    let a = 0;
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            if (i > 0 && i < values.length-1 && j > 0 && j < values[i].length-1 && values[i][j] === 'A') {
                if ((values[i-1][j-1] === 'M' && values[i+1][j+1] === 'S') || (values[i-1][j-1] === 'S' && values[i+1][j+1] === 'M')) {
                    if ((values[i-1][j+1] === 'M' && values[i+1][j-1] === 'S') || (values[i-1][j+1] === 'S' && values[i+1][j-1] === 'M'))
                        a++;
                }
            }
        }
    }

    return a;

}

function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2(values.map(val => val.split(''))))
}

solve()