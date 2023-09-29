import { createContext } from "react";
import { useProviderPosts } from "../hooks";
const intialState={
    posts:[],
    loading: true,
    likelength:0,
    addPostToState: () => {},
    addComment:()=>{},
    addlikes:()=>{},
    removelikes:()=>{},
    addCommentlikes:()=>{},
    removeCommentlikes:()=>{},
}
export const PostsContext=createContext(intialState);
export const PostsProvider=({children})=>{
    const posts=useProviderPosts();
   return <PostsContext.Provider value={posts}>
    {children}
</PostsContext.Provider>
}