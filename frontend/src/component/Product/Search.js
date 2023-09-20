import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import Home from "../Home/Home";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- Beaworth" />
      <h2 className="searchHeading">Search for products or restaurants</h2>
      <div className="search">
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            autoFocus
            type="text"
            placeholder="Search Products and Restaurants ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
        <h2 className="searchHeading">Most Searched Products</h2>
      </div>
    </Fragment>
  );
};

export default Search;
