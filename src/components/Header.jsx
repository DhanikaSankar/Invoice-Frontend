import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [storageInfo, setStorageInfo] = useState();

  const nav = useNavigate();

  useEffect(() => {
    setStorageInfo(localStorage.getItem("user-info"));
  });

  function logOut() {
    localStorage.clear();
    nav("/");
  }


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Invoice App</Navbar.Brand>
          {storageInfo ? (
            <>
              <Nav className="me-auto navlink">
                <Link to="/dashboard">Dashboard</Link>
              </Nav>
              <Link
                onClick={logOut}
                className="d-flex"
                style={{ textDecoration: "none", color: "white" }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
             ""
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
