import { toast } from 'react-toastify';
import styles from '../styles/login.module.css';
import { useState } from 'react';

import { useAuth } from '../hooks';
import { Link, Navigate } from 'react-router-dom';
const Login = () => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [logginIn,setLoggingIn]=useState(false);
const auth=useAuth();
// console.log(auth); 
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLoggingIn(true);
    const response=await auth.login(email,password); 
  
    if(response.success){
      toast.success("Successfully Logged in")
    }else{
      toast.error(response.message);
    }
    setLoggingIn(false);
  }

  if (auth.user) {
    return <Navigate to='/'/>;
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
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input onChange={
          (e)=>setEmail(e.target.value)
        } value={email} type="email" placeholder="Email" required />
      </div>

      <div className={styles.field}>
        <input onChange={(e)=>setPassword(e.target.value)}
        value={password} 
        type="password" placeholder="Paasword" required />
      </div>

      <div className={styles.field}>
        <button disabled={logginIn} >{logginIn?"Logging in":'log in'}</button>
      </div>
    </form>
        </>
  );
};

export default Login;
