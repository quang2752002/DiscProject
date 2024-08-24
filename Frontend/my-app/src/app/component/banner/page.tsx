"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  return (
    <div className="container">
 <div className="row">


<div
   id="carouselExampleCaptions"
   className="carousel slide col-md-8"
   data-bs-ride="carousel"
 >
   <div className="carousel-indicators">
     <button
       type="button"
       data-bs-target="#carouselExampleCaptions"
       data-bs-slide-to="0"
       className="active"
       aria-current="true"
       aria-label="Slide 1"
     ></button>
     <button
       type="button"
       data-bs-target="#carouselExampleCaptions"
       data-bs-slide-to="1"
       aria-label="Slide 2"
     ></button>
     <button
       type="button"
       data-bs-target="#carouselExampleCaptions"
       data-bs-slide-to="2"
       aria-label="Slide 3"
     ></button>
   </div>
   <div className="carousel-inner">
     <div className="carousel-item active ">
       <img
         src="https://cf.shopee.vn/file/sg-11134258-7rdws-lz8ig98y8cj8de_xxhdpi"
         className="d-block w-100 "
         alt="..."
         style={{ width: "30px", height: "250px" }}
       />
       <div className="carousel-caption d-none d-md-block opacity-100">
         {/* <h5>Âm Nhạc Tuyệt Vời</h5>
         <p>
           Chào mừng đến với "Âm Nhạc Tuyệt Vời" - điểm đến lý tưởng cho
           những tín đồ yêu thích âm nhạc và sưu tập đĩa!
         </p> */}
       </div>
     </div>
     <div className="carousel-item">
       <img
         src="https://cf.shopee.vn/file/sg-11134258-7rdyc-lz7df1ccl05j8a_xxhdpi"
         className="d-block w-100 "
         alt="..."
         style={{ width: "30px", height: "250px" }}
       />
       <div className="carousel-caption d-none d-md-block opacity-100">
          {/*<h5>Thế Giới Đĩa Nhạc</h5>
         <p>
           Chào mừng bạn đến với "Kho Đĩa Âm Nhạc" – điểm đến hoàn hảo cho
           những ai đam mê âm nhạc và sưu tập đĩa!
         </p> */}
       </div>
     </div>
     <div className="carousel-item">
       <img
         src="https://cf.shopee.vn/file/sg-11134258-7rdyr-lz7dlh5deht642_xxhdpi"
         className="d-block w-100 "
         alt="..."
         style={{ width: "30px", height: "250px" }}
       />
       <div className="carousel-caption d-none d-md-block opacity-100">
          {/* <h5>Kho Đĩa Nhạc Đầy Đủ </h5>
        <p>
           Chào mừng bạn đến với "Thế Giới Đĩa Nhạc" – nơi tập hợp những âm
           thanh tuyệt vời và những giai điệu không thể bỏ qua!{" "}
         </p> */}
       </div>
     </div>
   </div>
   <button
     className="carousel-control-prev"
     type="button"
     data-bs-target="#carouselExampleCaptions"
     data-bs-slide="prev"
   >
     <span
       className="carousel-control-prev-icon"
       aria-hidden="true"
     ></span>
     <span className="visually-hidden">Previous</span>
   </button>
   <button
     className="carousel-control-next"
     type="button"
     data-bs-target="#carouselExampleCaptions"
     data-bs-slide="next"
   >
     <span
       className="carousel-control-next-icon"
       aria-hidden="true"
     ></span>
     <span className="visually-hidden">Next</span>
   </button>
 </div>

<div className="col-md-4">
      <div className="row">
        <div className="row mb-2">
        <img
         src="https://cf.shopee.vn/file/sg-11134258-7rdyj-lz7dlfxj81m4b8_xhdpi"
         className="d-block w-100 "
         alt="..."
         style={{ width: "30px", height: "120px" }}
       />
        </div>
        <div className="row">
        <img
         src="https://cf.shopee.vn/file/sg-11134258-7rdxn-lz8igaeal8g700_xhdpi"
         className="d-block w-100 "
         alt="..."
         style={{ width: "30px", height: "120px" }}
       />
        </div>
      </div>
</div>
</div>
    </div>
   
  );
};

export default Banner;
