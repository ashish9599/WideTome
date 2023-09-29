import styles from '../styles/home.module.css';
import { Loader,FriendList, CreatePost ,Post} from '../Component';
import { useAuth, usePosts } from '../hooks';
export const Home=()=>{
const auth=useAuth();  
const posts=usePosts();
// console.log(posts);


  if(posts.loading){
   return <Loader/>
  }
  return (
  <div className={styles.home}>
    <div className={styles.postsList}>
     {auth.user&& <CreatePost/>}
      {posts.data.map((post) => (
     <Post post={post} key={`post-${post._id}`}/>
     ))}
    </div>

   {auth.user && <FriendList/>}
  </div>
 )
}

export default Home;