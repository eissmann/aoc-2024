export const flipRC = (matrix: string[][]): string[][] => {
    return matrix[0].map((_, index) => matrix.map((row) => row[index]));
}

export const rotate45 = (matrix: string[][]): string[][] => {
    var summax = matrix.length + matrix[0].length - 1; // max len
    var rotated: string[][] = [];
    for( var i=0 ; i<summax ; ++i ) rotated.push([]);

    for( var j=0 ; j<matrix[0].length ; ++j )
        for( var i=0 ; i<matrix.length ; ++i ) rotated[i+j].push(matrix[i][j]);

    return rotated;
};