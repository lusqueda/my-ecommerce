import React from "react";
import { useParams } from "react-router-dom";

import ItemCategoryContainer from "../../components/ItemCategoryContainer/ItemCategoryContainer";

const Category = () => {

 let { category } = useParams();
  
  return (
    <div>
        <ItemCategoryContainer category={category} />    
    </div>
  );
};

export default Category