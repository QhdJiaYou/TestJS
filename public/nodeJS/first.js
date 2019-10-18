process.stdin.resume();
process.stdin.setEncoding('utf-8');
var input = '';
process.stdin.on('data',function (data) {
    input += data;
});
process.stdin.on('end',function () {
    res = input;
    process.stdout.write(res);
});
