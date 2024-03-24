import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import "./NewPost.scss";
import * as Yup from "yup";

function NewPost({ addPost }) {
  const initialValues = {
    title: "",
    content: "",
    image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileType",
        "Only images are allowed",
        (value) => value && value.type && value.type.startsWith("image/")
      ),
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
    addPost(newPost); // You can handle form submission logic here
    resetForm();
  };

  return (
    <div className="body">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <InnerForm />
      </Formik>
    </div>
  );
}

const InnerForm = () => {
  return (
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

      <Field
        type="file"
        name="image"
        id="image"
        accept="image/jpg, image/jpeg, image/png"
      />

      <ErrorMessage name="image" component="div" />

      <div className="buttons">
        <button type="submit">Submit</button>
        <button type="reset">Clear</button>
      </div>
    </Form>
  );
};

export default NewPost;
