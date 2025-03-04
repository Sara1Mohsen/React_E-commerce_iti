import React from 'react';

const Footer = () => {
  return (
    <footer id='footer' className=" text-white mt-5">
      <div className="container py-5">
        <div className="row">
         
          <div className="col-md-4 mb-4">
            <h5>About Us</h5>
            <p className=".text-black-50">
              We are your one-stop shop for all your needs. Explore our wide range of products and enjoy a seamless shopping experience.
            </p>
          </div>

          
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/products" className="text-white">Products</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/contact" className="text-white">Contact Us</a></li>
            </ul>
          </div>

       
          <div className="col-md-4 mb-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com" className="text-white">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-white">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-white">Instagram</a></li>
              <li><a href="https://linkedin.com" className="text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        
        <div className="text-center py-3 border-top">
          <p className="mb-0 .text-black-50">
            &copy; {new Date().getFullYear()} Your E-Shop Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;