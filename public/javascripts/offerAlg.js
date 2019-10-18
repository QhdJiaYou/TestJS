//3.1找出数组中重复的数(方法一),时间复杂度O(n),空间O(n)
function duplicate(arr){
    if(arr === undefined || !Array.isArray(arr)){
        return -1;
    }
    let len = arr.length;
    let set = new Set();
    for(let i=0;i<len;i++){
        if(set.has(arr[i])){
            return arr[i];
        }
        set.add(arr[i]);
    }
    return -1;
}
function dupf(arr) {
    if(!arr || !Array.isArray(arr)){
        return -1;
    }
    let len = arr.length;
    let hash = {};
    for(let i=0; i<len; i++){
        if(!hash[arr[i]]){
            hash[arr[i]] = true;
        } else{
            return arr[i];
        }
    }
    return -1;
}
//3.1找出数组中重复的数(方法二)，时间复杂度O(n),空间O(1)
//利用数字值的大小不会超过数组下标的最大值，前提是长度为n的数组里所有的数字都在0到n-1的范围内
function duplicateTwo(arr){
    if(arr === undefined || !Array.isArray(arr)){
        return -1;
    }
    for(let i=0;i<arr.length;i++){
        while(arr[i]!==i){
            if(arr[arr[i]] ===arr[i]){
                return arr[i];
            }
            let temp =arr[arr[i]];
            arr[arr[i]] =  arr[i];
            arr[i]= temp;
        }
    }
    return -1;
}
arrr =[2,3,1,4,2,5,3];
console.log('找出重复元素1',dupf(arrr));
console.log('找出重复元素2',duplicateTwo(arrr));

//3.2 不修改数组找出重复的数字,用时间换空间，时间复杂度是O(nlogn)，空间O(1)
//利用数字值的大小不会超过数组下标的最大值，前提是长度为n的数组里所有的数字都在0到n-1的范围内
function getDuplicate(arr) {
    if(arr === undefined || !Array.isArray(arr)){
        return -1;
    }
    let left = 0;
    let high = arr.length -1;
    let low = 1;
    let middle;
    let len ;
    while (low < high) {
        middle = Math.floor((high + low) / 2);
        len = middle - low + 1;
        left = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] <= middle) {
                left++;
            }
        }
        if(len === 1 && left > 1){
            return middle;
        }else if(len === 1 && left === 1){
            return middle+1;
        }
        if (left > len) {
            high = middle;
        } else {
            low = middle + 1;
        }
    }
    return -1;
}
let adup =[2,3,5,4,3,2,6,7];
console.log(getDuplicate(adup));
//4、在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序
//修改数组
function findInTwo(arr,target) {
    if(arr === undefined || !Array.isArray(arr))
        return -1;
    while (arr.length){
        let i = arr.length-1;
        let j = 0;  //从右上角开始比较
        if(target > arr[i][j]){
            for(let k = 0;k < arr.length;k++){
                arr[k].shift();   //去掉一行
            }
        }else if(target < arr[i][j]){
            arr.pop();   //去掉一列
        }else if(target === arr[i][j]){
            return true;
        }
    }
    return false;
}

//不修改数组
function findInTwo2(arr,target) {
    if(arr === undefined || !Array.isArray(arr))
        return -1;
    let len = arr.length;
    for(let i=len-1,j=0;i>=0&&j<arr[i].length;){
        if(target > arr[i][j]){
            j++;
        }else if(target < arr[i][j]){
            i--;
        }else if(target === arr[i][j]){
            return true;
        }
    }
    return false;
}
let two = [[1,2,4,6],[2,4,7,8],[8,9,10,11],[9,12,13,15]];
console.log(findInTwo2(two,0));

//5替换空格
function replaceSpace(str) {
    return str.split(' ').join('%20');
}
function replaceSpace2(str) {
    return str.replace(/\s/g,'%20');
}
console.log(replaceSpace("We are happy."));
console.log(Array.from("We are happy."));

