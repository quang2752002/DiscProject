"use client";

import React from "react";
import Header from "../component/header/page";
import Footer from "../component/footer/page";




import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const About = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-md-6 mb-4">
            {/* Sử dụng mb-4 để tạo khoảng cách dưới */}
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4a8CMTyogRSEUa4anU_XhehnoSs7sPjF54g&s"
              alt="Image description"
            />
          </div>
          <div className="col-md-6">
            {/* Sử dụng col-md-6 để phù hợp với kích thước cột */}
            <h1>How We Started</h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              repellat, dicta at laboriosam, nemo exercitationem itaque eveniet
              architecto cumque, deleniti commodi molestias repellendus quos
              sequi hic fugiat asperiores illum. Atque, in, fuga excepturi
              corrupti error corporis aliquam unde nostrum quas.
            </p>
            <p>
              Accusantium dolor ratione maiores est deleniti nihil? Dignissimos
              est, sunt nulla illum autem in, quibusdam cumque recusandae,
              laudantium minima repellendus.
            </p>
          </div>
        </div>
        <hr className="p-5" />
        <div className="row p-5">
          <div className="col-12">
            <h2 className="text-center">
              {/* Sử dụng lớp Bootstrap text-center */}
              The Team
            </h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "150px" }}>
            {/* flex-column để xếp dọc, align-items-center để căn giữa */}
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px" // Khoảng cách giữa ảnh và tên
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4a8CMTyogRSEUa4anU_XhehnoSs7sPjF54g&s"
              alt="Image description"
            />
            <h5 className="">Elizabeth Graham</h5>
            <div className="text-muted fs-6">CEO/Co-Founder</div>
            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.</p>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "150px" }}>
            {/* flex-column để xếp dọc, align-items-center để căn giữa */}
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px" // Khoảng cách giữa ảnh và tên
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4a8CMTyogRSEUa4anU_XhehnoSs7sPjF54g&s"
              alt="Image description"
            />
            <h5 className="">Elizabeth Graham</h5>
            <div className="text-muted fs-6">CEO/Co-Founder</div>
            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.</p>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "150px" }}>
            {/* flex-column để xếp dọc, align-items-center để căn giữa */}
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px" // Khoảng cách giữa ảnh và tên
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4a8CMTyogRSEUa4anU_XhehnoSs7sPjF54g&s"
              alt="Image description"
            />
            <h5 className="">Elizabeth Graham</h5>
            <div className="text-muted fs-6">CEO/Co-Founder</div>
            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.</p>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "150px" }}>
            {/* flex-column để xếp dọc, align-items-center để căn giữa */}
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px" // Khoảng cách giữa ảnh và tên
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4a8CMTyogRSEUa4anU_XhehnoSs7sPjF54g&s"
              alt="Image description"
            />
            <h5 className="">Elizabeth Graham</h5>
            <div className="text-muted fs-6">CEO/Co-Founder</div>
            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
