import { useCallback } from "react";
import useAsync from "../../hooks/useAsync";
import { getTodosData } from "../../api";


function List(props) {
  const {
    execute,
    value: listData,
    // status,
    // error
  } = useAsync(getTodosData, false);


  let handleClick = useCallback(() => {
    execute();
  }, [execute]);

  return (
    <div>
      <button onClick={handleClick}>获取list数据</button>
      <h1>list</h1>
      <ul style={{maxHeight: '400px',overflow: 'auto', background: '#111111', color: '#fff'}}>
        {
          listData && listData.map(item => {
            return (
              <li key={item.id}>{item.completed} -- {item.title} -- {item.userId}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default List;