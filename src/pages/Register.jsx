import React, { Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { message } from 'antd'; 
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "./redux/features/alertSlice";

const Register_Validation = () => {
  const navigate = useNavigate();
  const disptach=useDispatch();
  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const handleSubmit = async (values) => {
    try {
      disptach(showLoading());
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        values
      );
      disptach(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      disptach(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-md rounded-md bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Registration Form
          </h2>
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4 text-center">
                <Link to="/login" className="text-blue-500 hover:underline">
                  Already a user? Login here
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Register_Validation;
