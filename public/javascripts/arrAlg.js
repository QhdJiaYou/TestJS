//平铺数组[1,[2,3],4,[4,5,6]]
//方法1
var str = [];
function flatt(arr){
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            flatt(arr[i]);
        }else {
            str.push(arr[i]);
        }
    }
    return str;
}
let s = [1,[2,3],7,[4,[3,4],5,6]];
console.log(flatt(s));
//方法2
function * f(arr) {
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            yield * f(arr[i]);
        }else{
            yield arr[i];
        }
    }
}
/*for(let i of f(s)){
    console.log(i);
}*/
console.log([...f(s)]);

//方法3(ES6)
//s.flat(2);
//方法4: 如果数组中的类型只有数值类型时，可以使用下面的方法
console.log(s.join(',').split(',').map(value=> parseInt(value)));
//方法5,concat是深度拷贝，参数可以是值也可以是数组，返回的新数组中添加的都是值
const flatten = function (arr) {
    return arr.reduce((acc,val) => acc.concat(val),[]); //这样只能平铺二维数组
};
//下面的写法可以平铺多维数组
const flatten2 = function (arr) {
    return arr.reduce((acc,val) => acc.concat(Array.isArray(val)? flatten2(val): val),[]);
};
function f(arr){
    return arr.reduce((pre,cur) => Array.isArray(cur)? pre.concat(f(cur)): pre.concat(cur), []);
}
console.log(flatten2(s));

let str2 ="1234";
console.log(parseInt(str2));
//没有通过new声明的字符串就是基本数据类型，并不是String的实例
console.log(str2 instanceof String); //false
let arr1=[1,2,[3,4]];  //数组无论怎么声明都是Array的实例，是引用类型
//判断是Array的几种方法
console.log(arr1 instanceof Array);
console.log(arr1.constructor.toString().indexOf('Array') > -1);
console.log(Array.isArray(arr1));
console.log('判断数组',Object.prototype.toString.call(()=> true));
console.log(arr1.toString());
console.log(Number(9.125).toString(2));//将10进制数字转换成多少进制的字符串
console.log(parseInt('10',2));//按什么进制将字符串解析成10进制数
console.log(isNaN(null));
//全局的isNaN函数会试图判断参数能否通过Number()转化为合法的数字
//所以null、空串''、空数组[]、都可以被Number()合法转化为0,它们被isNaN认为是数，返回false
//undefined、空对象{}、空函数等无法转化为数字，返回true

//
function is(obj,type){
    return (type === "Null" && obj === null) ||
        (type === "Undefined" && obj === undefined) ||
        (type === "Number" && Number.isFinite(obj)) ||
        Object.prototype.toString.call(obj).slice(8,-1) === type;
}
console.log('是数组吗', is(arr1, 'Array'));
//带小数的数值由十进制转二进制
console.log(Number(9.125).toString(2));
//带小数的数值由二进制转10进制
function eachBinaryFloatToDecimal(arr) {
    return arr.map((val, index) =>
        val * Math.pow(2,-(index + 1))
    );
}
function fromBinaryToTen(number){
    if(Number.isInteger(number)){
        return parseInt(number.toString(),2);
    }
    let partion = number.toString().split('.');
    let integerPart = parseInt(partion[0].toString(),2);
    let decimalPart = partion[1].split('');
    let decimal = eachBinaryFloatToDecimal(decimalPart).reduce((pre,cur) => pre + cur);
    return integerPart + decimal;
}
console.log(fromBinaryToTen(1001.001));

//生成指定位数的随机字符串
//toString()的参数可以是2~36之间的任意整数，表示进制，默认不写就是10（十进制）
console.log('输出',String(Math.random()).substr(2,4));
console.log(String.fromCharCode(97));
function random(num){
    let res ='';
    let min = 'a'.charCodeAt(0);
    let max = 'z'.charCodeAt(0);
    for(let i = 0;i<num;i++){
        let randomCharcode = Math.floor(Math.random()*(max-min+1)) + min;
        res += String.fromCharCode(randomCharcode);
        //console.log(res[0]);
    }
    return res;
}
console.log(random(9));

//字符串中str.charAt(i)和str[i]下标的方式只能访问值，不能修改值
//字符串本来就是只读的值类型变量
let ss = 'fegt';
console.log(ss.charAt(0) === 'f');
ss[1] = ss[2];
console.log(ss);

let arr=[1,,null,false,undefined,3];
let newArr=[];
arr.forEach(item=>{
    if(item){
        newArr.push(item);
    }
});
console.log(newArr);
//一维数组转二维数组
let arry=[{code:1,data:'John'},{code:1,data:'ihh'},{code:2,data:'toe'},{code:2,data:'toe'}];

let two = arry.reduce((res,cur)=>{
        res[cur.code]? res[cur.code].push(cur):res[cur.code] = [cur];
        return res;
        },{});//初始值是空对象，转换成的对象的值是二维数组中的值
console.log(Object.entries(two));

//parseInt()默认有两个参数，第二个参数是进制数。当parsrInt没有传入参数的时候
//而map()中的回调函数时候，会给它传三个参数，第二个参数就是索引，明显不正确，所以返回NaN了。
console.log(['1','2','3'].map(parseInt));
//如果想得到[1,2,3]怎么做
function returnInt(ele) {
    return parseInt(ele,10);
}
console.log(['1','2','3'].map(returnInt));
