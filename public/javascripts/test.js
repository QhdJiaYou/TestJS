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
console.log(/^\d+$/.test(45));
let ab = new Uint8Array(1);
ab[0] = -1;
console.log(ab[0]);
let ar = new Array(8);
console.log(ar[1]);
let sstr = 'abcdfabrgab';
console.log((/(ab)(cd)/g).exec(sstr));
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

let aaa = 'a';
let bbb = 'b';
/*da.push([aaa,bbb]);
console.log(da);*/

let da = [];
da['a'] = '1';
da['b'] = '2';
console.log(da.length);
for (let i in da){
    console.log(da[i]);
}
