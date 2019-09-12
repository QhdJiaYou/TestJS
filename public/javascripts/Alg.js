//数组去重
let a = [1,2,2,3,3];
let ay = [1,2,'2',3,3,4,5];
//(1)利用set集合的特性
let unique = function(arr){
    return Array.from(new Set(arr));
};
//(2) 创建一个新的数组保存不重复的元素
function removeDuplicate(arr) {
    let res = [];
    for (let i=0; i<arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(unique(ay));
//(3)使用hash表存储已有的元素，是最快的，用空间换时间
function uniqueArr(arr) {
    let hash = {};   //JS对象的底层是基于哈希表存储的
    let res = [];
    for(let i=0; i<arr.length; i++){
        let temp = arr[i], key;
        if(typeof temp === 'object'){
            key = JSON.stringify(temp);
        }else {
            key = typeof temp + temp;  //确保值相同，类型不同时的情况
        }
        if(!hash[key]){      //作为对象的键值，会默认的将key都转换成字符串
            hash[key] = true;
            res.push(temp);
        }
    }
    return res;
}
console.log(uniqueArr(ay));
//(4)利用indexOf判断数组元素第一次出现的位置是否是当前位置
function uniqueFour(arr) {
    let res = [];
    for(let i=0; i<arr.length; i++) {
        if(arr.indexOf(arr[i]) === i){
            res.push(arr[i]);
        }
    }
    return res;
}
//(5)先排序后去重
function  uniqueFive(arr) {
    arr.sort((a,b) => a-b);
    let res = [arr[0]];
    for(let i=1; i<arr.length; i++){
        if(arr[i] !== arr[i-1]) {
            res.push(arr[i]);
        }
    }
    return res;
}
//字符串反转
var str = '12345';
//将map方法通过call应用到str对象
Array.prototype.map.call(str, function(x) {   //call是Function的原生方法，map是Array的方法
    return x;
}).reverse().join('');
//判断回文
function checkPalindrom(str){
    return str === str.split('').reverse().join('');
}
let str1 ="123321";
console.log(checkPalindrom(str1));
//统计一个字符串出现最多的字母
//冒泡排序(稳定)，后面先开始有序，有序的数值不再参与比较，
// 最坏时间O(n^2)，平均时间复杂度O(n^2),最好O(n)已经排好序的情况
function bubbleSort(arr){
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    let swapped = false;
    for(let i = 1; i<len ;i++){   //一共len-1轮冒泡，每次将一个最大值冒到数组的最后面
        swapped = false;
        for(let j = 0; j<len-i;j++){  //每轮中，已经确定有序的数值不再参与比较
            if(arr[j]>arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;  //只要有数据交换就是true
            }
        }
        if(!swapped) break;  //当某一轮中，所有的相邻元素都没有进行交换，就说明该数组已经有序了
    }
    return arr;
}
//选择排序（不稳定），数组分为前部分有序区域和后部分无序区域，每次从无序区域选出最小值放入到有序区域的最后面
//最坏时间O(n^2)，平均时间复杂度O(n^2),最好O(n^2)
function selectionSort(arr){
    if(arr === undefined || arr === null) return;
    let len =arr.length;
    let minIndex,temp;
    for(let i = 0; i < len-1; i++){
       minIndex = i;
        for(let j = i+1; j < len; j++){
            if(arr[minIndex] > arr[j]){
                minIndex = j;            //保存最小数下标索引
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
//插入排序（稳定），每次将一个待排序的元素，按照大小插入到前面已经排好序的一组元素中去，直到元素全部插入为止。
//最坏时间O(n^2)，平均时间复杂度O(n^2),最好O(n)
function insertSort(arr) {
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    let insert,pre;
    for(let i = 1; i < len; i++){
        pre = i - 1;
        insert = arr[i];          //保存待插入的值
        while(pre >= 0 && insert < arr[pre]){
            arr[pre+1] = arr[pre];
            pre--;
        }
        arr[pre+1] = insert;
    }
    return arr;
}
//折半插入排序，利用折半搜索法寻找插入位置，是直接插入算法的变种
function binarySort(arr) {
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    let insert,pre,high,low;
    for(let i = 1; i < len; i++){
        insert = arr[i];
        high = i-1;
        low = 0;
        while (low <= high){  //low比high大，说明待插入的值比low所在位置前面的数大，带插入的值应该在low位置
            pre = Math.floor((high + low)/2);       //向下取整，注意直接除会得到小数
            if(insert < arr[pre]) {    //这样写是稳定的，后面有相同的值也不会改变两个相同值的相对位置
                high = pre - 1;
            }else {
                low = pre + 1;
            }
        }
        for(let j = i; j > low;j--){
            arr[j] = arr[j-1];
        }
        arr[low] = insert;
    }
    return arr;
}
//希尔排序(不稳定),将整个待排序列用不同的增量分成很多子序列，再进行简单插入排序，不断减小增量直到为1，
// 对整个数组再进行插入排序，此时数组经过几轮简单排序已经基本有序，从而提高了效率
// 最坏时间O(n^2)，平均时间复杂度O(n^1.3),最好O(n)
function shellSort(arr){
    if(arr === undefined || arr ===null) return;
    let increment = Math.ceil(arr.length/3);
    let insert,pre;
    while (increment >= 1){    //循环不同的增量
        for(let turn = 0; turn < increment; turn++) {   //在某个增量N下,一共要对N个集合进行简单插入排序
            for (let i = turn + increment; i < arr.length; i += increment) {//对每个数据链插入排序
                insert = arr[i];
                pre = i - increment;
                while (pre >= 0 && insert < arr[pre]) {
                    arr[pre + increment] = arr[pre];
                    pre -= increment;
                }
                arr[pre + increment] = insert;
            }
        }
        if(increment === 1) break;   //增量为1的时候停止排序
        increment = Math.ceil(increment/3);
    }
    return arr;
}
//归并排序（稳定），是采用分治法的经典应用，时间复杂度O(nlogn),用空间换时间,空间复杂度O(n)
//最后每个子问题的时间规模为常数c，共有n个
function mergeSort(arr) {   //分割数组
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    if(len < 2) return arr;
    let middle = Math.floor(len/2);
    let left = arr.slice(0,middle);
    let right = arr.slice(middle);
    return  merge(mergeSort(left),mergeSort(right));
}

function merge(left,right) {  //合并数组
    let res =[];
    while(left.length > 0 && right.length > 0){
        if(left[0] <= right[0]){
            res.push(left.shift());
        }else{
            res.push(right.shift());
        }
    }
    while(left.length)
        res.push(left.shift());
    while (right.length)
        res.push(right.shift());
    return res;
}
//快速排序(不稳定)，时间复杂度O(nlogn),空间复杂度O(nlogn)
function quickSort(arr,left,right) {
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    if(len < 2) return arr;
    if(left === undefined)  left = 0;
    if(right === undefined)  right = len-1;
    if (left < right) {
        let basic = partition(arr, left, right);
        quickSort(arr,left,basic-1);
        quickSort(arr,basic+1,right);
    }
    return arr;
}
function partition(arr,left,right) {
    let i,j,temp;
    i = left;
    j = right;
    while(i<j){
        while(arr[j]>arr[left]) j--;  //以最左边的数为标杆，每次都是右边的j哨兵先移动
        while(arr[i]<arr[left]) i++;
        if(i<j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            j--;        //交换后j先移动
        }
    }
    if(i===j){
        temp = arr[left];
        arr[left] = arr[i];
        arr[i] = temp;
    }
    return i;
}
console.log('快排结果', quickSort([6,6,2,7,3,4,5]));
//堆排序（不稳定），时间复杂度O(nlogn)
var len;   // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function heapSort(arr) {
    if(arr === undefined || arr === null) return;
    len = arr.length;
    if(len < 2) return arr;
    buildMaxHeap(arr);
    for(let i =0 ; i < arr.length - 1; i++){  //交换n-1次就可以了，最后一个自动就确定了
        swap(arr,0,len-1);    //交换根节点与最后一个叶节点
        len--;   //数组的长度减1，已经确定有序的节点不需要再次验证
        heapify(arr,0);    //从被交换的根节点向下验证，此时只有被交换的节点的子树受到影响
                          //经过建堆的过程，上面的结点不会受下面调整的影响了
    }
    return arr;
}
function buildMaxHeap(arr){            //建一个大顶堆，适合升序排序的情况。
    for(let i=Math.floor((len-1)/2); i >= 0;i--){
        heapify(arr,i);     //依次对所有非叶子节点验证堆的性质，从倒数第一个开始向上进行
    }
}
function heapify(arr,i){
    let left = 2*i +1;
    let right = 2*i +2;
    let largest = i;
    if(left <= len-1 && arr[left] > arr[largest])
        largest = left;
    if(right <= len-1 && arr[right] > arr[largest])
        largest = right;
    if(largest !== i){
        swap(arr,largest,i);
        heapify(arr,largest);   //验证被交换的子树是否仍满足堆的性质
    }
}
function swap(arr,i,j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
//计数排序要求输入的数据必须是有确定范围的整数0~k之间，当k不是很大并且序列比较集中时，计数排序比较高效
//计数排序(稳定)，用空间换时间，空间复杂度O(n+k)
// 时间复杂度O(n+k)
function countSort(arr,maxValue) {
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    if(len < 2) return arr;
    //计数数组的大小要比最大值大1，考虑到0
    let C = new Array(maxValue+1);//maxValue是个空对象，而不是将他们初始化为0
    for(let k =0; k < C.length;k++){//初始化
        C[k] = 0;
    }
    for(let i =0;i < len;i++){//计数
        C[arr[i]]++;
    }
    let index = 0;
    for(let j = 0; j <= maxValue; j++){ //展开排序
        while(C[j]){
            arr[index] = j;
            C[j]--;
            index++;
        }
    }
    return arr;
}
//基数排序(稳定的),时间复杂度也是线性O(n*k),空间复杂度O(n+k)
//基本思想是按照低位先排序，然后收集，再按高位排序，然后再收集，依次类推，直到最高位
//需要知道最高位数maxDigit
function radixSort(arr,maxDigit) {
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    if(len < 2) return arr;
    let counter = [];
    let mod = 10;
    let dev = 1;
    for(let i = 0;i < maxDigit; i++,mod *= 10,dev *= 10){
        for(let j = 0; j < len ; j++){        //按每一位放入桶中
            let value = Math.floor((arr[j]%mod)/dev);   //我们要的是某一位的值，注意
            if(counter[value] == null){
                counter[value] = [];
            }
            counter[value].push(arr[j]);
        }
        let index = 0;
        for(let j = 0; j < counter.length ; j++){  //收集
            while(counter[j] != null && counter[j].length !== 0){
                arr[index++] = counter[j].shift();
            }
        }
    }
    return arr;
}
//桶排序（稳定），时间复杂度线性O(n+k),最坏的情况O(n^2),最好的O(n),空间复杂度O(n+k)
//将数据分布到有限数量的桶里(数组)，每个桶再分别进行排序(数组里面放数组)，从不是空的桶中把排好序的数连起来
function bucketSort(arr,bucketSize) {
    if(arr === undefined || arr === null) return;
    let len = arr.length;
    if(len < 2) return arr;
    let minvalue = arr[0];
    let maxvalue = arr[0];
    let i;
    for(i=0; i<len; i++){
        if(arr[i] < minvalue){
            minvalue = arr[i];
        }else if(arr[i] > maxvalue){
            maxvalue = arr[i];
        }
    }
    let bucketCount = Math.floor((maxvalue-minvalue)/bucketSize) + 1;
    let buckets = new Array(bucketCount);
    for(i=0; i<buckets.length; i++){
        buckets[i] = [];
    }
    for(i=0; i<arr.length;i++){
        buckets[Math.floor((arr[i]-minvalue)/bucketSize)].push(arr[i]);
    }
    arr.length = 0;
    for(i=0; i<buckets.length; i++){
        insertSort(buckets[i]);
        for(let j =0;j<buckets[i].length;j++){
            arr.push(buckets[i][j]);
        }
    }
    return arr;
}
let arr =[1,2,4,7,2,5,3,6];
let jishu = [123,146,234,567,67];
console.log(radixSort(jishu,3));
let bucket = [78,17,39,26,72,94,21,23,68];
console.log(bucketSort(bucket,10));

//LeetCode329,Longest Increasing Path in a Matrix
function inbound(matrix, x, y) {
    return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
}
function helper (matrix, i, j, visited) {
    const Dx = [0, 1, -1, 0];
    const Dy = [1, 0, 0, -1];
    let max = 1;
    if (visited[i][j] !== 0) {
        return visited[i][j];
    }
    for (let k = 0; k < 4; k++) {
        let x = i + Dx[k];
        let y = j + Dy[k];
        if (inbound(matrix, x, y) && matrix[x][y] > matrix[i][j]) {
            max = Math.max(max, helper(matrix, x, y, visited) + 1);
        }
    }
    visited[i][j] = max;
    return max;
}
var longestIncreasingPath = function(matrix) {
    let length = 0;
    let visited = [];
    for (let i = 0; i < matrix.length; i++) {
        visited.push(new Array(matrix[0].length).fill(0));
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            length = Math.max(length, helper(matrix, i, j, visited));
        }
    }
    return length;
};
let num = [[3,4,5],[3,2,6],[2,2,1]];
console.log('Longest increasing path in a matrix is',longestIncreasingPath(num));


//求一维数组最大值
yiwei = [5,4,2,7];
console.log(Math.max.apply(null,[1,2,3]));//apply的第二个参数是一个数组，传递给前面的函数Math.max
console.log(Math.max.call(null,1,2,3));
console.log([3,2,5].sort().reverse()[0]);
let max = yiwei.sort(function (a,b) {     //降序排列
    return b-a;
});
console.log(max[0]);
//将方法写到数组的原型中
Array.prototype.max = function () {
    return Math.max.apply(null,this);
};
console.log([1,2,3].max());
//获取二维数组中每一位数组中的最大值
function larg(arr) {
    return arr.map(Function.apply.bind(Math.max,null));
    //传给map的回调函数实际是Math.max.apply(null),经过bind的绑定相当于声明了一个上下文被改变的函数，不会立即执行
    //apply没有传递参数给Math.max,bind绑定后可以在调用的时候传递参数再执行
    //所以本质上就是对每个数组元素执行一次绑定后的函数
}
function larg2(arr){
    return arr.map(function (group) {
        return group.reduce(function (res,current) {
            return res>current?res:current;
        })
    })
}
arryy = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
console.log(larg(arryy));
console.log(larg2(arryy));
//多维数组最大值
function largest(arr) {
    let newArray = arr.join(',').split(',');
    return Math.max.apply(null,newArray);
}
arr = [[[7,2],[4,3]],[[6,1],[5,0]]];
console.log(largest(arr));
console.log(arr.join(',').split(','));
console.log(arr.join(',').split(',').map(value=> parseInt(value)));


//将一个类数组对象转化为数组方法1
function list(){
    return Array.prototype.slice.call(arguments);
}
console.log(list(1,2,3));
//将一个类数组对象转化为数组方法2
function list2() {
    return Array.from(arguments);
}
console.log(list2(1,2,3));
//将一个类数组对象转化为数组方法3
function list3() {
    return Array.prototype.splice.call(arguments,0);
}
console.log(list3(1,2,3));
//将一个类数组对象转化为数组方法4
function list4() {
    return Array.prototype.concat.apply([],arguments);
}
console.log(list4(1,2,3));
//将一个类数组对象转化为数组方法5
let slice = Function.prototype.call.bind(Array.prototype.slice);
function l() {
    return slice(arguments);
}
console.log(l(1,2,3));
console.log(Number(8).toString(2));