import React from 'react';
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from './redux/features/alertSlice';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const NotificationPage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const { user } = useSelector(state => state.user);
// handle read notification
  const handleMarkAllRead =async () => {
    try {
        dispatch(showLoading())
        const res=await axios.post(
            "http://localhost:3000/api/user/get-all-notification",
            {userId:user._id},
            {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message)
        }else{
            message.error(res.data.message)
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error)
        message.error("something went wrong")
    }
  };

  const handleDeleteAllRead =async () => {
    try {
        dispatch(showLoading());
        const res=await axios.post("http://localhost:3000/api/user/delete-all-notification",{userId:user._id},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message)
        }else{
            message.error(res.data.message)
        }
    } catch (error) {
        console.log(error)
        message.error('Something went wrong In Notification')
    }
  };

  const items = [
    {
      key: '0',
      label: 'unRead',
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>Mark All Read</h4>
          </div>
          {user?.notification.map((notificationMsgs) => (
            <div 
            className="card" 
             style={{cursor:'pointer'}}>

              <div className="card-text" 
              onClick={()=>navigate (notificationMsgs.onClickPath)} >
                {notificationMsgs.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
    {
      key: '1',
      label: 'Read',
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4 className="p-2 text-primary"style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
          </div>
          {user?. seennotification.map((notificationMsgs) => (
            <div 
            className="card" 
             style={{cursor:'pointer'}}>

              <div className="card-text" 
              onClick={()=>navigate (notificationMsgs.onClickPath)} >
                {notificationMsgs.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className='p-3 text-center'>NotificationPage</h4>
      <Tabs items={items} />
    </Layout>
  );
};

export default NotificationPage;
