import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const solvePart1 = (values:string[]): number[] => {
    const [rules, updates] = values.map(v => v.split('\n'))

    const before: any = [];
    const after: any = [];
    rules.forEach((rule) => {
        const [key, value] = rule.split('|');
        if (!before[key]) {
            before[key] = [];
        }
        before[key].push(+value);

        if (!after[value]) {
            after[value] = [];
        }
        after[value].push(+key);
    });

    const valid: any = [];
    const newValid: any = [];

    updates.forEach((update, idx) => {
        let isValid = true;
        const values: string[] = update.split(',');
        for (let i = 0; i < values.length; i++) {
            if (i < values.length-1 && values.slice(i).some((value) => before[value]?.includes(+values[i]))) {
                isValid = false;
                break;
            }

            if(i > 0 && values.slice(0, i-1).some((value) => after[value]?.includes(+values[i]))) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            valid.push(values[(values.length-1) / 2]);
            return;
        }

        // part 2
        const checked: any = [];
        const toBeProcessed: any = [];

        const dict: any = [];
        for (let i = 0; i < values.length; i++) {
            // fill with all values, that need to be checked for this value
            dict[values[i]] = values.filter((v) => before[values[i]]?.includes(+v)).length;
            // console.log(values, values[i], acc[values[i]], dict[values[i]]);
        }

        for (let i = 0; i < values.length; i++) {
            if (dict[values[i]] === 0) {
                toBeProcessed.push(values[i]); // use values that don't need to be checked further, e.g. no rule exists for the numbers in the set
            }
        }

        while (toBeProcessed.length > 0) {
            const value = toBeProcessed.shift(); // take first page, since it's on the correct position
            checked.push(value);
            after[value]?.forEach((v: number) => { // check fo all following numbers
                if (!dict[v]) { // if not in set do nothing
                    return;
                }

                dict[v] -= 1;
                if (dict[v] === 0) { // if no other number can follow, it's on the correct position
                    toBeProcessed.push(v);
                }
            });
        }

        // console.log(dict, checked, checked[(checked.length-1) / 2]);
        newValid.push(checked[(checked.length-1) / 2]);

    });


    return [valid.map(Number).reduce((a: number, b: number) => a + b, 0), newValid.map(Number).reduce((a: number, b: number) => a + b, 0)];
}

const solvePart2 = (values: string[]): number => {
    return 0;
}


function solve() {
    const values = getFileContent(inputName).split('\n\n')
// console.log(values);
    console.log('Part 1:', solvePart1(values))

    // console.log('Part 2:', solvePart2(values))
}

solve()