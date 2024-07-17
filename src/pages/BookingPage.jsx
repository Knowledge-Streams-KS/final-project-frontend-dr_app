import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "./redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        message.error(res.data.message);
      }
      console.log("User data:", res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Error fetching user data");
    }
  };

  const handleBooking = async () => {
    try {
        setIsAvailable(true);
        if(!date && !time){
            return alert ('Date & Time Required')
        }
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3000/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Booking failed. Please try again.");
      console.log(error);
    }
  };

  const handleAvailiability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3000/api/user/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [params.doctorId]);

  return (
    <Layout>
      <h3>BookingPage</h3>
      <div className="container m-2">
        {doctors ? (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feePerConsultation}</h4>
            <h4>
              Timings:{" "}
              {doctors.timing
                ? `${doctors.timing[0]} - ${doctors.timing[1]}`
                : "N/A"}
            </h4>
            <div className="d-flex w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => 
                {
                    
                    setTime(moment(value).format("HH:mm"))}
                }
              />
              <button
                className="btn btn-primary m-2"
                onClick={handleAvailiability}
              >
                Check Availability
              </button>
             
                <button className="btn btn-dark m-2" onClick={handleBooking}>
                  Book Now
                </button>
            </div>
          </div>
        ) : (
          <div>Loading doctor information...</div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
