//非立即执行版本
function debounce(func,wait){
    let timeout;
    return function () {
        let content = this;
        let arg = arguments;

        if(timeout) clearTimeout(timeout);//如果timeout已经执行过了，就不需要清除了

        timeout = setTimeout(()=>{
            func.apply(content,arg);
        },wait);

    }
}
//立即执行版本
function debounce1(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let arg = arguments;

        if(timeout) clearTimeout(timeout);  //不能使timeout变为null,仍旧是一个计时器对象。

        let callNow = !timeout;
        timeout = setTimeout(()=>{
            timeout = null;
        }, wait);

        if(callNow) func.apply(context, arg);
    }
    
}

//时间戳版本（立即执行）的节流函数
function throttle(func,wait) {
    let pre = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;

        if(now - pre > wait){
            func.apply(context,args);
            pre = now;
        }
    }
}

//定时器版本（非立即执行）
function throttle1(func,wait) {
    let timeout;
    return function(){
        let context = this;
        let args = arguments;
        if(!timeout){
            timeout = setTimeout(()=>{
                timeout = null;
                func.apply(context,args);
            }, wait);
        }
    }
}