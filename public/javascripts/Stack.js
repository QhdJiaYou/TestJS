//栈ES5实现
function Stack() {
    let items = [];
    //入栈
    this.push = function (item) {
        items.push(item);
    };
    //出栈
    this.pop= function (item) {
        items.pop();
    };
    //查看栈顶
    this.peek = function (item) {
        return items[items.length - 1];
    };
    //检查栈是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    //检查栈的长度
    this.size = function () {
        return items.length;
    };
    //清空栈
    this.clear = function () {
        items = [];
    };
    //打印栈中的的元素
    this.print = function () {
        console.log(items.toString());
    }
}
//不能使用Set,因为Set不能存相同的元素
//使用ES6实现WeakMap,WeakMap的一个重要用处就是部署私有属性,结合闭包来实现
let StackES6 = (function () {
       const _items = new WeakMap();
       class Stack {
           constructor(){
               _items.set(this,[]);
           }
           push(ele){
               let s = _items.get(this);
               s.push(ele);
           }
           pop(){
               let s = _items.get(this);
               return s.pop();
           }
           peek(){
               if(!isEmpty){
                   let s = _items.get(this);
                   return s[s.length-1];
               }else{
                   return '';
               }
           }
           isEmpty(){
               let s = _items.get(this);
               return s.length === 0;
           }
           size(){
               let s = _items.get(this);
               return s.length;
           }
           clear(){
               let s = _items.get(this);
               s.length = 0;
           }
           print(){
               console.log(_items.get(this).toString());
           }
       }
        return Stack;
})();

let stack = new StackES6();
stack.push(1);
stack.push(2);
stack.print();
