class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {  //类的所有方法都定义在类的prototype属性上面,包括构造函数
                 //在类的实例上面调用方法，其实就是调用原型上的方法。
        //类的内部所有定义的方法，都是不可枚举的（non-enumerable）
        return '(' + this.x + ', ' + this.y + ')';
    }
}
/*与下面的相同
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
*/
var p = new Point(1,2);
console.log(p.constructor === Point.prototype.constructor);
console.log(typeof Point );// "function"
console.log(Point === Point.prototype.constructor);// true

var  book={};//直接在对象上定义的属性
//对于数据属性：configurable,enumerable,writable,默认为true;value默认为undefined
//对于访问器属性：configurable,enumerable,默认为true;set和get默认为undefined
Object.defineProperties(book,{
    _year:{
        writable:true,
        value:2004
    },
    edition:{
        writable:true,
        value:1
    },
    year:{   //访问器属性只能通过Object.defineProperties()或者Object.defineProperty()创建，
        //并且通过这两个方法创建默认情况下，没有显示配置的属性特性都是false
        get:function () {
            return this._year;
        },
        set:function (newValue) {
            if(newValue>this._year){
                this._year=newValue;
                this.edition+=newValue-this._year;
            }
        },
        enumerable:true
    }
});
var descriptor = Object.getOwnPropertyDescriptor(book,'year');
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
console.log(descriptor.writable); //访问器属性没有这个特征
function Person() {
    this.job = 'software';
}
Person.prototype.name = 'gty';
Person.prototype.age = 12;
Person.friends=['degf','frg'];
Person.prototype.say = function () {
    console.log(this.name);
}
Object.defineProperty(Person.prototype,'sex',{value:'female',enumerable:true,writable:true});

var person1 = new Person();
var person2  =new Person();
console.log(person1._proto_===person2._proto_);
console.log(Object.getPrototypeOf(person1));
for(let i in person1){
    console.log(i);
}
var shili = Object.getOwnPropertyNames(person1);
var yuanxing = Object.getOwnPropertyNames(Person.prototype);
console.log(yuanxing);
var suoyou = Reflect.ownKeys(Person.prototype);
console.log(suoyou);
person1.friends =['wre','frgt'];
person1.sex ='male';
console.log(person1.friends);
//for-in能够访问能够通过对象访问的可枚举属性（实例的，原型的），以及屏蔽了原型中不可枚举属性的实例属性
//根据规定，开发人员定义的属性都是可枚举的
for(let p in person1){
    if(p === "sex"){
        console.log("found");
    }
}
console.log(person1.propertyIsEnumerable('sex'));
delete person1.sex;
console.log(person1.propertyIsEnumerable('sex'));
//没有标准的方式通过实例对象直接访问原型对象，
//但实际上他们之间的连接是存在的，也就是实例的constructor属性实际上调用的是原型中的constructor属性
console.log(Object.getOwnPropertyDescriptor(person1.constructor.prototype,'name'));
//name是属于原型对象的
console.log(Object.getOwnPropertyDescriptor(person1,'job'));

let obj ={
    [Symbol('de')]:1,
    size:2
}
console.log(Reflect.ownKeys(obj));
console.log(Object.getOwnPropertyNames(obj));

