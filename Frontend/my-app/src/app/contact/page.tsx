"use client";

import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Header from "./../component/header/page";
import Banner from "./../component/banner/page";
import Footer from "./../component/footer/page";



import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Contact = () => {
  return (
    <div> 
    <Header />
    <div className="container border my-4 p-4">
  <div className="row text-center mb-4">
    <div className="col-12">
      <h1>Contact</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-6 mb-3">
      <label htmlFor="firstName">First Name</label>
      <label htmlFor="firstName" className="text-danger">*</label>
      <input type="text" id="firstName" className="form-control" />
    </div>
    <div className="col-6 mb-3">
      <label htmlFor="lastName">Last Name</label>
      <label htmlFor="lastName" className="text-danger">*</label>
      <input type="text" id="lastName" className="form-control" />
    </div>
  </div>
  <div className="row">
    <div className="col-12 mb-3">
      <label htmlFor="email">Email</label>
      <label htmlFor="email" className="text-danger">*</label>
      <input type="email" id="email" className="form-control" />
    </div>
  </div>
  <div className="row">
    <div className="col-12 mb-3">
      <label htmlFor="email">Subject</label>
      <label htmlFor="email" className="text-danger">*</label>
      <input type="email" id="email" className="form-control" />
    </div>
  </div>
  <div className="row">
    <div className="col-12 mb-3">
      <label htmlFor="email">Message</label>
      <label htmlFor="message" className="text-danger">*</label>
      <textarea rows={7} id="message" className="form-control"></textarea>
    </div>
  </div>
  <div className="row text-center mb-4 mt-4">
    <div className="col-12">
      <button className="btn btn-primary">Sumbit</button>
    </div>
  </div>
</div>

    <Footer />
    </div>
  );
};
export default Contact;