//输入一个链表，从尾到头打印链表的每个节点
function ListNode(x) {
    this.val = x;
    this.next = null;
}
let list = new ListNode(2);
list.next = new ListNode(3);
list.next.next = new ListNode(4);
function printListFromTailToHead(head) {
    if(!head){
        return 0;
    }
    let arr = [];
    let cur = head;
    while (cur){
        arr.push(cur.val);
        cur = cur.next;
    }
    return arr.reverse();
}
console.log(printListFromTailToHead(list));
//返回值是一个反转的链表
function printListFromTailToHead1(head) {
    if(head == null) {
        return null;
    }
    let pre = null;
    let next = null;
    let cur = head;
    while(cur != null){
        next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}
//输入某二叉树的前序遍历和中序遍历结果，请重建出该二叉树
function TreeNode(x) {
    this.value = x;
    this.left = null;
    this.right = null;
    this.parent = null;
}
function reConstructBinaryTree(pre,vin) {
    if(pre.length === 0 || vin.length === 0){
        return null;
    }
    let rootIndex = vin.indexOf(pre[0]);
    if(rootIndex < 0){
        console.log('输入的前序序列与中序序列不匹配');
        return null;
    }
    let left = vin.slice(0,rootIndex);
    let right = vin.slice(rootIndex+1);
    let node = new TreeNode(vin[rootIndex]);
    node.left = reConstructBinaryTree(pre.slice(1,rootIndex+1),left);
    node.right = reConstructBinaryTree(pre.slice(rootIndex+1),right);
    return node;
}
let pre = '12473568';
let vin = '47215386';
let tree = reConstructBinaryTree(pre,vin);
//宽度优先遍历二叉树，从左到右打印,分层遍历
function WFS(tree) {
    if(tree === null ||!tree instanceof TreeNode){
        return [];
    }
    let res = [];
    let queue = [];
    queue.push(tree);
    while(queue.length){
        let level = queue.length;
        let curLevel = [];          //用来分层遍历
        for(let i=0;i < level;i++){
            let curNode = queue.shift();
            curLevel.push(curNode.value);
            curNode.left? queue.push(curNode.left) : '';    //先push左边的
            curNode.right? queue.push(curNode.right) : '';
        }
        res.push(curLevel);
    }
    return res;
}
console.log(WFS(tree));//正序
console.log(WFS(tree).reverse());//倒序
//之字形打印
function WFSZigzag(tree) {
    if(tree === null ||!tree instanceof TreeNode){
        return [];
    }
    let res = [];
    let queue = [];
    let layer = 0;
    queue.push(tree);
    while(queue.length){
        let level = queue.length;
        let curLevel = [];          //用来分层遍历
        for(let i=0;i < level;i++){
            let curNode = queue.shift();
            curLevel.push(curNode.value);
            curNode.left? queue.push(curNode.left) : '';    //先push左边的
            curNode.right? queue.push(curNode.right) : '';
        }
        layer++;
        if(layer%2 !== 0){//奇数层
            res.push(curLevel);
        }else{//偶数层
            res.push(curLevel.reverse());
        }
    }
    return res;
}
console.log('分层实现之字形打印',WFSZigzag(tree));   //之字形打印
//用两个栈隔行存储也能实现之字形打印
function WFSZigzag2(tree) {
    if (tree === null || !tree instanceof TreeNode) {
        return [];
    }
    let res = [];
    let stackLTR = [tree];
    let stackRTL = [];
    let curLevel = [];
    while (stackLTR.length || stackRTL.length) {
        curLevel = [];
        while(stackLTR.length){
            for(let i=0;i<stackLTR.length;i++){
                let node = stackLTR.pop();
                curLevel.push(node.value);
                node.left? stackRTL.push(node.left):'';
                node.right? stackRTL.push(node.right):'';
            }
        }
        res.push(curLevel);
        curLevel = [];
        while(stackRTL.length){
            for(let i=0;i<stackRTL.length;i++){
                let node = stackRTL.pop();
                curLevel.push(node.value);
                node.right? stackLTR.push(node.right):'';
                node.left? stackLTR.push(node.left):'';
            }
        }
        res.push(curLevel);
    }
    return res;
}
console.log(WFSZigzag2(tree));
//不分层，宽度优先遍历
function WFS2(tree) {
    if(tree === null ||!tree instanceof TreeNode){
        return [];
    }
    let res = [];
    let queue = [];
    queue.push(tree);
    while(queue.length){
        let curNode = queue.shift();
        res.push(curNode.value);
        curNode.left? queue.push(curNode.left) : '';    //先进先出，一定要先push左边的
        curNode.right? queue.push(curNode.right) : '';
    }
    return res;
}
console.log(WFS2(tree));

//深度优先遍历二叉树
function DFS(tree) {
    if(tree === null ||!tree instanceof TreeNode){
        return [];
    }
    let res = [];
    let stack = [tree];
    while(stack.length){
        let curNode = stack.pop();
        res.push(curNode.value);
        curNode.right?stack.push(curNode.right):'';   //后进先出，一定要先push右边的
        curNode.left?stack.push(curNode.left):'';
    }
    return res;
}
console.log(DFS(tree));
//面试题8：求二叉树的中序遍历的下一个节点
function nextValue(tree,node){
    if(tree === null || node === null)
        return null;
    if(node.right !== null){//如果它有右子树，那么下一个节点就是它右子树中最左子节点
        let nRight = node.right;
        while(nRight && nRight.left !== null){
            nRight = nRight.left;
        }
        return nRight;
    }else{  //它没有右子树
        if(node.parent.left === node){  //如果他是它父亲节点的左孩子
            return node.parent;
        }else{      //如果他是它父亲节点的右孩子
            while(node.parent && node.parent.right === node){//就找一个祖先是祖先父亲节点的左孩子时
                node = node.parent;
            }
            if(node.parent === null){
                return null;
            }
            return node.parent;
        }
    }
}
function insertTreeNode(tree,key) {
    if(key < tree.value){
        if(tree.left === null){
            tree.left = new TreeNode(key);
            tree.left.parent = tree;
        }else{
            insertTreeNode(tree.left,key);
        }
    }else{
        if(tree.right === null){
            tree.right = new TreeNode(key);
            tree.right.parent = tree;
        }else {
            insertTreeNode(tree.right,key);
        }
    }
}
let HaveParentTree = (function () {
    class Atree{
        constructor(){
            this.root = null;
        }
        insert(key){
            if(this.root === null){
                this.root = new TreeNode(key);
            }else{
                insertTreeNode(this.root,key);
            }
        }
    }
    return Atree;
})();

/*let tr = new HaveParentTree();
tr.insert(5);
tr.insert(7);
tr.insert(4);
tr.insert(2);
tr.insert(3);
tr.insert(6);
tr.insert(8);
let no = tr.root.right.right;
console.log(nextValue(tr.root,no));*/
//面试题11：旋转排序数组的最小值
function Min(str){
    if(str === undefined || !Array.isArray(str)){
        return;
    }
    let len = str.length;
    let pre = 0;
    let rear = len-1;
    if(str[pre] < str[rear]){   //本来就有序
        return str[pre];
    }
    let mid = Math.floor((pre+rear)/2);
    while (pre < rear-1){
        if(str[pre] === str[rear] && str[mid] === str[pre]) { //当pre和rear对应的值相同，且中间值mid也跟他们相同时
            let res = str[pre];
            for (let i = pre + 1; i <= rear; i++) {
                if (str[i] < res)  //找到第一个较小值一定是最小值
                    return str[i];
            }
        }
        if(str[mid] >= str[pre]){   //mid对应的值在前面的升序序列中，最小值应该在mid的后面
            pre = mid;
            mid = Math.floor((pre+rear)/2);
        }else if(str[mid] <= str[rear]){  //mid对应的值在后面的升序序列中，最小值应该在mid的前面
            rear = mid;
            mid = Math.floor((pre+rear)/2);
        }
    }
    if(pre+1 === rear){
        return str[rear];
    }
}
let arry = [1,1,0,1,1];
console.log(Min(arry));
//面试题12：矩阵中的路径(回溯法的经典应用)
var pathLength = 0;
function within(arr,i,j) {
    return i>=0&&i<arr.length&&j>=0&&j<arr[0].length;
}
function helper(arr,str,row,col,visited) {
    if(pathLength === str.length){
        return true;
    }
    let hasPath = false;
    if(within(arr,row,col)&&arr[row][col] === str[pathLength]&&!visited[row][col]){
            ++pathLength;
            visited[row][col] = true;
            hasPath = helper(arr,str,row,col+1,visited)
                || helper(arr,str,row,col-1,visited)
                || helper(arr,str,row+1,col,visited)
                || helper(arr,str,row-1,col,visited);
            if(!hasPath){
                --pathLength;
                visited[row][col] = false;
            }
    }
    return hasPath;
}
function hasPath(arr,str) {
    let visited = [];
    for(let i=0;i<arr.length;i++){
        visited[i] = new Array(arr[0].length).fill(0);
    }
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(helper(arr,str,i,j,visited)){   //从任意一点开始,存在就返回true
                return true;
            }
        }
    }
    return false;
}
let Binary = [['a','c','j'],['b','f','d'],['t','c','e'],['g','s','h']];
console.log(hasPath(Binary,'abfb'));

