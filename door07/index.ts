import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const log = (...items: any) => {
    if (process.env.DEBUG) {
        console.log(...items);
    }
}

const solvePart1 = (values: string[], two = false): number => {
    const calc = (number: number, numbers: number[], testResult: number, two = false): boolean => {
        if (numbers.length === 0) {
            return number === testResult;
        }

        const nextNumber = numbers.shift();
        if (!nextNumber) {
            return false;
        }

        // check +
        if (calc(number + nextNumber, [...numbers], testResult, two)) {
            return true;
        }

        // check *
        if (calc(number * nextNumber, [...numbers], testResult, two)) {
            return true;
        }

        // check concatenation
        if (two && calc(Number(`${number.toString()}${nextNumber.toString()}`), [...numbers], testResult, two)) {
            return true;
        }

        return false;
    }

    let result = 0;

    values.forEach(equation => {
        const [testResult, numberLine] = equation.split(': ');
        const numbers = numberLine.split(' ').map(Number);
        log(testResult, numbers);

        if (calc(numbers[0], numbers.slice(1), +testResult, two)) {
            result += +testResult;
        }

    });

    return result;
}


function solve() {
    const values = getFileContent(inputName).split('\n')

    // const a = [1,2];
    // console.log([a[0]+a[1], ...a.slice(4)]);
    // return;

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart1(values, true))
}

solve()