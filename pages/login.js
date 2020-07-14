import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { Button, Form, Loader } from "semantic-ui-react";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch("/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
  }
  return (
    <div className="form-container">
      <h1>Iniciar sesión</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Iniciar sesión</Button>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </Form>
    </div>
  );
};

export default Login;
