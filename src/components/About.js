import React from 'react';

export const About = () => {
  return (
    <div className="container my-5">
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_YmvrBALpuXdT8IO7mKlgH0UE_XhUVha8Q&s" className="d-block w-100 my-5" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Our Mission</h5>
              <p>We strive to deliver the best experience for our users.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/800x400" className="d-block w-100 my-5" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Our Vision</h5>
              <p>Empowering innovation with cutting-edge technology.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/800x400" className="d-block w-100 my-8" data-bs-ride="carousel"  alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Our Values</h5>
              <p>Integrity, Creativity, Excellence.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
