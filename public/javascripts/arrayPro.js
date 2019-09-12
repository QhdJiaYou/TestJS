/*题目：二维数组中，每一行从左到右递增，每一列从上到下递增，
请完成一个函数，输入这样的二维数组arr和一个整数num，判断数组中是否含有该整数*/

/*思路：从数组的右上角开始找，
如果该数字=num,则返回；
如果该数字>num，删除所在列；
如果该数字<num，删除所在行*/
var arr=[[1,2,4,6],[2,4,7,8],[8,9,10,11],[9,12,13,15]];
function findnum(arr, num){
    if(num == null || num ===''){
        console.log(num +"is null");
        return;
    }
    while(arr.length){
        var temp =arr[arr.length-1][0];
        if(temp === num){
            console.log(num+" is find.");
            return temp;
        }else if(temp > num){
            if(arr.length===1){
                console.log(num +" is small.");
                return;
            }
            arr.pop();
        }else{
            for(var i=0;i<arr.length;i++){
                if(arr[i].length === 1){
                    console.log(num + "is large.");
                    return;
                }
                arr[i].shift();
            }
        }
    }
}

var res = findnum(arr,1);
console.log(res);

for(let i=0; i<1; i++){
    let num = 2;
    if(num>=0&&num<2){
        res = (-1)*num + 2.5;
    }else if(num>=2&&num<4){
        res = 2-(1.5 * Math.pow(num-3,2));
    }else if(num>=4&&num<6){
        res = num/2 - 1.5;
    }
    let r = res.toFixed(1);
    console.log('y='+ r );
}

function sum(num){
    let res = 0;
    for(let i = num;i <= 2*num; i++){
        res += i;
    }
    return res;
}
//console.log(sum(Math.abs(-33)));
let num = -33;
if(num >= 0){
    console.log(sum(num));
}else{
    let res = -sum(Math.abs(num));
    console.log(res);
}
let r = count(13);
console.log(Array.isArray());
function count(num){
    let arr = [];
    for(let j = 0;j<num;j++){
        arr.push(j+1);
    }
    let c = 0;
    let coun = 1;
    let i = 0;
    let res = [];
    while(c<num){
        if(i>num-1){
            i=0;
        }
        if(arr[i] !== 0) {
            if (coun !== 3) {
                coun++;
            } else {
                res.push(arr[i]);
                arr[i] = 0;
                coun = 1;
                c++;
            }
        }
        i++;
    }
    return res;
}

function findNUM(arr, num) {
    if(num === null || !Number.isInteger(num)) {
        return;
    }
    while(arr.length) {
        const flag = arr[arr.length-1][0];
        if(flag === num) {
            return true;
        } else if(flag > num) {
            if(arr.length === 1) return false;
            arr.pop();
        } else {
            if(arr[0].length === 1) {
                return false;
            } else {
                for(let i=0; i<arr.length; i++) {
                    arr[i].shift();
                }
            }
        }
    }
    return false;
}
console.log(findNUM(arr,14));
