"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    
    // Check for token in localStorage or cookies
    const token = localStorage.getItem("token"); // or use cookies.get('token')
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage or cookies
    localStorage.removeItem("token"); // or cookies.remove('token')
    setIsAuthenticated(false);
    // Optionally, you can redirect the user to the login page
    window.location.href = "/login";
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="row pt-4">
            <div className="col-3 pt-3">
              <div>
                <a
                  href="/"
                  className="js-logo-clone border p-3"
                  style={{
                    textDecoration: "none",
                    fontSize: "25px",
                    color: "black",
                    borderWidth: "25px",
                    borderStyle: "solid",
                  }}
                >
                  Disc Shop
                </a>
              </div>
            </div>

            <div className="col-7 pt-4">
              <nav
                className="navbar navbar-expand-md"
                style={{ backgroundColor: "white" }}
              >
                <div className="container-fluid">
                  <a
                    className="navbar-brand pr-3"
                    href="/"
                    style={{ fontSize: "15px" }}
                  >
                    Home
                  </a>
                  <a
                    className="navbar-brand pr-3"
                    href="/about"
                    style={{ fontSize: "15px" }}
                  >
                    About
                  </a>
                  <a
                    className="navbar-brand pr-3"
                    href="/product-list"
                    style={{ fontSize: "15px" }}
                  >
                    Shop
                  </a>
                  <a
                    className="navbar-brand pr-3"
                    href="/order-history"
                    style={{ fontSize: "15px" }}
                  >
                    Order History
                  </a>
                  <a
                    className="navbar-brand pr-3"
                    href="/contact"
                    style={{ fontSize: "15px" }}
                  >
                    Contact
                  </a>
                </div>
              </nav>
            </div>

            <div className="col-md-2 pt-4 pe-0 text-right">
              <div className="d-flex justify-content-end text-right">
                {isAuthenticated ? (
                  <>
                    <a href="#">
                      <i className="bi bi-suit-heart me-3"></i>
                    </a>
                    <a href="/cart">
                      <i className="bi bi-cart"></i>
                    </a>

                    {/* Logout */}
                    <a href="#" onClick={handleLogout} className="ml-3">
                      <i className="bi bi-box-arrow-in-right"></i>
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/login" style={{ fontSize: "12px" }} className="mt-1 mr-2">
                      Đăng nhập
                    </a>
                    <a href="/register" style={{ fontSize: "12px" }} className="mt-1">
                      Đăng ký
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </header>
      <br />

      {/* Load JavaScript files using next/script */}
      {/* <Script
        src="/assets/js/jquery-3.3.1.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/assets/js/jquery-ui.js" strategy="beforeInteractive" />
      <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script
        src="/assets/js/owl.carousel.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/jquery.magnific-popup.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/assets/js/aos.js" strategy="beforeInteractive" />
      <Script src="/assets/js/main.js" strategy="beforeInteractive" /> */}
    </div>
  );
};

export default Header;
