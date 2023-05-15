import axios from "axios";
import React, { useEffect } from "react";
import CollapseCategory from "./CollapseCategory.jsx";

const Category = (props) => {
  const fetchData = () => {
    axios
      .get("https://localhost:7100/api/Categories/GetCategories")
      .then((response) => {
        props.setCategories(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {props.categories.map((category, index) => (
        <CollapseCategory
          key={index}
          category={category}
          setCategory={props.setCategory}
          setSub={props.setSub}
        />
      ))}
    </div>
  );
};

export default Category;
