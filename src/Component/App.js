import {Home,Login,SignUp,Navbar,UserProfile,Page404,Settings} from '../pages';
import {Loader} from './index';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import { useAuth } from '../hooks';
import PrivateRoute from './PrivateRoute'; 

 function App() {
const auth=useAuth();

if(auth.loading){
 return <Loader/>
}
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={< Home  />}/>
      <Route exact path='/login' element={< Login />}/>
     <Route element={<PrivateRoute/>}>
          <Route exact path='/settings' element={< Settings />}/>
     </Route>
     
     <Route element={<PrivateRoute/>}>
          <Route exact path="/user/:userId" element={<UserProfile/>}/>
     </Route>
     
      
      
      <Route exact path='/sign_up' element={<SignUp/>}/>
      <Route path='*' element={<Page404/>}/>
    </Routes>
    </BrowserRouter>
    </>


  );
}

export default App;
