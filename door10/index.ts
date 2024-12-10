import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const log = (...items:any) => {
    if (process.env.DEBUG) {
        console.log(...items);
    }
}

const solvePart1 = (values: string[]): number[] => {
    const matrix = values.map(row => row.split('').map(Number));

    const maxX = matrix[0].length;
    const maxY = matrix.length;
    const trailheads:any = [];

    const checkPath = (p1: [number, number], p2:[number, number], trailhead: string): boolean => {
        // p2 not out of bounds
        if (p2[0] < 0 || p2[1] < 0 || p2[0] >= maxX || p2[1] >= maxY) {
            return false
        }

        const from = matrix[p1[1]][p1[0]];
        const to = matrix[p2[1]][p2[0]];

        const result = [];
        if (to - from === 1) {

            if (to === 9) {
                if (!trailheads[trailhead]){
                    trailheads[trailhead] = [`${p2[0]},${p2[1]}`];
                } else {
                    trailheads[trailhead].push(`${p2[0]},${p2[1]}`);
                }
                return true;
            }

            result.push(checkPath(p2, [p2[0] + 1, p2[1]], trailhead));
            result.push(checkPath(p2, [p2[0] - 1, p2[1]], trailhead));
            result.push(checkPath(p2, [p2[0], p2[1] + 1], trailhead));
            result.push(checkPath(p2, [p2[0], p2[1] - 1], trailhead));
        }

        return result.includes(true);

    }


    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (matrix[y][x] === 0) {
                const trailhead = `${x},${y}`;
                checkPath([x, y], [x + 1, y], trailhead);
                checkPath([x, y], [x, y + 1], trailhead);
                checkPath([x, y], [x - 1, y], trailhead);
                checkPath([x, y], [x, y - 1], trailhead);
            }
        }
    }

    // loop through trailheads and count unique 9s
    let acc = 0;
    for (const key in trailheads) {
        acc += new Set(trailheads[key]).size;
    }

    // part 2
    let acc2 = 0;
    // loop through trailheads and count number of ways to a 9
    for (const key in trailheads) {
        const marker: any = [];
        for (let i = 0; i < trailheads[key].length; i++) {
            if (marker.includes(trailheads[key][i])) {
                continue;
            }
            acc2 += trailheads[key].filter((val: string) => val === trailheads[key][i]).length;
            marker.push(trailheads[key][i]);
        }
    }

    return [acc, acc2];
}

function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1 and 2:', solvePart1(values))
}

solve()