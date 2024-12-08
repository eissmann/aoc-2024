import {getFileContent} from "../utils/fileHandling";

const inputName = __dirname + '/puzzle-input'

const log = (...items: any) => {
    if (process.env.DEBUG) {
        console.log(...items);
    }
}

const solvePart1 = (values: string[]): number[] => {
    const positions = values.map(value => value.split(''));
    const maxX = positions[0].length - 1;
    const maxY = positions.length - 1;

    const antennas: any = {}

    // find antennas
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            if (positions[y][x] === '.') {
                continue;
            }
            if(!antennas[positions[y][x]]) {
                antennas[positions[y][x]] = [];
            }

            antennas[positions[y][x]].push([x, y]);
        }
    }
    const isValid = (x: number, y: number) => {
        return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
    }

    const findAntinodes = (nodes: any) => {
        const [x, y] = nodes[0];
        // console.log(x, y);
        let antiNodes: any = [];

        nodes.slice(1).forEach((node: any) => {
            const [x2, y2] = node;
            const dx = x2 - x;
            const dy = y2 - y;

            if (isValid(x2 + dx, y2 + dy)) {
                antiNodes.push(`${x2 + dx},${y2 + dy}`);
            }

            if (isValid(x - dx, y - dy)) {
                antiNodes.push(`${x - dx},${y - dy}`);
            }
        });

        if (nodes.length > 1) {
            antiNodes = [...antiNodes, ...findAntinodes(nodes.slice(1))]
        }

        return antiNodes;
    }

    const findAntinodes2 = (nodes: any) => {
        const [x, y] = nodes[0];
        // console.log(x, y);
        let antiNodes: any = [];

        nodes.slice(1).forEach((node: any) => {
            const [x2, y2] = node;
            // add antennas as well, if at least second one was found
            antiNodes.push(`${x2},${y2}`);
            antiNodes.push(`${x},${y}`);

            const dx = x2 - x;
            const dy = y2 - y;

            let ok = true;
            let tmpX = 0;
            let tmpY = 0;
            while (ok) {
                tmpX += dx;
                tmpY += dy;
                if (isValid(x2 + tmpX, y2 + tmpY)) {
                    antiNodes.push(`${x2 + tmpX},${y2 + tmpY}`);
                } else {
                    ok = false;
                }
            }

            ok = true;
            tmpX = 0;
            tmpY = 0;
            while (ok) {
                tmpX += dx;
                tmpY += dy;
                if (isValid(x - tmpX, y - tmpY)) {
                    antiNodes.push(`${x - tmpX},${y - tmpY}`);
                } else {
                    ok = false;
                }
            }
        });

        if (nodes.length > 1) {
            antiNodes = [...antiNodes, ...findAntinodes2(nodes.slice(1))]
        }

        return antiNodes;
    }

    let antinodes: any = [];
    let antinodes2: any = [];

    for (const antenna in antennas) {
        if (antennas[antenna].length === 1) {
            continue;
        }
        // console.log(antenna);
        // find anti-nodes
        antinodes = [...antinodes, ...findAntinodes(antennas[antenna])];
        antinodes2 = [...antinodes2, ...findAntinodes2(antennas[antenna])];

    }

    // console.log(antinodes);

    return [new Set(antinodes).size, new Set(antinodes2).size];
}

function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1, 2:', solvePart1(values))
}

solve()