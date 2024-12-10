export const flipRC = (matrix: string[][]): string[][] => {
    return matrix[0].map((_, index) => matrix.map((row) => row[index]));
}

export const rotate45 = (matrix: string[][]): string[][] => {
    var summax = matrix.length + matrix[0].length - 1; // max len
    var rotated: string[][] = [];
    for( var i=0 ; i<summax ; ++i ) rotated.push([]);

    for( var j=0 ; j<matrix[0].length ; ++j )
        for( var i=0 ; i<matrix.length ; ++i ) rotated[i+j].push(matrix[i][j]);

    // todo: fill up with empty strings to get the diamond shape
    return rotated;
};

export const chunk = (arr: string[], size: number):
    string[][] =>
    arr.reduce((result: string[][], _, index) =>
            (index % size === 0 ? [...result,
                arr.slice(index, index + size)] : result),
        []);