//面试题38,输出字符串的全排列
function permutation(str) {
    if(!str || str.length === 0){
        return [];
    }
    var result = [];
    var temp = '';
    var tempArr = str.split('');
    ordering(tempArr);
    function ordering(tempArr){
        if(tempArr.length === 0){
            result.push(temp);
            return;
        }
        for(let i=0; i<tempArr.length; i++) {
            temp += tempArr[i];
            let nextArr = tempArr.concat();
            nextArr.splice(i,1);
            ordering(nextArr);
            temp = temp.substring(0,temp.length-1);  //回溯
        }
    }
    result = result.filter((val, index, arr) => {  //去重
        return arr.indexOf(val) === index;
    });
    return result;
}

console.log(permutation('aabc'));

//将数字转码成字符，列出所有情况
function fromNumtoLetter(numStr) {
    if(!numStr || numStr.length === 0){
        return [];
    }
    var result = [];
    var temp = '';
    var tempArr = numStr.split('').map(val => parseInt(val));
    deCode(tempArr, 0);
    function deCode(tempArr, start) {

        if(tempArr.length === start){
            result.push(temp);
            return;
        }

        temp += String.fromCharCode(tempArr[start] + 64);
        deCode(tempArr, start + 1);
        temp = temp.substring(0, temp.length - 1);

        if(start <= tempArr.length - 2) {
            if(tempArr[start] === 1 && tempArr[start+1] >=0 && tempArr[start+1] <=9) {
                temp += String.fromCharCode(Number('' + tempArr[start] + tempArr[start+1]) + 64);
                deCode(tempArr, start+2);
                temp = temp.substring(0, temp.length - 1);
            }else if(tempArr[start] === 2 && tempArr[start+1] >=0 && tempArr[start+1] <=6) {
                temp += String.fromCharCode(Number(''+ tempArr[start] + tempArr[start+1]) + 64);
                deCode(tempArr, start+2);
                temp = temp.substring(0, temp.length - 1);
            }
        }
    }
    return result;
}

