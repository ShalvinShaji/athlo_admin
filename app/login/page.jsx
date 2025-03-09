"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/store/useStore";

const Login = () => {
  const router = useRouter();
  const { mutate: loginUser, isLoading, isError, error } = useLoginUser();

  return (
    <div className="flex items-center justify-center bg-[#1111] pt-[120px]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#2222] shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login to Athlo</h1>

        {isError && <p className="text-red-400 text-center">{error.message}</p>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "Email is required";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = "Invalid email address";
            if (!values.password) errors.password = "Password is required";
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            loginUser(values, {
              onSuccess: () => {
                router.push("/"); // Redirect on successful login
              },
            });
            setSubmitting(false);
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
                  className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
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
                  className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-2 font-semibold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none cursor-pointer"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
