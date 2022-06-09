import React from "react";
import "./About.css";

function About() {
  return (
    <>
      <div className="aboutContainer">
        <div className="aboutBox">
          <h1 className="aboutHeading">About Us</h1>
          <p className="aboutPara">
            Welcome to EliteShop, your number one source for all daily use
            products. We're dedicated to giving you the very best of our
            services and products, with a focus on three characteristics,
            reliability, fast customer service and fast return service. Founded
            in 2021. We now serve customers all over india, and are thrilled to
            be a part of the eco-friendly, fair trade wing of the daily
            commercial products. We hope you enjoy our products as much as we
            enjoy offering them to you. If you have any questions or comments,
            please don't hesitate to contact us.<br/><br/>
            <span className="complimentaryClose"> Sincerely, <br/> EliteShop </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
