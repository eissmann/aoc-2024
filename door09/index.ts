import {getFileContent} from "../utils/fileHandling";
import {chunk} from "../utils/arrayHandling";

const inputName = __dirname + '/puzzle-input'

const log = (...items: any) => {
    if (process.env.DEBUG) {
        console.log(...items);
    }
}

const solvePart1 = (values: string[]): number[] => {
    const blocks = chunk(values, 2);

    let blockMap: any = [];
    blocks.forEach((block, idx) => {
        const [fileLength, spaces]: any = block;
        block.push(spaces);
        block.push('');
        block.push(idx.toString());

        const arr1 = new Array(+fileLength).fill(idx);

        let arr2: any = [];
        if (spaces && spaces > 0) {
            arr2 = new Array(+spaces).fill('.');
        } else {
            block[1] = '0';
            block[2] = '0';
            block[3] = '';
            block[4] = idx.toString();
        }

        blockMap = [...blockMap, ...arr1, ...arr2];
    });

    // console.log('Blockmap', blockMap);
    const resultMap2 = [...blockMap];


    // part 1
    let i = 0;
    const resultMap = [];
    while (i < blockMap.length) {
        if (blockMap[i] !== '.') {
            resultMap.push(blockMap[i]);
        } else {
            const a = blockMap.pop();
            if (a === '.') {
                continue;
            }
            resultMap.push(a);
        }

        i++;
    }

    // part 2
    // console.log('A', resultMap2);
    // console.log('Blocks', blocks);
    while (blocks.length > 1) {
        // @ts-ignore
        const [bFileLength, bSpaces, _, __, bVal] = blocks.pop();
        log('Data', bFileLength,bSpaces,bVal);

        let start = 0;
        let goOn = true;
        blocks.forEach((b: any, idx) => {
            if (!goOn) {
                return;
            }

            const [fileLength, spaces, spacesleft, _, val] = b;

            start += +fileLength + +spaces - +spacesleft;

            log('Data-Compare', fileLength, spaces, spacesleft, val);
            log('Start', start);

            // if no space left, skip
            if (+spacesleft < +bFileLength) {
                log('No space left', bFileLength, spacesleft);
                start += +spacesleft;
                return;
            }


            // if space left, fill it
            for (let j = 0; j < +bFileLength; j++) {
                log('Replace', resultMap2[+start+j], +start+j, bVal);
                resultMap2[+start+j] = bVal;
            }
            b[2] = +spacesleft - +bFileLength;
            start += +spacesleft;

            for (let x = start; x < resultMap2.length; x++) {
                if (resultMap2[x] === bVal || resultMap2[x] === +bVal) {
                    resultMap2[x] = '.';
                }
            }

            goOn = false;

        });

    }

    // console.log('B', resultMap2);
    // console.log(resultMap2.reduce((acc, val, idx) => val !== '.' ? acc + (+val*idx) : acc, 0))
    //
    // console.log(resultMap);

    return [resultMap.reduce((acc, val, idx) => acc + (val*idx), 0), resultMap2.reduce((acc, val, idx) => val !== '.' ? acc + (+val*idx) : acc, 0)];
}


function solve() {
    const values = getFileContent(inputName).split('')

    console.log('Part 1 and 2:', solvePart1(values))
}

solve()