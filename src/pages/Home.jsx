import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorsList from "../components/DoctorsList";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const res = await axios.get(
        "http://localhost:3000/api/user/getAllDoctors",
        // Ensure the request body is as expected by the server
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
      console.log("User data:", res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => 
            <DoctorsList doctor={doctor}/>)}
      </Row>
    </Layout>
  );
};

export default Home;
