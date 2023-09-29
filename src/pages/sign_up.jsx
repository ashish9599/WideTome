
import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAuth } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const SignUp=  ()=>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    setSigningUp(true);
      if (password !== confirmPassword) {
        return  toast.info('Make sure password and confirm password matches');
      }
      
      const response = await auth.signup(name, email, password, confirmPassword);
     
      if (response.success) {
       navigate('/login');
        return toast.info('User registered successfully, please login now');
        
      } else {
        toast.error(response.message);
      }
      
      setSigningUp(false);
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
      <form className={styles.loginForm}
      onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e)=>setEmail(e.target.value)}
          
          value={email}
          />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          required
          // autoComplete="new-password"
          
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
        {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
          </>
  );
};


export default SignUp;