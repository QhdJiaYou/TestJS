function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
console.log(sixth);

const { log } = console;
log('hello'); // hello


// 字符串中嵌入变量
let name = "Bob", time = "today";
console.log(`Hello ${name},
 how are you ${time}?`);

let a = 5;
let b = 10;

function tag(s, v1, v2, v3) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(s[3]);
    console.log(v1);
    console.log(v2);
    console.log(v3);

    return "OK";
}

tag`Hello ${ a + b } world world ${ a * b}  ${ a * b} world`;

function passthru1(literals, ...values) {
    let output = "";
    let index;
    for (index = 0; index < values.length; index++) {
        output += literals[index] + values[index];
    }

    output += literals[index];
    return output;
}
function passthru(literals) {
    let result = '';
    let i = 0;

    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }

    return result;
}
let total = 30;
let msg = passthru1`The total is ${total} (${total*1.05} with tax)`;
console.log(msg);

var ee = String.raw({ raw: 'test' }, 0, 1, 2);
// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
console.log(ee);
console.log(/foo.bar/s.test('foo\nbar'));
[,'a'].forEach((x,i) => console.log(i)); // 1
console.log(['a',,'b'].filter(x => true)); // ['a','b']

