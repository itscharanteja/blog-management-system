import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.scss";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [redirect, setRedirect] = React.useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values) {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Invalid credentials");
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
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
        <h1>Login</h1>
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
