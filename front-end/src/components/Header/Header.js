import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
  return (
    <>
      {/* Jumbotron Section */}
      <div className="jumbotron text-center bg-light mt-5">
        <div className="container">
          <div className="header-content-inner">
            <h1 className="display-4">Welcome to ABC Restaurant</h1>
            <p className="lead">
              Discover the finest dining experience at ABC Restaurant, where every meal is a celebration of flavors.
              Explore our diverse menu, enjoy special offers, and take advantage of our exceptional facilities.
            </p>
            <Link to="/menu">
              <button className="btn btn-primary btn-lg">View Menu</button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-light py-5" id="about">
        <div className="container">
          <h1 className="text-center mb-5">About Us</h1>
          <div className="row">
            <div className="col-md-7">
              <div className="text-center">
                <h3>About ABC Restaurant</h3>
                <p className="text-justify">
                  ABC Restaurant is a renowned chain across Sri Lanka, known for its commitment to culinary excellence
                  and outstanding customer service. Our mission is to offer a unique dining experience with a diverse
                  menu crafted from the freshest ingredients. Join us and experience why we are a local favorite!
                </p>
              </div>
            </div>
            <div className="col-md-5">
              <img
                src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536951746/new/warm_welcome.jpg"
                alt="Restaurant"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5" id="testimonials">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card p-3 mb-4 shadow-sm">
                <p className="card-text">"A fantastic dining experience with amazing food and service. Highly recommend!"</p>
                <p className="text-muted">- Rajith K.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 mb-4 shadow-sm">
                <p className="card-text">"The best place for a family meal. The ambiance is perfect and the food is top-notch."</p>
                <p className="text-muted">- Priya M.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 mb-4 shadow-sm">
                <p className="card-text">"Always a pleasure to dine here. The staff are friendly, and the food is consistently excellent."</p>
                <p className="text-muted">- Sanjay P.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
