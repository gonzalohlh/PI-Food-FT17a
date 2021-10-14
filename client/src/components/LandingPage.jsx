import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Welcome to FUN RECIPES!</h1>
      <h2>Here you can search for your favorite recipes or create your own!</h2>
      <div>
        <Link to="./home" className="btn">
          <button>LET'S GO!</button>
        </Link>
      </div>
      <img
        src="https://i.pinimg.com/originals/8b/b3/87/8bb387ee878eddeb23baea344d4e13af.gif"
        alt=""
      />
    </div>
  );
}
