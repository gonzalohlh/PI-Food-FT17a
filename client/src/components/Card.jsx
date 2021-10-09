import React from "react";

export default function Card({ title, image, diets, vegetarian }) {
  return (
    <div>
      <h3>{title}</h3>
      <img
        src={image}
        alt="Img recipe not found"
        width="250px"
        height="250px"
      />
      <h5>
        {diets}
        {vegetarian}
      </h5>
    </div>
  );
}
