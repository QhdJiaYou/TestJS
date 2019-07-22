//题目一
//var input = read_line(); //最多读取1024个字符，字符个数多的时候应该使用gets(size)
let input='01011';
let str = input + input;
let max = 0;
let num = 0;
for(let i = 0; i < str.length;i++){
    if(str.charAt(i) ==='1'){
        num++;
    }else {
        if(num > max){
            max = num;
        }
        num = 0;
    }
}
if(max > str.length)
    max = str.length;
console.log(max);
//print(max);
//题目二
//let in = read_line();
let str2 = '45123';
let count = 0;
for(let i=str2.length-1;i>0;i--){
    if(str2[i-1]<str2[i]) {
        count++;
    }else{
        break;
    }
}
console.log(str2.length - count - 1);

var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor((len-1)/2); i >= 0; i--) {
        heapify(arr, i);      //依次对所有非叶子节点验证堆的性质，从倒数第一个开始向上进行
    }
}
function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swap(arr, i, largest);
        heapify(arr, largest);//验证被交换的子树是否仍满足堆的性质
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);   //交换根节点与最后一个叶节点
        len--;            //数组的长度减1，已经确定有序的节点不需要再次验证
        heapify(arr, 0);   //从被交换的根节点向下验证，此时只有被交换的节点的子树受到影响
        //经过建堆的过程，上面的结点不会受下面调整的影响了
    }
    return arr;
}

let arr = [1,6,4,5,3,9,2,2];
console.log(heapSort(arr));