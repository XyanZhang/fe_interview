import { useCallback, useState } from "react";
const { useAsync } = require("../../hooks");

let getPosts = async (page=1, size=10) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${size}&_page=${page}`);
  return await res.json();
}
let getComments = async (postId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return await res.json();
}

let useArticles = (page,size) => {
  const { loading, value, error } = useAsync(
    // 此处需要使用useCallback，否则会导致多次渲染，因为每次执行函数都会导致useAsync重新执行
    useCallback(async () => {
      return await getPosts(page,size);
    }, [page,size])
  );

  return {
    articlesLoading: loading,
    articles: value,
    articlesError: error
  }
}

let useComments = (postId) => {
  const { execute, loading, value, error } = useAsync(async () => {
    return await getComments(postId);
  }, true);

  return {
    commentsLoading: loading,
    comments: value,
    commentsError: error
  }
}

function PostComment(props) {
  const [page, setPage] = useState(1); //
  const [size, setSize] = useState(2);
  const { articles, articlesLoading, articlesError } = useArticles(page, size);
  // const { comments, commentsLoading, commentsError } = useComments(articles);

  let flushList = useCallback((type) => {
    if(type === 'page') {
      setPage(page + 1);
    }else if(type === 'size') {
      setSize(size + 1);
    }
  }, [page, size]);

  return (
    <>
      <button onClick={flushList.bind(this,'page')}>增加page</button>
      <button onClick={flushList.bind(this,'size')}>增加size</button>
      {
        articlesLoading ? <div>loading...</div> : (
          articlesError ? <div>error</div> : (
            articles && articles.map(item => {
              return (
                <div key={item.id}>
                  <h1>{item.title}</h1>
                  <p>{item.body}</p>
                  {/* <Comments postId={item.id}></Comments> */}
                </div>
              )
            })
          )
        )
      }
    </>
  )
}

export default PostComment;