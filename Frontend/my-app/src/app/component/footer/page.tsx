"use client";

import React from 'react';
// Importing Image component from Next.js if you use Next.js for image optimization
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-center  pt-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}} >
  {/* Grid container */}
  <div className="container p-4 pb-0" >
    {/* Section: Social media */}
    <section className="mb-4">
      {/* Facebook */}
      <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{backgroundColor: '#3b5998',borderRadius:'50%'}} href="#!" role="button"><i className="bi bi-facebook"></i></a>
      {/* Twitter */}
      <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{backgroundColor: '#55acee',borderRadius:'50%'}} href="#!" role="button"><i className="bi bi-twitter"></i></a>
      {/* Google */}
      <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{backgroundColor: '#dd4b39',borderRadius:'50%'}} href="#!" role="button"><i className="bi bi-google"></i></a>
      {/* Instagram */}
      <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{backgroundColor: '#ac2bac',borderRadius:'50%'}} href="#!" role="button"><i className="bi bi-instagram" /></a>
      {/* Linkedin */}
      <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{backgroundColor: '#0082ca',borderRadius:'50%'}} href="#!" role="button"><i className="bi bi-linkedin" /></a>
      {/* Github */}
      <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{backgroundColor: '#333333',borderRadius:'50%'}} href="#!" role="button"><i className="bi bi-github" /></a>
    </section>
    {/* Section: Social media */}
  </div>
  {/* Grid container */}
  {/* Copyright */}
  <div className="text-center pb-3" >
    © 2020 Copyright:
    <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  {/* Copyright */}
</footer>

  );
};

export default Footer;
