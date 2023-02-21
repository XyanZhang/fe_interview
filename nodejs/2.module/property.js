// 从模块外部访问模块内的成员
// 使用exports对象
// 使用module.exports导出引用类型

// 模块对象的属性
console.log(
  module.id,
  module.filename,
  module.loaded,
  module.parent,
  module.children,
  module.paths
);
