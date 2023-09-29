import styles from '../styles/setting.module.css';
import { useEffect,  useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks';
import Loader from '../Component/loader';
import { toast } from 'react-toastify';

import { addFriend, fetchUserProfile,removeFriend } from '../api';
const UserProfile = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
const { userId } = useParams();
  const auth = useAuth();
  const navigate=useNavigate();
// console.log(auth);

  useEffect(()=>{
      const getUser=async()=>{
      const response= await fetchUserProfile(userId);
      if(response.success){
        setUser(response.data.user);
        setLoading(false);
      }else{
        toast.error(response.message)
        navigate('/');
      }
   }
   getUser();
},[userId,navigate])
const checkIfUserIsAFriend=()=>{
  const friends=auth.user.friends;
  const friendId=friends.map((friends)=>friends.to_user._id);
  // console.log("friend-id",friendId)
  // console.log("user-id",userId)
  const index=friendId.indexOf(userId);
  if(index!==-1){
    return true;
  }else{
    return false;
  }

}
const handleRemoveFriendClick=async()=>{
 setRequestInProgress(true);
 const response=await removeFriend(userId);
 if(response.success){
  const friendship= auth.user.friends.filter((friend)=>friend.to_user._id===userId);
  auth.updateUserFriends(false,friendship[0]);
  toast.success("Friend is removed successfully");
  }else{
  
    toast.error(response.message);
  }
  setRequestInProgress(false);
}

const handleAddFriendClick=async ()=>{
  setRequestInProgress(true);
  const response=await addFriend(userId);
  if(response.success){
    const {friendship}=response.data;
    setRequestInProgress(false);
    auth.updateUserFriends(true,friendship);
    toast.success('Friend added successfully!');
  }else{
    toast.error(response.message);
  }
}




  if (loading) {
    return <Loader />;
  }


  return (
    <>
    <div  className={styles.backIm}>
      <Link to={`/`}>
       <span>
          <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png" alt="" />
       </span>
     </Link>
     </div>
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
          />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
{checkIfUserIsAFriend()?
<button
onClick={handleRemoveFriendClick}
disabled={requestInProgress} 
className={`button ${styles.saveBtn}`}
>{requestInProgress?"Removing....":"Remove friend"}</button>
:
<button onClick={handleAddFriendClick}
disabled={requestInProgress}
className={`button ${styles.saveBtn}`}>
  {requestInProgress?"Adding... friend":"Add friend"}</button>
}

      </div>
    </div>
   </>
  );
};

export default UserProfile;
