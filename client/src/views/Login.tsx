import React from "react";
import { NavLink } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const apiLogin = async (user: string, pass: string, remember: boolean) => {
    const data = new FormData();
    data.append("username", user);
    data.append("password", pass);
    await fetch("http://localhost/log/server/app/account.php", {
      method: "post",
      mode: "cors",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "success") {
          if (remember === true) {
            localStorage.setItem("user", user);
          } else {
            sessionStorage.setItem("user", user);
          }
          navigate("/panel");
        } else {
          alert("Login error");
        }
      })
      .catch((err) => console.log(err));
  };
  const submit = (values: Record<string, any>) => {
    const { username, password, remember } = values;
    apiLogin(username, password, remember);
  };
  const checkToken = () => {
    if (sessionStorage.getItem("user") || localStorage.getItem("user")) {
      navigate("/panel");
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="Login">
      <Form
        onSubmit={submit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="form">
            <Field name="username">
              {({ input }) => (
                <div className="mb-2">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" {...input} />
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input }) => (
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" {...input} />
                </div>
              )}
            </Field>
            <Field name="remember">
              {({ input }) => (
                <div className="mb-2">
                  <label className="form-check-label">Remember Me</label>
                  <input
                    type="checkbox"
                    className="form-check-input chck"
                    {...input}
                  />
                </div>
              )}
            </Field>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
        )}
      />
      <NavLink to="/register">Register</NavLink>
    </div>
  );
};

export { Login };
