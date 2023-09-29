import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import {useAuth} from '../hooks'
import { useEffect, useState,useRef } from 'react';
import { searchUsers } from '../api';
const Navbar = () => {
const auth=useAuth();
const [results,setResult]=useState([]);
const [search,setSearch]=useState('');
const [searchDone,setSearchDone]=useState(true);
const searchRef=useRef(null);
useEffect(()=>{
searchRef.current.focus();
  const fetchUser=async()=>{
    const response=await searchUsers(search);
    if(response.success){
      setResult(response.data.users);
      // console.log(response.data.users);
    }
  }
  if(search.length>2){
  
    fetchUser();
  }else{
    setResult([]);
  }
  // setSearch('');
},[search])

const handleSearch=()=>{
  setSearchDone(false);
  if(searchDone){
    setSearch('');
  }
  setSearchDone(true)
}
return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
           <h2>
          WideTome
            </h2> 
         </Link>
      </div>


      <div className={styles.searchContainer}>
       

        <input
          placeholder="Search users"
          value={search}
          ref={searchRef}
         onChange={(e)=>setSearch(e.target.value)}
     />
         {results.length > 0 &&searchDone && (
          <div className={styles.searchResults}>
           <ul>
              { results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                 >
                   <Link to={`/user/${user._id}`}
                   onClick={handleSearch}
                   >
                     <img
                       src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                       alt=""
                     />
                     <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
   </div>
   
      <div className={styles.rightNav}>
       {auth.user &&
        < div className={styles.user}>
          <Link to="/settings">
            <img
              src=""
              alt=""
              className={styles.userDp}
              />
          <span>{auth.user.name}</span>
          </Link>
        </div>
            }

        <div className={styles.navLinks}>
          <ul>
          {auth.user?
          <>
          <li onClick={auth.logout}>
            Log out
            </li>
          </>
          :
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
            <Link to="/sign_up">sign_up </Link>
            </li>
          </> 
          }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
