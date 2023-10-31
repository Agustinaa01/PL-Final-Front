import React from "react";
import Headers from "../header/Headers";
import homeImage from "./homeA.png";
import homeImage2 from "./homeB.png";
import homeImage3 from "./homeC.png";
import "./Dashboard.css";
import Footer from "../Footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Dashboard = () => {
  return (
    <div className="content">

      <Headers />
      <div className="dashboard">
        <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="3000">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={homeImage} alt="First slide" className="img-fluid" />
              <div className="carousel-caption">
                <h3>Parlante</h3>
                <p>Un excelente parlante para disfrutar de tu música favorita.</p>
                <button className="product">Ver producto</button>
              </div>
            </div>

            <div className="carousel-item">
              <img src={homeImage2} alt="Second slide" className="img-fluid2" />
              <div className="carousel-caption">
                <h3>Auriculares</h3>
                <p>Disfruta de un sonido excepcional con nuestros auriculares de alta calidad.</p>
                <button className="product">Ver producto</button>
              </div>
            </div>

            <div className="carousel-item">
              <img src={homeImage3} alt="Third slide" className="img-fluid" />
              <div className="carousel-caption">
                <h3>Joystick para Xbox</h3>
                <p>Experimenta una experiencia de juego excepcional con nuestro joystick de alta calidad para Xbox.</p>
                <button className="product">Ver producto</button>
              </div>
            </div>
          </div>

          <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
