import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./NewPost.scss";
import * as Yup from "yup";

function NewPost({ addPost }) {
  const initialValues = {
    title: "",
    content: "",
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const newPost = {
      ...values,
      date: formattedDate,
      time: formattedTime,
    };
    addPost(newPost);
    resetForm();
  };

  return (
    <div className="body">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field type="text" placeholder="Title" name="title" id="title" />
            <ErrorMessage name="title" component="div" />

            <Field
              as="textarea"
              placeholder="Content"
              name="content"
              id="content"
              cols="30"
              rows="10"
            />
            <ErrorMessage name="content" component="div" />

            <FileInputField setFieldValue={setFieldValue} />

            <div className="buttons">
              <button type="submit">Submit</button>
              <button type="reset">Clear</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const FileInputField = ({ setFieldValue }) => {
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
  };

  return (
    <>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleChange}
        className="fileInput"
      />
      <ErrorMessage name="image" component="div" />
    </>
  );
};

export default NewPost;
