import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";

import "../styles/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = (
    username: string,
    email: string,
    password: string,
    password2: string
  ): void => {
    if (password !== password2) {
      alert("passwords are not equal !!!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("passwd1", password);
    formData.append("passwd2", password2);

    fetch("http://localhost/log/server/app/create.php", {
      method: "post",
      mode: "cors",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.msg) {
          case "validate":
            alert("Error in validation");
            break;
          case "failure":
            alert("Account cannot be created");
            break;
          case "success":
            alert("Account successfuly created");
            navigate("/");
            break;
          case "free":
            alert("Username or email are already taken");
            break;
        }
      });
  };
  const submit = (values: Record<string, any>) => {
    const { username, email, passwd1, passwd2 } = values;
    handleRegister(username, email, passwd1, passwd2);
  };
  return (
    <div className="Login">
      <Form
        onSubmit={submit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="form register">
            <Field name="username">
              {({ input, meta }) => (
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" {...input} />
                </div>
              )}
            </Field>
            <Field name="email">
              {({ input, meta }) => (
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" {...input} />
                </div>
              )}
            </Field>
            <Field name="passwd1">
              {({ input, meta }) => (
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" {...input} />
                </div>
              )}
            </Field>
            <Field name="passwd2">
              {({ input, meta }) => (
                <div className="mb-3">
                  <label className="form-label">Retype Password</label>
                  <input type="password" className="form-control" {...input} />
                </div>
              )}
            </Field>
            <button type="submit" className="btn btn-primary">
              Create an Account
            </button>
          </form>
        )}
      ></Form>
      <NavLink to="/">Already have an account ?</NavLink>
    </div>
  );
};

export { Register };
