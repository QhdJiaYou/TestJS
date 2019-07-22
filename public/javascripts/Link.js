let Node = function (val) {
    this.val = val;
    this.next = null;
};
let LinkedList = (function () {
    class Linked {
        constructor(){
            this.length = 0;
            this.head = null;
        }
        append(val){
            let current;
            let node = new Node(val);
            if(this.head === null){
                this.head = node;
            }else{
                current = this.head;
                while(current.next){
                    current = current.next;
                }
                current.next = node;
            }
            this.length++;
        }
        insert(position,val){     //已有的元素下标是0~length-1,总长度是length
            if(position>=0&&position <= this.length){   //可以插入的位置是从0~length
                let node = new Node(val);
                let current = this.head;
                let previous;
                let index = 0;
                if(position === 0){
                    node.next = current;
                    this.head = node;
                }else{
                    while (index++<position){
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }
                this.length++;
                return true;
            }else{
                return false;
            }
        }
        removeAt(position){
            if(position>=0&&position<this.length){
                let current = this.head;
                let previous;
                let index = 0;
                if(position === 0){
                    this.head = current.next;
                }else{
                    while(index++ < position){
                        previous = current;
                        current = current.next;
                    }
                    previous.next = current.next;
                }
                this.length--;
                return current.val;
            }else{
                return null;
            }
        }
        remove(val){
           let current = this.head;
           let previous;
           if(current.val === val){
               this.head = current.next;
           }else{
               while(current !== null && current.val !== val){
                   previous = current;
                   current = current.next;
               }
               if(current === null){
                   return null;
               }else {
                   previous.next = current.next;
               }
           }
           this.length--;
           return current.val;
        }
        indexOf(val){
            let current = this.head;
            let index = 0;
            while (current !== null && current.next !== val){
                current = current.next;
                index++;
            }
            if(current === null){
                return -1;
            }else{
                return index;
            }
        }
        isEmpty(){
            return this.length === 0;
        }
        size(){
            return this.length;
        }
        getHead(){
            return this.head;
        }
        toString(){
            let current = this.head;
            let str = '';
            while (current){
                str += current.val + (current.next? ' ':'');
                current = current.next;
            }
            return str;
        }
        print(){
            console.log(this.toString());
        }
    }
    return Linked;
})();

let link = new LinkedList;
link.append(2);
link.append(4);
link.append(6);
console.log(link.remove(6));
link.print();