import React, {useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useWindowAlert from './hooks/useWindowAlert';
import DataContext from './context/DataContext';
import api from "../src/api/posts"
const PostPage = () => {
  const navigate = useNavigate()
  const {posts, setPosts} = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id)
  const { show } = useWindowAlert({ text : `Are You sure you want to delete post ${post.title}`})
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(err.response.status);
    }
  };
  return (
    <main className='PostPage'>
    <article className='post' >
      {post && 
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/edit/${post.id}`}>
            <button className='editButton'>
              Edit Post
            </button>
          </Link>
          <button
          className='deleteButton'
          onClick={() =>
          {   show();
             handleDelete(post.id)}}
          > Delete Post</button>
        </>
      }
      {!post && 
      <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </>}
    </article>
    </main>
  ) 
}

export default PostPage