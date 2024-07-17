import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const User = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antD table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name", // Added key property
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email", // Added key property
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      key: "isDoctor", // Added key property
      render:(text,record)=><span>{record.isDoctor? "Yes" : "No"}</span>
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions", // Added key property
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">User List</h1>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </Layout>
  );
};

export default User;
