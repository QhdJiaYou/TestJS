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
//3.1找出数组中重复的数(方法二)，时间复杂度O(n),空间O(1)
//利用数字值的大小不会超过数组下标的最大值
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
console.log('找出重复元素1',duplicate(arrr));
console.log('找出重复元素2',duplicateTwo(arrr));

//3.2 不修改数组找出重复的数字,用时间换空间，时间复杂度是O(nlogn)，空间O(1)
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
        let j = 0;
        if(target > arr[i][j]){
            for(let k = 0;k < arr.length;k++){
                arr[k].shift();
            }
        }else if(target < arr[i][j]){
            arr.pop();
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
    queue.push(tree);
    while(queue.length){
        let level = queue.length;
        let layer = 0;
        let curLevel = [];          //用来分层遍历
        for(let i=0;i < level;i++){
            let curNode = queue.shift();
            curLevel.push(curNode.value);
            curNode.left? queue.push(curNode.left) : '';    //先push左边的
            curNode.right? queue.push(curNode.right) : '';
            layer++;
        }
        if(layer%2 !== 0){
            res.push(curLevel);
        }else{
            res.push(curLevel.reverse());
        }
    }
    return res;
}
console.log(WFSZigzag(tree));   //之字形打印
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
//面试题8：二叉树的下一个节点
function nextValue(tree,node){
    if(tree === null || node === null)
        return null;
    if(node.right !== null){
        let nRight = node.right;
        while(nRight && nRight.left !== null){
            nRight = nRight.left;
        }
        return nRight;
    }else{
        if(node.parent.left === node){
            return node.parent;
        }else{
            while(node.parent && node.parent.right === node){
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
                if (str[i] < res)
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
let pathLength = 0;
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

//面试题

