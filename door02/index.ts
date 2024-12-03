import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const solvePart1 = (values: string[]): number => {


    return values.reduce((sum: number, system, idx) => {
        let dir = 0;
        const levels = system.split(' ');

        for(let i = 0; i < levels.length-1; i++) {
            const dirIntern = +levels[i] > +levels[i+1] ? -1 : (+levels[i] < +levels[i+1] ? 1 : 0);

            if (dir === 0) {
                dir = dirIntern;
            }

            if(dirIntern === 0 || dirIntern !== dir) {
                return sum;
            }

            const step = Math.abs(+levels[i] - +levels[i+1]);

            if(step > 3) {
                return sum;
            }
        }

        return sum+1;
    }, 0);
}

const solvePart2 = (values: string[]): number => {

    const unsafe: any[] = [];

    const sum = values.reduce((sum: number, system, idx) => {
        let dir = 0;
        const levels = system.split(' ');

        for(let i = 0; i < levels.length-1; i++) {
            const dirIntern = +levels[i] > +levels[i+1] ? -1 : (+levels[i] < +levels[i+1] ? 1 : 0);

            if (dir === 0) {
                dir = dirIntern;
            }

            if(dirIntern === 0 || dirIntern !== dir) {
                unsafe.push(levels);
                return sum;
            }

            const step = Math.abs(+levels[i] - +levels[i+1]);

            if(step > 3) {
                unsafe.push(levels);
                return sum;
            }
        }


        return sum+1;
    }, 0);

    const sumDampened = unsafe.reduce((sum: number, levels, idx) => {

        for(let j = 0; j < levels.length; j++) {
            const dampened = [...levels];
            dampened.splice(j, 1);

            let valid = false;
            let dir = 0;

            for(let i = 0; i < dampened.length-1; i++) {
                const dirIntern = +dampened[i] > +dampened[i+1] ? -1 : (+dampened[i] < +dampened[i+1] ? 1 : 0);

                if (dir === 0) {
                    dir = dirIntern;
                }

                if(dirIntern === 0 || dirIntern !== dir) {
                    valid = false;
                    break;
                }

                const step = Math.abs(+dampened[i] - +dampened[i+1]);

                if(step > 3) {
                    valid = false;

                    break;
                }

                valid = true;
            }


            if (valid) {
                return sum + 1;
            }
        }

        return sum;

    }, 0)

    return sum + sumDampened;
}

function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2(values))
}

solve()