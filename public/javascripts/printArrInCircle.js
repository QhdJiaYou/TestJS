function printMatrix(numbers, col, row){
    if(!numbers || col <= 0 || row <=0)
        return;
    let start = 0;
    while(col > start*2 && row > start*2){
        printMatrixInCircle(numbers,col,row,start);
        ++start;
    }
}
function printMatrixInCircle(numbers,col,row,start){
    let endX = col - 1 - start;
    let endY = row - 1 - start;

    for(let j=start; j<= endX; ++j){
        let number = numbers[start][j];
        print(number);
    }
    if(start < endY){
        for(let i= start + 1; i<= endY; i++){
            let number = numbers[i][endX];
            print(number);
        }
    }
    if(start < endY && start < endX){
        for(let i=endX-1; i>= start; i--){
            let number = numbers[endY][i];
            print(number);
        }
    }
    if(start<endY - 1&&start<endX){
        for(let i=endY-1; i>=start + 1; i--){
            let number = numbers[i][start];
            print(number);
        }
    }
}
let arr = [[1,2,3],[4,5,6],[7,8,9]];
function print(num) {
    console.log(num);
}
printMatrix(arr,3,3);