//二叉搜索树
let Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
};
let BinarySearchTree = (function() {
    //插入新的节点
    function insertNode(node,newNode) {
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else {
                insertNode(node.left,newNode);
            }
        }else {
            if(node.right === null){
                node.right = newNode;
            }else {
               insertNode(node.right,newNode);
            }
        }
    }
    //中序遍历，打印出来的是升序
    function inOrderTraverseNode(node,callback) {
        if(node !== null){
            inOrderTraverseNode(node.left,callback);
            callback(node.key);
            inOrderTraverseNode(node.right,callback);
        }
    }
    //前序遍历
    function preOrderTraverseNode(node,callback) {
        if(node !== null){
            callback(node.key);
            preOrderTraverseNode(node.left,callback);
            preOrderTraverseNode(node.right,callback);
        }
    }
    //后序遍历
    function postOrderTraverseNode(node,callback) {
        if(node !== null){
            postOrderTraverseNode(node.left,callback);
            postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }
    //最小值
    function minNode(node) {
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node;
        }
        return null;
    }
    //最大值
    function maxNode(node) {
        if(node){
            while(node && node.right !== null){
                node = node.right;
            }
            return node;
        }
        return null;
    }
    //根据key查找Node是否存在
    function includesNode(node,key) {
        if(node === null) return false;
        if(key === node.key){
            return true;
        }else if(key < node.key){
            includesNode(node.left,key);//如果node.left === null,会在递归结果中返回false,所以此处不需要判断
        }else if(key > node.key){
            includesNode(node.right,key);
        }
    }
    //从树中移除某个键
    function removeNode(node,key) {
        if(node === null){
            return null;
        }
        if(key < node.key){
            node.left = removeNode(node.left,key);
        }else if(key > node.key){
            node.right = removeNode(node.right,key);
        }else{
            if(node.left === null && node.right === null){
                node = null;
            }else if(node.left === null){
                node = node.right;
            }else if(node.right === null){
                node = node.left;
            }else {
                let minnode = minNode(node.right);
                node.value = minnode.value;
                node.right = removeNode(node.right,minnode.value);
            }
        }
        return node;   //返回更新后的node
    }
    function treeHeight(node) {
        if(node === null)
            return 0;
        let left = treeHeight(node.left);
        let right = treeHeight(node.right);
        return Math.max(left,right)+1;
    }
    function treeWidth(node) {
        if(node === null)
            return 0;
        let maxWidth = 0;
        let queue = [node];
        let curlevel;
        while (queue.length){
            curlevel = queue.length;
            for(let i=0;i<curlevel;i++){
                let curNode = queue.shift();
                curNode.left? queue.push(curNode.left):'';
                curNode.right? queue.push(curNode.right):'';
                if(curlevel>maxWidth){
                    maxWidth = curlevel;
                }
            }
        }
        return maxWidth;
    }
    function rotationLL(node){
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    function rotationRR(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    function rotationRL(node){
        node.right = rotationLL(node.right);
        return rotationRR(node);
    }
    function rotationLR(node){
        node.left = rotationRR(node.left);
        return rotationLL(node);
    }
    function isBalance(node) {
        if(node === null){
            return node;
        }
        let leftHeight = treeHeight(node.left);
        let rightHeight = treeHeight(node.right);
        if(leftHeight - rightHeight >1){
            if(treeHeight(node.left.left) >= treeHeight(node.left.right) > 1){
                node = rotationLL(node);
            }else{
                node = rotationLR(node);
            }
        }else if(rightHeight - leftHeight>1){
            if(treeHeight(node.right.right) >= treeHeight(node.right.left)){
                node = rotationRR(node);
            }else{
                node = rotationRL(node);
            }
        }
        return node;
    }
    //平衡二叉搜索树的插入
    function balanceInsertNode(node,newNode){
        if(node === null){
            node = newNode;
        }else if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                node.left = balanceInsertNode(node.left,newNode);
                node = isBalance(node);//从根节点root开始，插入路径中的每个节点都判断是否满足平衡条件
            }
        }else if(newNode.key > node.key){
            if(node.right === null){
                node.right = newNode;
            }else{
                node.right = balanceInsertNode(node.right,newNode);
                node = isBalance(node);
            }
        }
        return node;
    }
    //平衡二叉搜索树的删除
    //初始化,构建一棵树
    class Binary {
        constructor(){
            this.root = null;
        }
        insert(key) {
            let newNode = new Node(key);
            if (this.root === null) {
                this.root = newNode;
            } else {
                insertNode(this.root, newNode);
            }
        };
        insertAVL(key) {
            let newNode = new Node(key);
            if (this.root === null) {
                this.root = newNode;
            } else {
                this.root = balanceInsertNode(this.root, newNode);
            }
        };
        inOrderTraverse(callback) {
            inOrderTraverseNode(this.root, callback);
        };
        preOrderTraverse(callback) {
            preOrderTraverseNode(this.root, callback);
        };
        postOrderTraverse (callback) {
            postOrderTraverseNode(this.root, callback);
        };
        min() {
            return minNode(this.root);
        };
        max() {
            return maxNode(this.root);
        };
        search(key) {
            return includesNode(this.root, key);
        };
        getHeight(){
            return treeHeight(this.root);
        }
        getWidth(){
            return treeWidth(this.root);
        }
        remove(key) {
           this.root = removeNode(this.root, key);
        }
    }
    return Binary;
})();
//遍历每个元素的方法
function printNode(val) {
    console.log(val);
}
let tree = new BinarySearchTree();
tree.insert(5);
tree.insert(2);
tree.insert(3);
tree.insert(6);
tree.insert(1);
tree.remove(1);
console.log('treeWidth is',tree.getWidth());
console.log('treeHeight is',tree.getHeight());
tree.inOrderTraverse(printNode);

let avl = new BinarySearchTree();
avl.insertAVL(90);
avl.insertAVL(50);
avl.insertAVL(70);
avl.insertAVL(130);
avl.insertAVL(30);
avl.insertAVL(60);
avl.inOrderTraverse(printNode);

console.log(avl.getHeight());
