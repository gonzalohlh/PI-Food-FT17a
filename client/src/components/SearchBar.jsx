import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";
/* import MaterialIcon from "react-google-material-icons"; */
/* import { FcSearch } from "react-icons/fc"; */
import "../styles/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    setName("");
  }

  return (
    <div className="searchBar">
      <input
        className="input"
        type="text"
        value={name}
        placeholder="Search recipe..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
        <span class="material-icons">search</span>
        {/*  <MaterialIcon icon="account_box" size={24} /> */}
      </button>
    </div>
  );
}
