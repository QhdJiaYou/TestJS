function fibonacci (n) {
    if ( n <= 1 ) {
        return 1;
    }
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
//尾调用优化，函数中返回值是一个函数，就属于尾调用
//只有保证不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法实行‘尾调用优化’
function fibonacci2 (n, ac1=1, ac2=1) {
    if ( n <= 1 ) {
        return ac2;
    }
    return fibonacci2(n-1, ac2, ac1+ac2);
}
//尾递归优化后就相当于从小往大算，时间复杂度是O(n)
function fib(n) {
    if(n <= 1){
        return 1;
    }
    let a1=1;
    let a2=1;
    let an=0;
    for(let i=2;i<=n;i++){
        an = a1 + a2;
        a1 = a2;
        a2 = an;
    }
    return an;
}
console.log(fib(5));
/*while (line = readline()){
    print(isPalidrome(line));
}*/
function isPalidrome(str) {
    if(str.split('').reverse().join('') !== str){
        return false;
    }
    if(str.length%2 !== 0){
        return false;
    }
    let i = 0;
    let k = 0;
    let arr = [];
    while(i<str.length-1){
        if(str[i] === str[i+1]){
            arr[k++] = str[i];
            i+=2;
        }else{
            return false;
        }
    }
    return arr.join('');
}
console.log(isPalidrome('aabbcccbbaa'));

//一个字符串只能通过一次交换变成回文串，给定字符串如果可以就返回Yes反之返回No
function printYON(str) {
    let len = str.length;
    let i = 0;
    let j = len - 1;
    let first = [];
    if(str.split('').reverse().join('') === str){
        console.log('No');
        return;
    }
    while(i<=j){
        let pre = str[i];
        let back = str[j];
        if(pre !== back){
            first.push(str[i]);
            first.push(str[j]);
        }
        i++;
        j--;
    }
    if(first.length === 4){
        let set = new Set(first);
        if(set.size === 2){
            console.log('Yes');
        }
    }else{
        console.log('No');
    }
}
let str = 'cabbca';
printYON(str);

//将字符串strObj中的pos下标位置的值替换成replacetext字符
function replacePos(strObj, pos, replacetext)
{
    return  strObj.substring(0, pos) + replacetext + strObj.substring(pos+1, strObj.length);
}
let sss = 'errfgtg';
console.log(replacePos(sss,2,sss[3]));
function swapString(str,i,j) {
    let arr = str.split('');
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr.join('');
}
console.log(swapString(sss,1,3));

/*let num = readInt();
let arr = new Array(num);
for(let i=0;i<arr.length;i++){
    arr[i] = new Array(num);
    for(let j=0;j<arr[i].length;j++){
        arr[i][j] = new Array(num);
    }
}
while(str = read_line()){
    let x,y,z = 0;
    let max = 0;
    let a = str.split(' ');
    arr[parseInt(a[0])][a[1]][a[2]] = a[3];
    if(a[3]>max){
        max = a[3];
        x = a[0];
        y = a[1];
        z = a[2];
    }
    print(getMaxEnergy(arr,x,y,z));
}*/

arr = [[[7,2],[4,3]],[[6,1],[5,0]]];
console.log(getMaxEnergy(arr,0,0,0));

function withinScope(martix,x,y,z) {
    return x>=0&&x<martix.length&&y>=0&&y<martix[0].length&&z>=0&&z<martix[0][0].length;
}
function help(arr,x,y,z,visited) {
    //前进的六个方向
    const stepX = [1,-1,0,0,0,0];
    const stepY = [0,0,1,-1,0,0];
    const stepZ = [0,0,0,0,1,-1];
    let max = arr[x][y][z];
    if(visited[x][y][z]){
        return visited[x][y][z];
    }
    for(let k=0;k<6;k++){
        let a = x+stepX[k];
        let b = y+stepY[k];
        let c = z+stepZ[k];
        if(withinScope(arr,a,b,c)&&arr[a][b][c] < arr[x][y][z]){
            max = Math.max(max,help(arr,a,b,c,visited) + arr[x][y][z]);
        }
    }
    visited[x][y][z] = max;
    return max;
}
function getMaxEnergy(arr,x,y,z) {
    let energy = 0;
    let visited = new Array(arr.length);
    for(let i=0;i<arr.length;i++){
        visited[i] = new Array(arr[0].length);
        for(let j=0;j<arr[0].length;j++){
            visited[i][j] = new Array(arr[0][0].length).fill(0);
        }
    }
    return Math.max(energy,help(arr,x,y,z,visited));
}

//多维数组求最大值的方法
function largest(arr) {
    let newArray = arr.join(',').split(','); //先转化成一维数组，但是转化后的数组每位数字以字符形式存储
    let newArray2 = arr.join(',').split(',').map(val => parseInt(val));   //可以使用map进行转化
    return Math.max.apply(null,newArray);
}

//从字符串s1中删除s2中出现的字符
function remove(s1,s2){
    for(let i=0;len = s2.length,i<len;i++){
        let r = new RegExp(s2[i],'g');
        if(r.test(s1)){
            s1 = s1.replace(r,'');
        }
    }
    return s1;
}
//求最长公共子序列（可以不连续）
function getLCS(stra,strb) {
    let la = stra.length;
    let lb = strb.length;
    let arr = new Array(la+1);
    for(let i=0; i<arr.length; i++){
        arr[i] = new Array(lb+1).fill(0);
    }
    let flag = new Array(la+1);
    for(let i=0; i<flag.length; i++){
        flag[i] = new Array(lb+1).fill(0);
    }
    for(let i=1; i<=la; i++){
        for(let j=1; j<=lb; j++){
            if(stra[i-1] === strb[j-1]){
                arr[i][j] = arr[i-1][j-1] + 1;
                flag[i][j] = 1;    //斜向下标记
            }else if(arr[i-1][j] > arr[i][j-1]){
                arr[i][j] = arr[i-1][j];
                flag[i][j] = 3;   //向下标记
            }else {
                arr[i][j] = arr[i][j-1];
                flag[i][j] = 2;   //向右标记
            }
        }
    }
    console.log('最长公共子序列长度为',arr[la][lb]);
    let i = la;
    let j = lb;
    let res = [];
    while(i>0&&j>0){
        if(flag[i][j] === 1){
            res.push(stra[i-1]);
            i--;
            j--;
        }else if(flag[i][j] === 2){
            j--;
        }else if(flag[i][j] === 3){
            i--;
        }
    }
    return res.reverse().join('');   //最长公共子序列
}
//console.log(getLCS('abcbdab','bdcaba'));
//最长公共子字符串（必须连续）
//穷举法
function maxPublicSubString(stra,strb) {
    let la = stra.length;
    let lb = strb.length;
    let startPosition = 0;
    let maxLen = 0;
    for(let i=0;i<la;i++){     //a串的所有位开头
        for(let j=0;j<lb;j++){  //a串的某一位开头匹配b串的所有位开头
            if(stra[i] === strb[j]){
                let index = 1;
                while (i+index<la&&j+index<lb&&stra[i+index] === strb[j+index]){
                    index++;
                }
                if(index>maxLen){
                    maxLen = index;
                    startPosition = i;
                }
            }
        }
    }
    return stra.substr(startPosition,maxLen);
}
//console.log(maxPublicSubString('ffabcabd','abcabcabd'));
//动态规划
function maxPublicSubStringTwo(a,b) {
    let la = a.length;
    let lb = b.length;
    let maxLen = 0;
    let startPosition = 0;
    let num = new Array(la);
    for(let i=0;i<la;i++){
        num[i] = new Array(lb).fill(0);
    }
    for(let i=0; i<la; i++){
        for(let j=0; j<lb; j++){
            if(a[i] === b[j]){
                if(i === 0||j === 0){
                    num[i][j] = 1;
                }else {
                    num[i][j] = num[i-1][j-1] + 1;
                }
                if(num[i][j]>maxLen){
                    maxLen = num[i][j];
                    startPosition = i + 1 - num[i][j] ;
                }
            }
        }
    }
    return a.substr(startPosition,maxLen);
}
console.log(maxPublicSubStringTwo('ffabcabd','abcabcabd'));
//给定一个序列，求最大子序列的和
function maxSum(arr) {
    if(arr === undefined || arr.length === 0){
        return 0;
    }
    let len = arr.length;
    let maxSum = 0;
    let sum = 0;
    for(let i=0; i<len; i++){
        if(sum >= 0){   //贪心的思想，只要当前累加的和不小于0，说明这个和加上当前的值就有可能是累加和增大
            sum += arr[i];  //对于每个待加的值都是这样的，也就代表着前面的累加和只要不小于0对于待加的值就是有益的
            if(sum > maxSum){
                maxSum = sum;
            }
        }else{
            sum = 0;
        }
    }
    return maxSum;
}
console.log(maxSum([2,3,-5,6,7,-9,10]));
//求字符串的最长回文子串
function manacher(str) {
    if(str === undefined||str.length === 0){
        return null;
    }
    let newArr ='#' + str.split('').join('#') + '#';
    let len = newArr.length;
    let p = new Array(len);
    let mx = 0;
    let id = 0;
    for (let i=0; i<len; i++){
        if(i<mx){
            p[i] = Math.min(p[2*id-i], mx-i);
        }else {
            p[i] = 1;
        }
        while (i-p[i]>=0 && i+p[i]<len && newArr[i-p[i]] === newArr[i+p[i]]){
            p[i]++;
        }
        if(p[i]+i>mx){//我们希望mx尽可能的远，这样才有可能执行if(i<mx)里面的内容，来加速查找
            mx = i + p[i];
            id = i;
        }
    }
    console.log('最长回文子串为',p[id]-1);
    let resStr = newArr.slice(id-p[id]+1,id+p[id]);
    return resStr.replace(/#/g,'');
}
console.log(manacher('abbaopxpoa'));
//KMP算法，字符串匹配
function kmp(str,pattern) {
    if(str === undefined || pattern === undefined)
        return -1;
    let next = getNextArr(str,pattern);
    let i = 0;
    let j = 0;
    let len = pattern.length;
    while (i<str.length && j<len){
        if(j > 0 && pattern[j] !== str[i]){
            j = next[j-1];
        }
        if(pattern[j] === str[i]){
            i++;
            j++;
        }
        if(j===0){
            i++;
        }
    }
    if(j !== len){
        return -1;
    }else{
        return i - len;
    }
}
function getNextArr(str,pattern) {
    let len = pattern.length;
    let next = new Array(len);
    let k = 0;
    next[0] = 0;
    for(let q = 1; q < len; q++){
        while (k > 0 && str[k] !== str[q]){
            k = next[k-1];  //相当于自身跟自身匹配失误时回退的位置
        }
        if(str[k] === str[q]){
            k++;
            next[q] = k;  //相加1后赋值，那么next数组表示它后一位匹配失败时，回退的模式串下标值。
        }else if(k === 0){
            next[q] = 0;
        }
    }
    return next;
}
//console.log(kmp('abcdfrghabcohp','abcohp'));
//console.log('abcdfrghabcohp'.search('abcohp'));