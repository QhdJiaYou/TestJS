var shu = [1,2,3];
var c = shu || {};   //数组与空对象作或运算还是数组对象
for (let a in shu){
    console.log(shu[a]);
}
console.log(c instanceof Array);

var name = 'es6';   //ES6模板字符串，空格和换行都会被保留
var sayhello = `hello,
my name is ${name}.`;
console.log(sayhello);

var arr = [[1,2],[3,4],[5,6]];  //二维数组先列后行
console.log(arr[1][0]);

var arr1 = new Array();
   for(let i=0;i<5;i++){
       arr1[i] = new Array(i);
       for(let j=0;j<5;j++){
           arr1[i][j] = i;
       }
}
/*
for(let i=0;i<arr1.length;i++){
       for(let j=0;j<arr1[i].length;j++){
           console.log(arr1[i][j]);
       }
}*/
var tes = "0123456789";
var arr = [1,2,3,4,5];
console.log(tes.substring(8,-2));
/*substring(start,end)
下标前包括，后不包括，end不填表示截取到字符串末尾
只能操作字符串对象，start>end时，start和end会互换；start=end时，返回空字符串
start或end为负数时，会在执行前将负数变为0。*/
/*slice(start,end)
下标前包括，后不包括，end不填表示截取到字符串末尾
* 可以操作字符串和数组，可以用负数表示倒数第几位，start>=end时，start和end不会互换，返回空字符串*/
/*substr(start,length)
只能操作字符串对象
与substring相比，第二个参数变成截取字符串的长度，length<=0时，返回空，length不填表示截取到字符串末尾，
start为负数，表示倒数第几位，即start=str.length+start
 */
/*
 * splice(start,length,items)
 * 只能操作数组，从start处截取length长度的元素后，再从start处添加items,返回截取字符串，直接修改原数组
 * start和length必填,若length<=0,则返回空数组，与substr()类似，但是依然可以直接从start下标添加items,
 * start为负数代表倒数第几位开始
 * */
console.log('slice的返回值',arr.slice(4,8));
console.log('原数组',arr);
console.log('substr的返回值',tes.substr(-4,2));
console.log('原字符串',tes);
console.log('splice的返回值是被删除的元素组成的数组',arr.splice(-2,2,12,13,4,5));
console.log('splice后原数组被改变',arr);
var friends = ["Mike", "Stacy", "Andy", "Rick"];

friends.forEach(function (eachName, index){
    //执行回调函数的主函数forEach()会在函数体内通过arguments对象获取回调函数传进来的参数
    //所以Array对象的方法函数里面使用回调函数的参数一定要按顺序来写，获取的时候也是按顺序来的
    console.log(index + 1 + ". " + eachName); // 1. Mike, 2. Stacy, 3. Andy, 4. Rick
});
var numbers = [15.5, 2.3, 1.1, 4.7];
function getSum(total, num) {
    return total + Math.round(num);
}
var total= numbers.reduce(getSum,0);//24
console.log(total);
var total1= numbers.reduce(getSum);//23.5第一个元素没有四舍五入
// 如果没有给第二个参数作为total的初始值，那么回调函数计算的时候将数组的第一个元素赋值给total
console.log(total1);

var foo = {name:"ji",size:12};
foo.yu = 12;//可以直接给对象添加内容
console.log(foo);

function getPoint() {
    const x = 1;
    const y = 10;
    return {x, y};
}
console.log(getPoint());
var tretr="awaefrg";
var regex = new RegExp(/a/ig,'g');
console.log(tretr.match(regex));
console.log(regex.flags);

const REGEX = /a/y;
// 指定从2号位置开始匹配
REGEX.lastIndex = 2;
// 不是粘连，匹配失败
REGEX.exec('xaya') // null
// 指定从3号位置开始匹配
REGEX.lastIndex = 3;
// 3号位置是粘连，匹配成功
const match = REGEX.exec('xaya');
console.log(Array.isArray(match));
console.log(Object.keys(match).length);//4
//数组中存储的对象不是普通类型数据，直接使用.length是获取不到真正的长度的
console.log(match.length); // 1
console.log(REGEX.lastIndex);
//ES6引入Symbol是为了确保同一个对象内的属性名不冲突，是独一无二的值
let s1 = Symbol('foo');
let s2 = Symbol('bar');
console.log(s1);

const obj = {
    toString(){
        return 'abc';
    }
};
const sym = Symbol(obj);//如果Symbol的参数是一个对象，就会自动的调用该对象的toString()方法
console.log(sym.toString()+'fr');//Symbol 值不能与其他类型的值进行运算,但是可以显示的转换成字符串
//Symbol也可以转为boolean，但是不能转为数值
const a = {};
a[sym] = "Hellow";
console.log(a[sym]);

const log = {};

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
a[log.levels.DEBUG] = 1243;
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

console.log(sum(1,1));//变量提升
function sum(x,y) {
    return x+y;
}

let ad = Symbol('a');
//let ad = Symbol('b');//会报错

let arrA = [1,2,3];
let arrB = arrA.slice();//深拷贝
let arrC = [].concat(arrA);//深拷贝
arrA.pop();
console.log(arrA);
console.log(arrB);
console.log(arrC);
