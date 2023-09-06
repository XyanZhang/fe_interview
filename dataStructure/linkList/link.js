// 反转链表
var reverseList = function(head) {
  let cur = head;
  let prev = null;
  while(cur !== null)  {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}