//非构造函数的继承
var Chinese = {
    nation:'中国',
    birthPlace:['beijing','shanghai','xianggang']
};
//方法一
//把子对象的prototype属信得过指向父对象,从而使得子对象与父对象连在一起
function object(Parent){
    function F() {}
    F.prototype = Parent;
    return new F();
}
console.log(typeof object);
var Doctor = object(Chinese);  //先在父对象的基础上生成子对象
Doctor.career = '医生';    //加上子对象本身的属性
Doctor.birthPlace.push('qingdao');
console.log(Chinese.birthPlace);
//方法二，浅拷贝（只适合值类型的拷贝），把父对象的属性，全部拷贝给子对象，也能实现继承
function shallowCopy(Parent){
    var c = {};
    for (var i in Parent){
        c[i] = Parent[i];
    }
    c.cuber = Parent;
    return c;
}
var Doctor1 = shallowCopy(Chinese);
Doctor1.career = '医生';
//如果父对象的属性等于数组或另一个对象，
//那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。
Doctor1.birthPlace.push('sjdei');
console.log(Chinese.birthPlace);

//方法三,深拷贝（jQuery库使用的就是这种方法），能够实现真正意义上的数组和对象的拷贝，递归调用“浅拷贝”
function deepCopy(p,c){
    //debugger;
    var c = c || {};  //防止未传参数时，出现c是undefined的情况
    for (var i in p){
        if(typeof p[i] === 'object'){
            c[i] = (p[i].constructor === Array) ? []:{};
            deepCopy(p[i],c[i]);
        }else {
            c[i] = p[i];
        }
    }
    return c;
}
var Doc = deepCopy(Chinese,{});
Doc.career = '医生';
Doc.birthPlace.push('qio');
console.log(Chinese.birthPlace);

