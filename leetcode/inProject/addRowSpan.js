// 解释：
// 1. 传入一个数组，数组中的每一项都是一个对象，对象中有一个属性是需要合并的属性
// 2. 传入一个需要合并的属性
// 3. 返回一个新的数组，数组中的每一项都是一个对象，对象中有一个属性是需要合并的属性
// 4. 返回的数组中的每一项都有一个rowSpan属性，表示该项需要合并的行数，如果该项不需要合并，则rowSpan为1
// 5. 返回的数组中的每一项都有一个colSpan属性，表示该项需要合并的列数，如果该项不需要合并，则colSpan为1

const mergeRows = (rows, key) => {
  rows[0].rowSpan = 1;
  let idx = 0; // 记录上一个合并的行数的索引
  return rows.slice(1).reduce((mergedRows, item, index) => {
      if (item[key] === mergedRows[idx][key]) {
        mergedRows[idx].rowSpan++; // 上一个合并的行数加1
        item.colSpan = 0; // 当前行不显示
      } else {
        item.rowSpan = 1; // 当前行不需要合并
        idx = index + 1; // 记录当前行的索引
      }
      return [...mergedRows, item];
    },
    [rows[0]]
  );
}; 

let data = [
{val: "a"},
{val: "a"},
{val: "b"},
{val: "b"},
{val: "a"},
{val: "c"},
{val: "c"},
{val: "c"},
]
{ 
  let data2 = data;
  mergeRows(data2, 'val');
  // 
  console.log(data2)
}

/* 
antd 中使用
render: (text, record, index) => {
  return {
    props: {
      rowSpan: record.rowSpan,
      colSpan: record.colSpan
    },
    children: text
  }
}
*/