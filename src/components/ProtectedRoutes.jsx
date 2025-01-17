import React ,{useEffect}from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../pages/redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../pages/redux/features/userSlice';


const ProtectedRoutes = ({children}) => {
    const dispatch=useDispatch();
    const {user}=useSelector(state =>state.user)
    
    // get user
    const getUser=async()=>{
        try {
            dispatch(showLoading())
            const res=await axios.post('http://localhost:3000/api/user/getUserData',
                {token:localStorage.getItem('token')},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
             dispatch(hideLoading());
             if(res.data.success){
                dispatch(setUser(res.data.data))
             }else{
                <Navigate to='/login'/>
                localStorage.clear();
             }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log(error)
        }
    };

    useEffect(() => {
    if(!user){
        getUser();
    }
    }, [user])

  if(localStorage.getItem("token")){

      return children; 
  }else{
    return <Navigate to="/login"/>;
  }
}

export default ProtectedRoutes