import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const solvePart1 = (values: string[]): number => {
    const columns = values.map((value) => value.split('   '));
    const [firstCol, secondCol] = columns[0].map((_, index) => columns.map((row) => +row[index]));
    firstCol.sort((a, b) => a - b);
    secondCol.sort((a, b) => a - b);

    let sum = 0;
    for(let i = 0; i < firstCol.length; i++) {
        sum += Math.abs(+firstCol[i] - +secondCol[i])
    }
    return sum;
}

const solvePart2 = (values: string[]): number => {
    const columns = values.map((value) => value.split('   '));
    const rows = columns[0].map((_, index) => columns.map((row) => row[index]));
    const [firstCol, secondCol] = columns[0].map((_, index) => columns.map((row) => +row[index]));

    let sum = 0;
    for(let i = 0; i < rows[0].length; i++) {
        sum += firstCol[i] * secondCol.filter((value) => value === firstCol[i]).length;
    }

    return sum;
}


function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2(values))
}

solve()