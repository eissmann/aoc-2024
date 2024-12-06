import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const log = (...items: any) => {
    if (process.env.DEBUG) {
        console.log(...items);
    }
}

const solvePart1 = (values: string[][]): number[] => {
    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    let results = [];

    let dir = 3;
    let pos = [0, 0];
    let initialPos = [0,0];
    for(let i = 0; i < values.length; i++) {
        const y = values[i].indexOf('^');
        if (y > -1) {
            pos = [y, i];
            initialPos = [y, i];
            break;

        }
    }

    results.push(`${pos[0]},${pos[1]}`);
    log(pos);

    const isObstacle = (pos: number[], values: string[][]) => {
      return values[pos[1]][pos[0]] === '#';
    };

    const isEnd = (pos: number[], values: string[][]) => {
        return pos[0] === values[0].length || pos[1] === values.length || pos[0] < 0 || pos[1] < 0;
    }

    while (!isEnd(pos, values)) {
        let newPos = [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
        if (isEnd(newPos, values)) {
            break;
        }

        if (isObstacle(newPos, values)) {
            dir = (dir + 1) % 4;
        } else {
            pos = newPos;
            results.push(`${pos[0]},${pos[1]}`);
        }
    }


    // part 2
    const possibleNewObstacles = [...new Set(results)];
    possibleNewObstacles.shift();
    dir = 3;
    pos = initialPos;
    let results2: string[] = [];
    let count = 0;

    const isLoop = (pos: number[]) => {
        return results2.includes(`${pos[0]},${pos[1]},${dir}`);
    };

    log(possibleNewObstacles);

    possibleNewObstacles.forEach((obstacle: string) => {
        const newValues = [...values.map(value => [...value])];
        const [x, y] = obstacle.split(',').map(value => parseInt(value));
        newValues[y][x] = '#';
        log(newValues.map(value => value.join('')).join('\n'));

        while (!isEnd(pos, newValues)) {
            log(pos, dir, directions[dir]);
            let newPos = [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
            log(newPos);

            if (isEnd(newPos, newValues)) {
                log('end', newPos);
                break;
            }
            if (isLoop(newPos)) {
                log('loop', newPos);
                count++;
                break;
            }

            if (isObstacle(newPos, newValues)) {
                log('obstacle', newPos, dir, directions[dir]);
                dir = (dir + 1) % 4;
            } else {
                log('move', newPos);
                pos = newPos;
                results2.push(`${pos[0]},${pos[1]},${dir}`);
            }
        }

        pos = initialPos;
        dir = 3;
        results2 = [];


    });

    return [[...new Set(results)].length, count];
}

const solvePart2 = (values: string[]): number => {
    return 0;
}


function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1,2:', solvePart1(values.map(value => value.split(''))));
}

solve()