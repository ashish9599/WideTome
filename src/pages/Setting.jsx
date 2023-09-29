
import { toast } from 'react-toastify';
import { Link,  } from 'react-router-dom';
import styles from '../styles/setting.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
const Settings = () => {
  const auth = useAuth();
    

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState(auth.user?.password ? auth.user.password : '');
  const [confirmPassword, setConfirmPassword] = useState(auth.user?.password ? auth.user.password : '');
  const [savingForm, setSavingForm] = useState(false);
  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  
  };

  const updateProfile = async () => {
    
    setSavingForm(true);
    if (!name || !password || !confirmPassword) {
      
     return toast.info('Please fill all the fields');      
      
      }
      
      if (password !== confirmPassword) {
      return  toast.info('Password and confirm password does not match');      
    }

    
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    if (response.success) {
      setEditMode(false);
      clearForm();

     return   toast.success('User updated successfully');      
       
    } else {
      toast.error(response.message);
    }
    setSavingForm(false);
  };


  return (<>
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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ?
        (
          <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          ) 
          :(<div className={styles.fieldValue}>{auth.user?.name}</div>
          )}
      </div>
{editMode&&
<>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Password</div>
        <input type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Confirm Password</div>
        <input type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
         />
      </div>
</>
      }
      <div className={styles.btnGrp}>
        {editMode?
      <>
      <button
        className={`button ${styles.saveBtn}`}
        onClick={updateProfile}
        >
        {savingForm ? 'Saving profile...' : 'Save profile'}
      </button>
      <button
        className={`button ${styles.editBtn}`}
        onClick={() => setEditMode(false)}
        >
        Go back
      </button>
    </>
      :
      <button
      className={`button ${styles.editBtn}`}
      onClick={() => setEditMode(true)}
      >
            Edit Profile
          </button>
      }
      </div>
    </div>
      </>
  );
};


export default Settings;
