function f(){
    console.log(this);
    return ()=>{
        console.log(this);
        return ()=>{
            console.log(this);
        }
    }
}

let newF = f.bind({a:1});
let af = newF()().bind({b:2});
af();

function b() {
    console.log(this);
    return function f1() {
        //console.log(this);
    }

}
let ba = b.bind({d:2});
ba()();


let arr = '[' +
    '12,3,[2,4]]';
console.log(JSON.parse(arr));

let yuan = {a:[1,2],b:1};
//利用JSON就可以实现深拷贝
let shenkaobei = JSON.parse(JSON.stringify(yuan));
shenkaobei.a = 1;
console.log(shenkaobei,yuan);

//手写call函数
function myCall(that, ...arg) {
    that = that !== null && typeof that === 'object' ? that: {};
    that.fn = this;
    const res = that.fn(...arg);
    delete that.fn;
    return res;
}
//手写apply函数
function myApply(that, arg = []) {
    that = that !== null && typeof that === 'object' ? that: {};
    that.fn = this;  //this保存的是调用myApply方法的函数
    const res = that.fn(...arg);
    delete that.fn;
    return res;
}
//手写bind函数
function myBind(that, ...arg) {
    const _fn = this;
    return function () {
        let args = [...arg, ...arguments];
        return _fn.myApply(that,args);
    }
}
