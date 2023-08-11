import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("user-info")) {
        nav("/dashboar");
      }
    }, []);

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  async function logIn() {
    const item = { email, password };
    // console.warn(item)
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    // console.log(result['status']);
    localStorage.setItem("user-info", JSON.stringify(result));

    if (result["status"] === 401) {
      // console.log(32323);
      // localStorage.clear();
      nav("/login");
    } else {
      nav("/dashboard");
    }
  }

  return (
    <div className="col-sm-4 offset-sm-4 mt-5">
      <Card className="header">
        <Card.Title className="text-center mb-4">LOGIN</Card.Title>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          onChange={(e) => SetEmail(e.target.value)}
          value={email}
        ></input>
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          onChange={(e) => SetPassword(e.target.value)}
          value={password}
        ></input>
        <br />

        <Button type="submit" onClick={logIn}>
          Login
        </Button>
        <br />
      </Card>
    </div>
  );
}

export default Login;
