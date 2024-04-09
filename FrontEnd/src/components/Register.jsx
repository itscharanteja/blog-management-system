import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.scss";

export default function Register() {
  const initialValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values) {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 200 || response.status === 201) {
      alert("User registered successfully");
    } else {
      alert("Internal server error");
    }
  }

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div>
      <div className="login">
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          <Form className="input">
            <div className="email">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
