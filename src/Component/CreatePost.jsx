import { useState } from 'react';
import styles from '../styles/home.module.css';
import {createPost} from '../api'
import { toast } from 'react-toastify';
import { usePosts }  from '../hooks';
const CreatePost = () => {
const [post,setPost]=useState('')
const [addingPost,setAddingPost]=useState(false)
const posts=usePosts()
const handleAddPostClick=async ()=>{
    setAddingPost(true)
    if (!post) {
       return toast.info('Please fill all the fields');   
         }
    const response=await createPost(post);
    if(response.success){
      posts.addPostToState(response.data.post)
      toast.success("Post added successfully");
      setPost('')
    }else{
        toast.error(response.message);
    }
    setAddingPost(false);
}

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
      placeholder='Type Here'
      value={post}
      onChange={(e)=>setPost(e.target.value)}
      required
/>

      <div>
        <button
          className={styles.addPostBtn}
          disabled={addingPost}
  onClick={handleAddPostClick}
  >{addingPost?"AddingPost...":"AddPost"}
        </button>
      </div>
    </div>
  );
};


export default CreatePost;
