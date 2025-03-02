"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useProductStore from "@/store/useProductStore";

const CreateProduct = () => {
  const { createProduct } = useProductStore();
  const [preview, setPreview] = useState(null);

  return (
    <div className="flex items-center justify-center bg-[#1111] pt-[120px]">
      <div className="w-full p-8 space-y-6 bg-[#2222] shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white">
          Create Product
        </h1>
        <Formik
          initialValues={{
            name: "",
            category: "",
            description: "",
            price: "",
            stock: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = "Product name is required";
            if (!values.category) errors.category = "Category is required";
            if (!values.description)
              errors.description = "Description is required";
            if (!values.price) errors.price = "Price is required";
            if (!values.stock) errors.stock = "Stock is required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const productData = {
                name: values.name,
                category: values.category,
                description: values.description,
                price: parseFloat(values.price),
                stock: parseInt(values.stock),
              };
              await createProduct(productData);
              resetForm();
              setPreview(null);
            } catch (error) {
              console.error("Error creating product:", error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-6">
              {/* Left Section: Form Fields */}
              <div className="space-y-4">
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
                    Stock
                  </label>
                  <Field
                    type="number"
                    name="stock"
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 focus:outline-none"
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 font-semibold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none cursor-pointer"
                >
                  {isSubmitting ? "Creating..." : "Create Product"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