console.log(fromNumtoLetter('112278'));

//求出所有字母组合情况，如果输入n个字符，则能构成长度为1,2...n的组合
function composeLetter(arr) {
    if(!arr || arr.length === 0){
        return [];
    }
    var res = [];
    var temp = '';
    for(let m=1; m <= arr.length; m++){
        combine(arr,m);  //每次求n个字符中长度为m的组合
    }
    function combine(arr, m) { //可分成两个递归子任务
        if(m === 0){
            res.push(temp);
            return;
        }
        if(arr.length > 0){
            temp += arr[0];
            let next = arr.concat();
            next.splice(0,1);
            combine(next, m-1);  //长度为m的组合中包括第一个字符
            temp = temp.substring(0, temp.length - 1);
            combine(next, m);   //长度为m的组合中不包括第一个字符
        }
    }
    return res;
}
function composeLetter1(arr) {
    if(!arr || arr.length === 0){
        return [];
    }
    var res = [];
    var temp = '';
    for(let i=0; i< arr.length; i++){
        temp += arr[i];
        res.push(temp);
        for(let j = i+1; j<arr.length; j++){
            temp += arr[j];
            res.push(temp);
        }
        temp = '';
    }
    return res;
}
total = composeLetter1([1,3,2,4]);
let [a,b] = [3,2];
total = total.filter(val=> !(val.includes(a)&&val.includes(b)));
let [c,d] = [2,4];
total = total.filter(val=> !(val.includes(c)&&val.includes(d)));
console.log('dehhiohdgy',total);

//面试题14:剪绳子
// （动态规划）
function maxProductAfterCutting(len){
    let max = 1;
    let products = [];
    if(len < 2)
        return 0;
    if(len === 2)
        return 1;
    if(len === 3)
        return 2;

    products[0] = 0;
    products[1] = 1;
    products[2] = 2;
    products[3] = 3;
    //只有以上情况，作为绳子的一部分时，不剪比剪开好
    for(let i=4; i<=len; i++){
        max = 0;
        for(let j=1; j<=Math.floor(i/2); j++){
            let temp = products[j] * products[i-j];
            if(temp > max){
                max = temp;
            }
        }
        if(max > i){
            products[i] = max;
        } else {
            products[i] = i;
        }

    }
    return products[len];
}
// 贪心算法
function maxProductAfterCutting1(len) {
    if(len<2) return 0;
    if(len === 2) return 1;
    if(len === 3) return 2;

    let timeOf3 = Math.floor(len/3);
    let timeOf2 = 0;
    if(len % 3 === 1){
        timeOf3 -= 1;
        timeOf2 = 2;
    }
    if(len % 3 === 2){
        timeOf2 = 1;
    }
    return Math.pow(3,timeOf3) * Math.pow(2,timeOf2);
}

console.log(maxProductAfterCutting1(7));

