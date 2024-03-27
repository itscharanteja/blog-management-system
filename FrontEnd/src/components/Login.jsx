import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.scss";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

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

export default Login;
