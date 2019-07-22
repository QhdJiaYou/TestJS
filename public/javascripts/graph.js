function Graph() {  //无向图
    let vertices = [];
    let adjList = new Map(); //使用顶点作为键，邻接顶点列表存储成数组作为值
    this.addVertices = function (v) {
        vertices.push(v);
        adjList.set(v,[]);
    };
    this.addEdge = function (v,w) {//无向图添加边双向,如果是有向图就只按照方向添加一条边
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    };
    this.toString= function () {
        let s = '';
        for(let i=0; i<vertices.length; i++){
            s += vertices[i] + '->';
            let neighbors = adjList.get(vertices[i]);
            for(let j=0; j<neighbors.length; j++){
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    };
    function initializeColor() {  //用color数组记录每个顶点的访问状态
        let color = [];
        //未被访问是白色'white',已访问但未被搜索过的是灰色'grey',访问过并且完全探索过是黑色'black'
        for(let i=0; i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    }
    //广度优先搜索BFS,借助队列的数据结构存储
    this.bfs = function(v,callback) {
        let color = initializeColor();
        let queue = [v];
        color[v] = 'grey';   //顶点在入队列的时候变灰
        while(queue.length){
            let u = queue.shift();
            let neighbors =  adjList.get(u);
           // color[u] = 'grey';
            for(let i=0;i<neighbors.length;i++){
                let w = neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'grey';
                    queue.push(w);
                }
            }
            color[u] = 'black';
            if(callback){
                callback(u);
            }
        }
    };
    //深度优先搜索（递归遍历）
    //深度优先遍历过程中发现某个节点有一条边指向color为灰色(grey)的节点，那么存在环
    //在已知无环的连通图中，深度优先搜索可以进行拓扑排序（非连通的图也会存在问题）
    //或者让环路检测和DFS同时进行，毕竟环路检测也可以在DFS的基础上进行
    //对于有环的图进行拓扑排序没有意义
    this.dfs = function (callback) {
        let color = initializeColor();
        for(let i=0; i<vertices.length; i++){
            let v = vertices[i];
            if(color[v] === 'white'){
                dfsVisit(v,color,callback);
            }
        }
    };
    let dfsVisit = function(v,color,callback){
        color[v] = 'grey';
        if(callback){
            callback(v);
        }
        let neighbor = adjList.get(v);
        for(let i=0; i<neighbor.length; i++){
            let w = neighbor[i];
            if(color[w] === 'white'){
                dfsVisit(w,color,callback);
            }
        }
        color[v] = 'black';
    }
}

let graph = new Graph();
var verticesArray = ['A','B','C','D','E','F','G','H','I'];
for(let i = 0; i < verticesArray.length; i++) {
    graph.addVertices(verticesArray[i]);
}
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');
function printVertices(u) {
    console.log(u);
}
graph.dfs(printVertices);
function DirectedGraph() {  //有向图
    let ver = [];
    let edge = new Map(); //使用邻接表存储边信息
    let inDegree = [];
    let dfsRes = '';
    this.addVer = function (v) {
        ver.push(v);
        edge.set(v,[]);
        inDegree[v] = 0;
    };
    this.addEdge = function(u,v){
        edge.get(u).push(v);
        inDegree[v]++;
    };
    this.addWeightedEdge = function (u,v,w) {
        edge.get(u).push([v,w]);
        inDegree[v]++;
    };
    //将顶点分为集合S和集合U，S中的点表示已经求出最短路径的点，U中是待求的，
    // 每次从U中选一个顶点放入S中，这个顶点是U中距离顶点v距离最小的点
    //迪杰斯特拉算法解决单源最短路径问题(贪心的思想)
    this.dijkstra = function (v) {
        let dist = {};//存储顶点v到各个顶点的最短路径，要不断的更新
        let index = new Array(ver.length).fill(0);//标记着顶点所属的集合，1表示已求出最短路径的点
        let count = 1;//用来记录求出最短路径的顶点的个数
        let minDist = Number.MAX_VALUE, minV = v;
        //minDist表示当前未求出最短路径的点中距离v的最短距离，minV记录是哪个顶点
        for(let j =0; j<ver.length; j++){
            if(!dist[ver[j]]){
                dist[ver[j]] = Number.MAX_VALUE;//初始化所有距离为最大值
            }
        }
        dist[v] = 0;
        index[v] = 1;
        let minVer = null;  //记录内部循环获取到的最短路径的顶点
        while (count !== ver.length){
            let neighbor = edge.get(minV);
            for(let k=0;k<neighbor.length;k++){
                let u = neighbor[k];   //u[0]表示顶点，u[1]表示到该顶点的权重
                if(minV === v){        //S集合中只有开始顶点，做初始化
                    dist[u[0]] = u[1];
                }else if(!index[u[0]] && dist[minV] + u[1] < dist[u[0]]){  //更新集合U中minV的邻居节点的最短距离
                    dist[u[0]] = dist[minV] + u[1];
                }
                if(minDist > dist[u[0]]){
                    minDist = dist[u[0]];
                    minVer = u[0];
                }
            }
            minV = minVer;  //获取上一轮最小路径的顶点
            index[minV] = 1;  //加入到集合S
            count++;
            minDist = Number.MAX_VALUE;
        }
        return dist;
    };
    function initializeColor() {  //用color数组记录每个顶点的访问状态
        let color = [];
        //未被访问是白色'white',已访问但未被搜索过的是灰色'grey',访问过并且完全探索过是黑色'black'
        for(let i=0; i<ver.length; i++){
            color[ver[i]] = 'white';
        }
        return color;
    }
    //拓扑排序有很多种情况
    this.topology = function () {
        let stack = [];      //存储入度为0的顶点
        let res = '';
        for(let i=0; i<ver.length; i++){
            if(!inDegree[ver[i]]){
                stack.push(ver[i]);
            }
        }
        while (stack.length){
            stack.sort();      //字典序小的排在前面
            let u = stack.shift();
            res += u;
            let neighbor = edge.get(u);
            for(let j=0; j<neighbor.length; j++){
                let n = neighbor[j];
                inDegree[n]--;    //每次修改对应顶点的入度即可
                if(!inDegree[n]){
                    stack.push(n);
                }
            }
        }
        return res;
    };
    this.dfs = function () {
        let color = initializeColor();
        for(let i=0; i<ver.length; i++){
            let v = ver[i];
            if(color[v] === 'white'){
              dfsVisit(v,color);
            }
        }
        return dfsRes;
    };
    function dfsVisit(v,color){
        color[v] = 'grey';
        dfsRes += v;
        let neighbor = edge.get(v);
        for(let i=0;i<neighbor.length;i++){
            let w = neighbor[i];
            if(color[w] === 'white'){
                dfsVisit(w,color);
            }
        }
        color[v] = 'black';
    }
}
let gra = new DirectedGraph();
let vertices = ['a','b','c','d','e','f'];
for(let i = 0; i < vertices.length; i++) {
    gra.addVer(vertices[i]);
}
gra.addEdge('a','b');
gra.addEdge('a','d');
gra.addEdge('a','c');
gra.addEdge('d','e');
gra.addEdge('c','b');
gra.addEdge('c','e');
gra.addEdge('f','d');
gra.addEdge('f','e');
console.log(gra.topology());
console.log(gra.dfs());

let g = new DirectedGraph();
let v = ['a','b','c','d','e'];
for(let i = 0; i < v.length; i++) {
    g.addVer(v[i]);
}
g.addWeightedEdge('a','b',4);
g.addWeightedEdge('a','d',2);
g.addWeightedEdge('d','b',1);
g.addWeightedEdge('b','c',4);
g.addWeightedEdge('d','c',1);
g.addWeightedEdge('d','e',7);
g.addWeightedEdge('c','e',3);
console.log(g.dijkstra('a'));


