import { useState,useContext, useEffect } from "react";
import { AuthContext, PostsContext } from "../provider";
import { getPosts } from "../api";
import { editProfile, fetchUserFriends, login as userlogin } from "../api";
import { setItemOnlocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemOnlocalStorage, getItemOnlocalStorage } from "../utils";
import jwt from 'jwt-decode'
import { register } from "../api";
import { toast } from "react-toastify";
export const useAuth=()=>{
    return useContext(AuthContext);
 }
export const useProviderAuth=()=>{
    const [user,setUser]=useState(null);
    const [loading,setloading]=useState(true);

useEffect(()=>{
const getUser=async()=>{
 const userToken=getItemOnlocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if(userToken){
        const user=jwt(userToken);
        const response=await fetchUserFriends();
        let friends=[];
        if(response.success){
            friends=response.data.friends;
          }
          setUser({...user,friends,});
        }
        setloading(false);
}
getUser();
},[])

    const updateUser=async(userId, name, password, confirmPassword)=>{
        const response=await editProfile(userId, name, password, confirmPassword); 
        if(response.success){
         setUser(response.data.user);
         setItemOnlocalStorage(LOCALSTORAGE_TOKEN_KEY,
            response.data.token?response.data.token:null);
            return {success:true,}
        }else{
        return {
            success:false,
            message:response.message,
        }  
        }
      
    }

    

    const login=async(email,password)=>{
        const response=await userlogin(email,password); 
       
        if(response.success){
         setUser(response.data.user);
         setItemOnlocalStorage(LOCALSTORAGE_TOKEN_KEY,
            response.data.token?response.data.token:null);
            return {success:true,}
        }else{
        return {
            success:false,
            message:response.message,
        }  
        }
      
    }



    const logout=(email,password)=>{
     setUser(null);
     removeItemOnlocalStorage(LOCALSTORAGE_TOKEN_KEY)
    }



    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        if (response.success) {
          return {
            success: true,
          };
        } else {
              return {
            success: false,
            message: response.message,
          };
        }
      };
 
      const updateUserFriends = (addFriend, friend) => {
        if (addFriend) {
          setUser({
            ...user,
            friends: [...user.friends, friend],
          });
          return;
        }
        const newFriend=user.friends.filter(
          (f)=>f.to_user._id!==friend.to_user._id)
 
          setUser({
            ...user,
            friends:newFriend,
          })
 
 
        };
    


      return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,   
        updateUserFriends,
    }

}

export const usePosts=()=>{
  return useContext(PostsContext);
}

export const useProviderPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect( ()=>{
    const fetchPosts=async()=>{
      const response= await getPosts() ;
      if(response.success){
        setPosts(response.data.posts);
      }else{
      toast.error(response.message);
      }
      setLoading(false);
    }
  fetchPosts();
  },[])
  const addPostToState=(post)=>{
    const newPosts=[post,...posts]
    setPosts(newPosts);
   }
   const addComment=(comment,postId)=>{
    const newPosts=posts.map((post)=>{
         if(post._id===postId){
          return {...post,comments:[...post.comments,comment]};
         }
         return post;
    })
 setPosts(newPosts);
   }
   
   const addlikes=(userId,postId)=>{
    const newPosts=posts.map((post)=>{
         
      if(post._id===postId){
        post.likes.push(userId);
        // return {...post,likes:[...post.likes,userId]};
      }
      return post;
    })
    console.log(newPosts)
    setPosts(newPosts);
  }
  
  const removelikes=(userId,postId)=>{
    const newPosts=posts.map((post)=>{
      
      // post.likes.push(userId);
      if(post._id===postId){
        const newLikes=post.likes.filter((likeId)=>likeId!==userId);
        // console.log(newLikes)
        return {...post,likes:newLikes};
      }
      return post;
    })
    console.log(newPosts)
 setPosts(newPosts);
   }
//  
const addCommentlikes=(userId,postId,commentId)=>{
  const allpost=[...posts]
  const newpost = allpost.map((posts)=>{
     
        if(posts._id===postId){
          const Cpost= posts.comments.map((comment)=>{
            if(comment._id===commentId){
              return {...comment,likes:[...comment.likes,userId]};
             }
             return comment;
           })
          posts.comments=Cpost
     }
    //  console.log(posts)
     return posts;
    })
  setPosts(newpost);
}





   const removeCommentlikes=(userId,postId,commentId)=>{
    const newpost = posts.map((posts)=>{
     
    if(posts._id===postId){
      const Cpost= posts.comments.map((comment)=>{
        if(comment._id===commentId){
           return {...comment,likes:comment.likes.filter((liked)=>liked!==userId)};
         }
       
            return comment;
       })
      posts.comments=Cpost
     }
     return posts;
    })
  setPosts(newpost); 
  }


  return {
    data:posts,
    loading,
    addPostToState,
    addComment,
    addlikes,
    removelikes,
    removeCommentlikes,
    addCommentlikes,
  };
};