"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import Cookies from "js-cookie";

const CreateProduct = () => {
  const [preview, setPreview] = useState(null);

  // React Query mutation for creating a product
  const createProductMutation = useMutation({
    mutationFn: async (productData) => {
      const token = Cookies.get("adminToken");

      if (!token) {
        throw new Error("Admin token not found. Please log in.");
      }

      const response = await axios.post(
        `/products/product/create`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      alert("Product created successfully!");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  // Handle image selection
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1111] pt-[120px]">
      <h1 className="text-3xl font-bold text-white mb-6">Create Product</h1>

      <div className="flex w-[80%] p-8 bg-[#2222] shadow-lg gap-6">
        <div className="flex-1 p-6 bg-zinc-800 rounded-lg shadow-md">
          <Formik
            initialValues={{
              name: "",
              category: "",
              description: "",
              price: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) errors.name = "Product name is required";
              if (!values.category) errors.category = "Category is required";
              if (!values.description)
                errors.description = "Description is required";
              if (!values.price) errors.price = "Price is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("category", values.category);
                formData.append("description", values.description);
                formData.append("price", values.price);

                createProductMutation.mutate(formData);
                resetForm();
                setPreview(null);
              } catch (error) {
                console.error("Error creating product:", error);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Product Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <Field
                    type="text"
                    name="category"
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Price
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || createProductMutation.isPending}
                  className="w-full py-2 font-semibold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none cursor-pointer"
                >
                  {createProductMutation.isPending
                    ? "Creating..."
                    : "Create Product"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 bg-zinc-800 rounded-md shadow-md">
          {preview ? (
            <img
              src={preview}
              alt="Product Preview"
              className="w-full h-90 object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-400">Image Preview</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
