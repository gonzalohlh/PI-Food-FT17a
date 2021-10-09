import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to FUN RECIPES!</h1>
      <h3>Here you can search for your favorite recipes or create your own!</h3>
      <Link to="./home">
        <button>Enter</button>
      </Link>
    </div>
  );
}
