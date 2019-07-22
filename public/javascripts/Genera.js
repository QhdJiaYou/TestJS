function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
    console.log(`${key}:${value}`);
    //console.log(key +':'+ value);与上面意思相同
}

var gen = function* gen(){
    console.log('gg');
    try {
        yield console.log('a');
        yield console.log('b');
        yield console.log('f');
    } catch (e) {
        yield console.log(e);
    }
    yield console.log('e');
    yield console.log('c');
}

var g = gen();
g.next();
g.next();
//g.next();
//g.next();
g.throw('j');//在第三次throw，会跳过输出为f的yield表达式，直接执行catch以及catch后的第一个yield语句
//最晚在第四次throw()
console.log(g.return(2));
function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
}
function* logReturned(genObj) {
    let result = yield* genObj; //第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象
    console.log(result);       //result记录返回值
}

console.log([...logReturned(genFuncWithReturn())]);//第一次是扩展运算符遍历函数logReturned返回的遍历器对象
function* inner() {
    yield 'hello!';
}

function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
}

var gen = outer1();
gen.next().value; // "open"
console.log(gen.next().value);// 返回一个遍历器对象
gen.next().value;// "close"

function* outer2() {
    yield 'open';
    yield* inner();
    yield 'close';
}

var gen = outer2();
gen.next().value; // "open"
console.log(gen.next().value); // "hello!"
console.log(gen.next().done);

// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
    if (t) {     //当遍历到null的时候不进行遍历，直接退出函数
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}

// 下面生成二叉树
function make(array) {
    // 判断是否为叶节点
    if (array.length === 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
    result.push(node);
}
console.log(result);
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});

console.log(proxy.tim); // 35


const queuedObservers = new Set();//初始化观察者队列
const observe = fn => queuedObservers.add(fn);//将监听函数加入队列
const observable = obj => new Proxy(obj, {set});  //初始化拦截对象，设置拦截方法

function set(target, key, value, receiver) {
    //内部调用对应的Reflect方法
    const result = Reflect.set(target, key, value, receiver);
    //额外执行的监听函数
    queuedObservers.forEach(observer => observer());
    return result;
}
const person = observable({
    name: '张三',
    age: 20
});
function print() {
    console.log(`${person.name}, ${person.age}`)
}
observe(print);
person.name = '李四';
person.name = '李四';

setTimeout(function () {
    console.log('three');
}, 0);    //在下一轮”事件循环“开始时执行

Promise.resolve().then(function () {
    console.log('two');    //在本轮”事件循环“结束执行
});

console.log('one');//立即执行

// one
// two
// three

//模拟Array的Iterator接口函数
function* makeSimpleGenerator(array){
    var nextIndex = 0;
    while(nextIndex < array.length){
        yield array[nextIndex++];
    }
}

//Thunkify的源码：将一个多参函数转换成Thunk函数（只接受回调函数作为参数的单参数函数）
function thunckify(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i =0;i<args.length;i++){
            args[i] = arguments[i];
        }
        return function(done){
            var called;   //确保回调函数只运行一次

            args.push(function () {
                if(called) return;
                called = true;
                done.apply(null,arguments);
            });

            try{
                fn.apply(ctx,args);
            }catch (err){
                done(err);
            }
        }
    }
}
let promise1 = new Promise(function(resolve, reject) {
    //console.log('Promise');
    resolve(Promise.resolve(123));
});

async function f() {
    // 等同于
    // return 123;
    let a = await promise1;   //a可以获取Promise对象的resolve方法传出来的参数
    console.log(a);
    return 456;      //返回值被包装成立即Promise对象。
}

f().then(v => console.log(v));//resolve传出来的参数就是456，可以被then方法回调函数获取
class Sleep {
    constructor(timeout) {
        this.timeout = timeout;
    }
    then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(() => resolve(Date.now() - startTime), this.timeout);
    }
}

(async () => {
    const actualTime = await new Sleep(95);
    console.log(actualTime);
})();