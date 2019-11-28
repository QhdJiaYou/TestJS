let a = new Array(5);
for(let i =0;i<a.length;i++)
    a[i] =0;
console.log(a);

let b = 123456;
console.log(b%1000000);

let c = new Array(0);
//等同于let c = [];
console.log(c[0] === undefined);//true
console.log(c[0] === null);  //false
console.log(c[0] == null);   //true
console.log(c.length);    //0
console.log(c == null); //false
console.log(null === undefined); //false
console.log(null == undefined); //true

let d = [12,34,4];
d.length = 0;
console.log(d);

let ay = new Array(4);
//ay.length = 0;
console.log(ay.length);
console.log(ay[0]);

let ax = [];
console.log(ax.length);
console.log(ax[0]);
console.log(/^\d+$/.test('34'));

let ab = new Uint8Array(1);
ab[0] = -1;
console.log('ab的值', ab[0]);

let sstr = 'abcdfabrgab';
console.log((/(ab)|(cd)/g).exec(sstr));

//统计字符串中最多字母个数
function maxWordNum(str) {
    let obj = {};
    for(let i=0;i<str.length;i++){
        let v = str[i];
        if(obj[v]>0){
            obj[v]++;
        }else {
            obj[v] = 1;
        }
    }
    let max = 0;
    for(let k in obj){
        if(obj[k] > max){
            max = obj[k];
        }
    }
    return max;
}
console.log(maxWordNum('aaaabbbhhkkkkdaadfbdg'));
//实现一个函数对JS5种主要数据类型（Number,String,Object,Array,Boolean）进行值复制
function clone(obj) {
    var o;
    switch (typeof obj) {
        case "undefined":
            break;
        case "string":
            o = obj + '';
            break;
        case "boolean":
            o = obj;
            break;
        case "number":
            o = obj - 1;
            break;
        case "object":
            if(obj === null){
                o = null;
            }else{
                if(Array.isArray(obj)){
                    o =[];
                    for(let i=0;i<obj.length;i++){
                        o.push(clone(obj[i]));
                    }
                }else {
                    o ={};
                    for(let i in obj){
                        o[i] = clone(obj[i]);
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
}
//清除字符串前后的空格
function trim(str) {
    if(str && typeof str === 'string'){
        return str.replace(/(^\s*)|(\s*$)/g,'');
    }
}
console.log(trim('  ert tgth  '));

/*let aaa = 'a';
let bbb = 'b';
let da = [];
da.push([aaa, bbb]);
console.log(da);*/

let da = [];
da['a'] = '1';
da['b'] = '2';
console.log(da); // 以字母为key值的数组不算长度
console.log(da.length); // 以字母为key值的数组不算长度
for (let i in da){
    console.log(da[i]);
}

let arr1 = [{name: 123},{age: 435}];
let arr2 = [3,4,5];
let arr3 = arr2.concat(arr1,234);
arr1[0].name = 3455;
console.log(arr3);
arr2.copyWithin(1,0,2);
let iterableO = arr2.entries();
console.log(iterableO);
let nextO = iterableO.next();
while (!nextO.done) {
    console.log(nextO.value);
    nextO = iterableO.next();
}
let len = arr2.reduce((total, value) => total + value);
console.log(len);
console.log(arr2);

function checkAge(currentValue, index, arr) {
   return currentValue > 18;
}
let age = [4,45,67];
console.log(age.find(checkAge));
age.forEach((value,index,arr) => {arr[index] = value * 2});
let obj = {name:1,age:2};
console.log(Array.from('hiijo'));

let aaay = [{child: [{name: 'rer'},{size: 34}]}, {name: [3,4]}];
const byv = aaay[0].child;
byv.pop();  //对aaay有影响
// aaay.splice(0,1);  //对byv没影响
console.log(byv);
console.log(aaay[0].child);

let sreg = '234_4566';
let reg = /(?<=^[0-9]*)(_)(?=[0-9]*$)/g;
console.log('测试',sreg.replace(reg, '$`'));
let regRes = reg.exec(sreg);
console.log(regRes);

let bibao = (function () {
    let counter = 0;       //闭包可以使变量私有化
    return function () {
        return counter += 1;
    }
})();    //最外层函数执行后返回每次可以给count加1的函数
bibao();
bibao();
console.log(bibao());

const str = String.fromCharCode(66,67);  // BC
let str1 = str.repeat(2);
console.log(str1);
console.log(str1.split('',2));

//随机生成指定位数字符串
function f(num) {
    let res = '';
    let min = 'a'.charCodeAt(0);
    let max = 'z'.charCodeAt(0);
    for(let i=0; i<num; i++){
        //Math.random()返回的值范围是[0,1）
        res += String.fromCharCode((Math.random() * (max - min + 1)) + min); // 范围包括z
        // res += String.fromCharCode((Math.random() * (max - min)) + min);  //范围不包括z
    }
    return res;
}
console.log(f(5));

const str2 = 'how';
const regg = 'ow';
const arrreg = str2.match(regg);
console.log(arrreg);

var s = 'aaa_aa_a';
var r1 = /a+/gi;
var r2 = /a+/y;

let srrser = s.match(r2);
console.log(srrser);
let ssss = s.match(r2);
console.log(ssss);
let srrser1 = s.match(/a+/g);
console.log('匹配的是',srrser1);

let ssyu = s.split(r1, 2);
console.log(ssyu);
const bstr = s.replace(r1, 'b');
console.log(bstr);


console.log(r1.exec(s).input); // ["aaa"]  //全局匹配时，执行一次exec匹配一个,非全局匹配时，执行多次始终返回第一个匹配
console.log(r1.unicode);
console.log(r2.exec(s)); // ["aaa"]
console.log(r2.sticky);
console.log(r1.exec(s)); // ["aa"]
console.log(r2.lastIndex);
console.log(r2.exec(s)); // null    //下次匹配也必须从开头开始

let arr = ' dehfdefrf';
let array = arr.split('');
console.log(array.toString());
console.log(array);
console.log(array.join(''));
console.log(array.slice(2,5));
console.log(arr.trim());
console.log(arr);

const duixiang = {};
duixiang[123] = 6;
console.log(duixiang[12]);


let objj = {'12': 34, '67': 89};
function f1(id, obj) {
    if (obj[id]) {
        obj[id] = 1234;
    }
}
f1(12,objj);
console.log(objj);
let newtest = ['derfr', 1];

let newA = [1,2];
let newB = [].concat(newA);
newB.push(3);
console.log(newA);


let colorMap = new Array(4).fill([]);
colorMap[0].push(1);
console.log(colorMap[0]);

let check = ' ';
if(!check){
    console.log(typeof NaN);
}

let xiaoshu = 123.56677;
console.log(xiaoshu.toFixed(2) === '123.57');

let testatt = [1,2,3];
for(let i=0; i<0; i++){//每次执行必须满足条件，包括第一次
    console.log('yes');
}
console.log(testatt.reverse());
console.log(testatt);

let obj1 = 'rt';
console.log(obj1.split(/rt/));

let timeout = setTimeout(() => {
    console.log(2);
},1000);

if(timeout) clearTimeout(timeout);

if(timeout){
    console.log(timeout);
}
var quanju = 2;
function f2() {
    console.log(quanju); //undefined
    var quanju = 4;
}
f2();
console.log(quanju);