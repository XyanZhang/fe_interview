const mergeRows = (rows, key) => {
  rows[0].rowSpan = 1;
  let idx = 0;
  return rows.slice(1).reduce(
    (mergedRows, item, index) => {
      if (item[key] === mergedRows[idx][key]) {
        mergedRows[idx].rowSpan++;
        item.colSpan = 0;
      } else {
        item.rowSpan = 1;
        idx = index + 1;
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