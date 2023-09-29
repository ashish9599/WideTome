import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import Comment from './Comment';
import { useState } from 'react';
import { createComment,toggleLike } from '../api';
import { toast } from 'react-toastify';
import { usePosts,useAuth } from '../hooks';

const Post = ({ post }) => {
  const [comments,setComment]=useState('');
  const [liked,setLiked]=useState(false);
const posts=usePosts();
const auth=useAuth();
//   console.log("it user",auth.user._id);
// console.log(posts);
const time=post.createdAt;
// console.log(post.createdAt)
const min=Number(time.slice(14,16));
const hr=Number(time.slice(11,13));
const sec=Number(time.slice(17,19));

const handleAddComment=async(e)=>{
  if(e.key==="Enter"){
    const response=await createComment(comments,post._id)
    // console.log(response)
    if(response.success){
      posts.addComment(response.data.comment,post._id);
      toast.success('Comment added Successfully');
      setComment('');
    }else{
      toast.error(response.message);
    }
    }
  }  
  
  const handlePostLikes=async()=>{
    const response=await toggleLike(post._id,'Post')
    if(response.success){
      const presnt=post.likes.indexOf(auth.user._id)
      // console.log(presnt);
      if(response.data.deleted &&presnt!==0){
        posts.addlikes(auth.user._id,post._id);
        setLiked(true);
        toast.success('You like a post');
      }else{
        if( post.likes.length>0){
          posts.removelikes(auth.user._id,post._id);
          setLiked(false);
          toast.error('You dislike a post');
        }
      }
  }else{
      toast.error(response.message);
  }
}

return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>{hr}:{min}:{sec}  ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <i className={`fa-solid fa-heart ${liked?styles.commentLikeButton:""} `} onClick={handlePostLikes}></i>
            
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
          <i className="fa-regular fa-message"></i>
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
          value={comments}
          onChange={(e)=>setComment(e.target.value)}
            placeholder="Start typing a comment"
          onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
