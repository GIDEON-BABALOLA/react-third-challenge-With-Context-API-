import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { format as dateFormat } from "date-fns";
import api from "../src/api/posts"
import DataContext from './context/DataContext';
const NewPost = () => {
  const navigate = useNavigate()
  const { posts, setPosts } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = dateFormat(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(err.response.status);
    }
  };
  return (
    <main className='NewPost'>
        <h2>NewPost</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input 
          id="postTitle"
          type= "text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
        id="postBody"
        //It does not need a type text because it is already a text area
        required
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
         />
<button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost