class Compile{
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    const childNodes = el.childNodes; // childNodes是一个类数组对象，不是数组，不能使用forEach方法
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) { // 判断是否为节点 
        this.compileElement(node);
      } else if (this.isInter(node)) {
        this.compileText(node);  // 判断是否为插值文本 {{}} 
      }

      if (node.childNodes && node.childNodes.length > 0) { // 递归
        this.compile(node);
      }
    });
  }
  // 元素
  isElement(node) {
    return node.nodeType === 1;
  }
  // 插值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileElement(node) {
    console.log("编译元素" + node.nodeName);  
    // const attrs = node.attributes;
    // Array.from(attrs).forEach(attr => {
    //   const attrName = attr.name;
    //   const exp = attr.value;
    //   if (this.isDirective(attrName)) {
    //     const dir = attrName.substring(2);
    //     this[dir] && this[dir](node, exp);
    //   }
    //   if (this.isEvent(attrName)) {
    //     const dir = attrName.substring(1);
    //     this.eventHandler(node, exp, dir);
    //   }
    // });
  }

  compileText(node) {
    // this.update(node, RegExp.$1, 'text');
    console.log("编译插值⽂本" + node.textContent);
  }
}