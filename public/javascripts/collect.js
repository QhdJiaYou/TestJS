let set = new Set(['1','2','3','3']);
let arr = [...set];//去重
console.log(Array.isArray(arr));
let arr1 = [1,2,3,3,4];
let arr2 = Array.from(new Set(arr1));//去重
console.log(arr2);
console.log(set.constructor);
set = new Set([...set].map(x => x * 2));
console.log(set);
set = new Set([...set].filter(x => (x%2) === 0));
console.log(set.size);
//由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值）
console.log('set的键名遍历',[...set.keys()]);
console.log('set的键值遍历',[...set.values()]);
//Map与其他数据结构的相互转换
//(1)Map->数组Array
const myMap = new Map().set('1',true).set('0',false);
let myArray = [...myMap];
console.log(myArray);
//(2)数组Array->Map
let myMap1 = new Map(myArray);
console.log(myMap1);
//(3)Map->对象Object，
function strMaptoObj(strMap) {
    let obj = Object.create(null);
    for(let [k,v] of strMap){
        obj[k]= v;
    }
    return obj;
}
//如果所有 Map 的键都是字符串，它可以无损地转为对象。
const myObj = strMaptoObj(myMap);
console.log(myObj);
//如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
let myMap2 = new Map().set({name:"john"},1);
const  myObj1 = strMaptoObj(myMap2);
console.log(myObj1);
//(4)对象Object->Map，对象不具备Iterator接口，所以不能直接作为Map的参数初始化Map
function objToStrMap(obj) {
    let strMap = new Map();
    for(let k of Object.keys(obj)){
        strMap.set(k,obj[k]);
    }
    return strMap;
}
console.log(objToStrMap(myObj1));//非字符串的键名转换不过来了
//(5)Map->JSON
//Map 的键名都是字符串，这时可以选择转为对象 JSON
function strMapToJson(strMap){
    return JSON.stringify(strMaptoObj(strMap));
}
console.log(strMapToJson(myMap));
//Map 的键名有非字符串，这时可以选择转为数组 JSON
function strMapToArrayJson(strMap) {
    return JSON.stringify([...strMap]);
}
console.log(strMapToArrayJson(myMap2));
//(6)JSON->Map
//所有键名都是字符串
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
console.log(jsonToStrMap('{"name":2,"sex":3}'));
//整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}
console.log(jsonToMap('[[true,7],[{"name":3},["de"]]]'));



