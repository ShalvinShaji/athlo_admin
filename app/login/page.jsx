"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#1111]">
    <div className="w-full max-w-md p-8 space-y-6 bg-[#2222] shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600  focus:outline-none "
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600  focus:outline-none "
              />
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-sm text-red-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 font-semibold text-white bg-amber-500  hover:bg-amber-600 focus:outline-none cursor-pointer"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default Login;
