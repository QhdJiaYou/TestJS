//不使用loop循环，创建一个长度为100的数组，并且每个元素的值等于它的下标
const arr = new Array(10);
console.log(arr.length);//JS是稀疏数组，在给数组赋值之前是个空数组，map不会对空数组进行遍历
console.log(arr.fill(0).map((value, index) => index ));
//实现对数组进行乱序
let array = [1,2,3,4,5,6,7,8,9,10,11,12];
let sign = 1;
array.sort((a,b) => {
   sign = (Math.random()>0.5) ? 1 : -1;
   return (a-b)*sign;
});
//.log(array);
let array1 = [1,2,3,4,5,6,7,8,9,10,11,12];
//有一个长度为100的数组，请以优雅的方式求出该数组的前10个元素之和
const sum = array1.slice(0,10).reduce((prevValue, currentValue) =>
    prevValue + currentValue, 0);
//console.log(sum);
var object = {
    b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
};
function parse(obj, str) {
    let temp = obj;
    let strs = str.split('.');
    for(let i=0; i<strs.length; i++) {
        let res = strs[i].split(/[\[|\]]/g);
        for(let j=0; j<res.length; j++){
            if(res[j] !== ''){
               temp = find(temp,res[j]);
               if(temp === -1) {
                   return 'undefined';
               }
            }
        }
    }
    return temp;
}
function find(obj, s) {
    if(Array.isArray(obj) && !isNaN(s)){
        return obj[Number(s)];
    }else if(typeof obj === 'object'){
        for(let item in obj){
            if(item === s){
                return obj[s];
            }
        }
    }else {
        return -1;
    }
}
console.log( parse(object,'b.c'));

//打印指定行数的金字塔
function print(rowCount) {
    let p = '';
    let res = new Array(rowCount);
    for(let i=0; i< rowCount; i++){
        res[i] = new Array(rowCount*2 - 1);
        res[i].fill(' ');
    }
    for(let i=0; i< rowCount; i++) {
        let temp = i;
        let index = rowCount - i -1;
        while(temp >0) {
            res[i][index] = '1';
            temp--;
            index += 2;
        }
        res[i][index] = '1';
    }
    for(let i=0; i<rowCount; i++) {
        p += res[i].join('') + '\n';
    }
    return p;
}

//console.log(' '.repeat(4) + '34');
//console.log(print(6));
//获取url中的参数
function getUrlParam1(sUrl, sKey) {
    let s = sUrl.split(/\?|#/g);
    let p = '';
    let res = {};
    for(let i=0; i<s.length; i++){
        if(s[i].includes('&')){
            p = s[i];
        }
    }
    if(p === ''){
        return {};
    }
    let para = p.split('&');
    for(let i=0; i<para.length; i++) {
        const f = para[i].split('=');
        if(f.length > 1) {
            if(!res[f[0]]) {
                res[f[0]] = f[1];
            } else {
                const t = res[f[0]];
                res[f[0]] = [].concat(t, isNaN(f[1])? f[1]: Number(f[1]));
            }
        }
    }
    if(sKey) {
       for(let item in res) {
           if(item === sKey){
               return res[sKey];
           }
       }
       return '';
    } else {
        return res;
    }
}

function getUrlParam(sUrl,sKey) {
    var result = {};
    sUrl.replace(/\??(\w+)=(\w+)&?/g, function (a, k, v) {
        if (result[k] !== void 0) {
            var t = result[k];
            result[k] = [].concat(t, v);
        } else {
            result[k] = v;
        }
    });
    if (sKey === void 0) {
        return result;
    } else {
        return result[sKey] || '';
    }
}

let http = 'http://www.nowcoder.com?key=1&key=2&key=gygg&test=4#hehe';
console.log(getUrlParam(http, 'key'));
console.log(void 0);

var _input = ['0 0 2 4','0 2 2 2','0 4 2 2','8 8 2 2'];
function solution(input) {
    if(!input || input.length === 0){
        return 0;
    }
    let res = '';
    let temp = [];
    for(let i=0; i<input.length; i++){
        temp = input[i].split(' ').map(val => parseInt(val));
        let len = temp.length;
        let t = new Array(len).fill(0);
        for(let j=0; j<len-1; j++) {
            if (temp[j] === temp[j + 1]) {
                temp[j] = 2 * temp[j];
                temp[j + 1] = 0;
            }
        }
        for(let k=0, i=0; k<len && i <len; ){  //不要不舍得开数组
            if(temp[k] !==0){
                t[i] = temp[k];
                i++;
            }
            k++;
        }
        res += t.join(' ') + '\n';
    }
    return res;
}
console.log(solution(_input));

function quickSort(arr){
    if(!arr)
        return;
    let len = arr.length;
    if(len < 2){
        return arr;
    }
    let flag = arr[0];
    let right = [];
    let left = [];
    for(let i=1; i<len; i++){
        if(arr[i] > flag){
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return quickSort(left).concat(flag, quickSort(right));
}

console.log(quickSort([2,4,1,5,6,6]));

let strrr = 'js123ldka78sdassdfd653';

function getNumbers(str){
    let res = [];
    let reg = /\d+/g;
    str.replace(reg, function (a) {
        res.push(Number(a));
    });
    return res;
}
console.log(getNumbers(strrr));
//去重
function uniqueArr(arr){
    return arr.reduce((pre,cur) => pre.includes(cur)? pre : [...pre, cur], []);
}
//平铺
function flatArr(arr){
    return arr.reduce((pre,cur) => pre.concat(Array.isArray(cur)? flatArr(cur): cur), []);
}
//排序
function quicksort(arr){
    if(!arr) return;
    if(arr.length < 2) return;
    let flag = arr[0];
    let right = [];
    let left = [];
    for(let i=1; i<arr.length; i++){
        if(arr[i]<flag){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(flag, quickSort(right));
}

let arrayunique = [1,3,4,6,4,5,NaN,NaN,{},{}];
console.log(uniqueArr(arrayunique));
let ar =  [[4],[[4,5]],[1,2]];
console.log(quicksort(flatArr(ar)));
let resarr = ar.join(',').split(',').map(val => parseInt(val));
console.log(resarr);