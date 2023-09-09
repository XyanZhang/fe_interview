// 反转链表
var reverseList = function (head) {
  let cur = head;
  let prev = null;
  while (cur !== null) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // 在链表指定位置插入节点
  insert(data, position) {
    const newNode = new Node(data);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let count = 0;
      while (current !== null && count < position - 1) {
        current = current.next;
        count++;
      }
      if (current !== null) {
        newNode.next = current.next;
        current.next = newNode;
      }
    }
  }

  // 从链表中删除节点
  delete(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null && current.next.data !== data) {
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
    }
  }

  // 打印链表内容
  print() {
    let current = this.head;
    const result = [];
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join(' -> '));
  }
}

// 创建一个链表实例
const linkedList = new LinkedList();

// 向链表添加节点
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);

// 打印链表内容
linkedList.print(); // 输出: "1 -> 2 -> 3"

// 在指定位置插入节点
linkedList.insert(4, 1);

// 打印链表内容
linkedList.print(); // 输出: "1 -> 4 -> 2 -> 3"

// 删除节点
linkedList.delete(2);

// 打印链表内容
linkedList.print(); // 输出: "1 -> 4 -> 3"
