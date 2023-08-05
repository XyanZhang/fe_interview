import React, { useCallback, useState } from "react";
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
  const { loading, value, error } = useAsync((
    useCallback(async () => {
      return await getComments(postId);
    }, [postId])
  ));

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
  const [currentPostId, setCurrentPostId] = useState(articles && articles[0] && articles[0].id); // 当前文章id
  const { comments, commentsLoading, commentsError } = useComments(currentPostId);

  let flushList = useCallback((type) => {
    if(type === 'page') {
      setPage(page + 1);
    }else if(type === 'size') {
      setSize(size + 1);
    }
  }, [page, size]);

  const selectArticle = useCallback((postId) => {
    setCurrentPostId(postId);
  }, []);

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
                  <h1 onClick={selectArticle.bind(this, item.id)} >{item.title}</h1>
                  <p>{item.body}</p>
                </div>
              )
            })
          )
        )
      }
      <hr></hr>
      {
        commentsLoading ? <div>loading...</div> : (
          commentsError ? <div>error</div> : (
            comments && comments.map(item => {
              return (
                <div key={item.id}>
                  <h1>{item.name}</h1>
                  <p>{item.body}</p>
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