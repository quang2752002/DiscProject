"use client";

import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="https://static.vecteezy.com/system/resources/previews/012/407/085/non_2x/retro-music-poster-set-of-vintage-background-with-musical-disc-notes-lettering-illustration-for-banner-flyer-placard-disco-party-festival-invitation-advertising-vector.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="https://static.vecteezy.com/system/resources/previews/012/407/085/non_2x/retro-music-poster-set-of-vintage-background-with-musical-disc-notes-lettering-illustration-for-banner-flyer-placard-disco-party-festival-invitation-advertising-vector.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="https://static.vecteezy.com/system/resources/previews/012/407/085/non_2x/retro-music-poster-set-of-vintage-background-with-musical-disc-notes-lettering-illustration-for-banner-flyer-placard-disco-party-festival-invitation-advertising-vector.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  );
};

export default Banner;
