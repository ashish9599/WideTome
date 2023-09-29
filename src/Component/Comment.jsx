import PropTypes from 'prop-types';

import styles from '../styles/home.module.css';
import {  useState } from 'react';
import { toggleLike } from '../api';
import { toast } from 'react-toastify';
import { useAuth, usePosts } from '../hooks';

const Comment = ({ comment }) => {
  const [liked,setliked]=useState(false);
const auth=useAuth();  
const posts=usePosts();
  const time=comment.createdAt;

  const min=Number(time.slice(14,16));
  const hr=Number(time.slice(11,13));
  const sec=Number(time.slice(17,19));
  const handlCommentlike=async()=>{
const response=await toggleLike(comment._id,'Comment');
if(response.success){
  const liked=response.data.deleted;
  const presnt=comment.likes.indexOf(auth.user._id)
if(liked&&presnt!==0){
  setliked(true)
  posts.addCommentlikes(auth.user._id,comment.post,comment._id)
  toast.success("You liked a comment ")
}else{
  if( comment.likes.length>0){
   posts.removeCommentlikes(auth.user._id,comment.post,comment._id)
    setliked(false);
    toast.error("You disliked a comment ")
  }
    
  
} 

}else{
toast.error(response.message);
}

}
    return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>{hr}:{min}:{sec}  ago</span>
        {/* <span className={styles.postCommentLikes}>22</span> */}
        <div className={styles.rightComment}>

        <i className={`fa-solid fa-heart ${liked?styles.commentLikeButton:""}`}
        onClick={handlCommentlike}>
        </i>
             
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
          </div>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
