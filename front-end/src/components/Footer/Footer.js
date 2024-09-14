import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Footer = () => {
  return (
    <footer className="bg-light pt-5" id="footer" >
      <div className="container-fluid" style={{ backgroundColor: "#cccccc" }}>
        <div className="row text-center">
          <div className="col-md-4 col-sm-4">
            <h5>ABC Restaurant</h5>
            <hr className="w-50 mx-auto mb-3" />
            <p className="footer">
              The EU-27 has an estimated 1.6m businesses involved in 'accommodation and food services', more than 75% of which are small and medium enterprises.
            </p>
           
          </div>

          <div className="col-md-4 col-sm-4">
            <h5>Our Contact</h5>
            <hr className="w-50 mx-auto mb-3" />
            <address>
              22, Victoria Street Road
              <br />
              Melbourne, Victoria
              <br />
              Australia
              <br />
              <i className="fa fa-phone"></i> +123 456 7890
              <br />
              <i className="fa fa-fax"></i> +987 654 3210
              <br />
              <i className="fa fa-envelope"></i> <a href="mailto:abcrestaurant85@example.com">abcrestaurant85@example.com</a>
            </address>
          </div>

          <div className="col-md-4 col-sm-4">
            <h5>Open Hours</h5>
            <hr className="w-50 mx-auto mb-3" />
            <ul className="list-unstyled">
              <li>Mon-Fri: 08:00 - 22:00</li>
              <li>Sat: 09:00 - 22:00</li>
              <li>Sun: 09:00 - 16:00</li>
            </ul>
          </div>
        </div>
      </div>

      <a className="btn btn-secondary btn-sm mt-4" href="#myPage" title="Back to Top">
        <i className="fa fa-chevron-up"></i>
      </a>

      <div className="text-center mt-3">
        <p>&copy; 2024 ABC Restaurant</p>
      </div>
    </footer>
  );
};

export default Footer;