//面试题51：数组中的逆序对(归并排序解决，用空间换时间)
function inversePairs(arr){
    let count = 0;
    split(arr);
    function split(arr) {
        let len = arr.length;
        if(!arr || len === 0)
            return [];
        if(len === 1)
            return arr;
        let middle = Math.floor(len/2);
        let left = arr.slice(0,middle);
        let right = arr.slice(middle);
        return merge(split(left), split(right));
    }
    function merge(left,right) {
        let res = [];
        let p1 = left.length - 1;
        let p2 = right.length - 1;
        while(p1>=0 && p2>=0){
            if(left[p1] <= right[p2]){
                res.push(right[p2]);
                p2--;
            } else {
                res.push(left[p1]);
                p1--;
                count += p2 + 1;
            }
        }
        res.reverse();
        if(p1>=0)
            res = left.slice(0,p1 + 1).concat(res);
        if(p2>=0)
            res = right.slice(0,p2 + 1).concat(res);
        return res;
    }
    return count;
}
console.log(inversePairs([7,5,6,4]));
//求未排序数组中累加和为给定值的最长子数组长度
//思路：用sum[j]记录从0到j的累加和，那么以位置j结尾的满足累加和为K的最长子序列的开头就应该是从0开始第一次出现累加和为sum[j]-K的位置i
function maxLength(arr,key) {
    if(!arr || arr.length === 0){
        return 0;
    }
    let map = new Map();  //用map记录累加和为key,第一次出现该累加和的位置i
    let sum = 0;
    let res = 0;
    map.set(0,-1);
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
        let temp = map.get(sum-key);
        if(temp){
            let dist = i - temp;
            res = dist > res ? dist: res;
        }
        if(!map.get(sum)){
            map.set(sum,i);
        }
    }
    return res;
}
console.log(maxLength([3,-2,-4,0,6],3));
//求未排序数组中累加和小于或等于给定值key的最长子数组长度
function maxLengthDayu(arr, key) {
    if(!arr || arr.length === 0){
        return 0;
    }
    let res = 0;
    let sum = 0;
    let h = [];  //数组记录某一位之前的最大累加和，不算自己本身
    h[0] = sum;
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
        h[i+1] = Math.max(sum, h[i]);
    }
    sum = 0;
    for(let j=0; j<arr.length; j++){
        sum += arr[j];
        let index = j - findIndex(h,sum - key) + 1;
        res = index > res? index: res;
    }
    return res;
    function findIndex(array,val) {  //在阶梯递增的数组array中找到第一次大于或者等于val的值
        let left = 0;                //递增阶梯数组形如：[1,3,3,3,5,5,5,6,6,7]这样
        let right = array.length - 1;
        let res;
        while (left<=right){
            let mid = Math.floor((left + right)/2);
            if(array[mid]>=val){
                res = mid;
                right = mid - 1;
            } else{
                left = mid + 1;
            }
        }
        return res;
    }
}

console.log(maxLengthDayu([3,-2,-4,0,6], -2));

//在旋转数组中用二分法查找值
function isInverseArr(arr,val) {
    if(!arr || arr.length === 0){
        return -1;
    }
    let len = arr.length;
    let start = 0;
    let end = len - 1;
    let mid = 0;
    while(start < end) {
        mid = Math.floor((start + end)/2);
        let middle = arr[mid];
        let enddle = arr[end];
        let startle = arr[start];
        if(middle === val) return mid;
        if(middle < enddle){  //mid在右边有序数组中
            if(middle > val){  //val存在右边序列中
                end = mid - 1;
            }
            if(middle < val){   //val有可能在后面，也有可能在前面
                if(enddle > val) start = mid + 1;
                if(enddle < val) end = mid - 1;
                if(enddle === val) return end;
            }
        } else if(middle > enddle){
            if(middle < val){
                start = start + 1;
            }
            if(middle > val){
                if(startle < val) end = mid - 1;
                if(startle > val) start = start + 1;
                if(startle === val) return start;
            }
        } else if(middle === enddle){
            end = mid - 1;
        } else if(startle === enddle){
            if(arr[mid] < val) start = mid + 1;
            if(arr[mid] > val) end = mid - 1;
            if(arr[mid] === val) return  mid;
        }
    }
    if(start === end){
        if(val !== arr[start]){
            return -1;
        }
        return start;
    }
}
//给定n个整数，找出平均数最大且长度为k的子数组，输出最大的平均数
function findMaxAverage(k, arr) {
   let sum = 0;
   for(let i=0; i<k; i++){
       sum += arr[i];
   }
   let res = sum;
   for(let i=k; i<arr.length; i++){
       sum -= arr[i-k];
       sum += arr[i];
       if(sum > res) res = sum;
   }
   return (res/k).toFixed(3);
}

console.log(findMaxAverage(4,[4,5,6,1,2,3]));