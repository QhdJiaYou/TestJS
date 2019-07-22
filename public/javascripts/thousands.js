//实现数字的千分位分割
//千分位1
function toThousands(num) {
    let numString = (num || 0).toString(), result = '';
    while (numString.length > 3) {
        result = ',' + numString.slice(-3) + result;
        numString = numString.slice(0, numString.length - 3);
    }
    if(numString) result = numString + result;
    return result;
}
//千分位2
function toThousands2(num) {
    let numString = (num || 0).toString().split('').reverse();
    for(let i = 0; i < numString.length; i++) {
        if(i%3 === 0 && i !== 0){
            numString[i] = numString[i] + ',';
        }
    }
    return numString.reverse().join('');
}
//千分位3
function toThousands3(num) {
    num = num + '';
    return num.replace(/\d{1,3}(?=(\d{3})+$)/g,'$&,');
}
//千分位4
function toThousands4(num) {
    let numString = num + '';
    let len = numString.length % 3;
    switch (len) {
        case 1:
            numString = '00' + numString;
            break;
        case 2:
            numString = '0' + numString;
            break;
    }
    return numString.match(/\d{3}/g).join(',').replace(/^0+/, '');
}
//千分位5
function toThousands5(num) {
    let numString = num + '';
    let reg = /\d{3}$/;
    let res = '';
    while (reg.test(numString)) {
        res = RegExp.lastMatch + res;
        if(numString !== RegExp.lastMatch){
            res = ',' + res;
            numString = numString.slice(0, numString.length-3);
        } else {   // 如果数字刚好是3的倍数，那么最后一次匹配到的数字前面不需要加逗号
            numString = '';
            break;
        }
    }
    if(numString) res = numString + res;
    return res;
}

let reg = /(\d{3})$/;
reg.test('123123');
console.log(RegExp.$1);
console.log(12);
console.log(toThousands5(123456789));