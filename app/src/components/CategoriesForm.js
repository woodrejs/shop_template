import React, { useState } from "react";
//COMPONENTS
import CustomInput from "./CustomInput";
//UTILES
import { useQuery } from "@apollo/client";
import { getCategoriesQuery } from "../utils/Queries";
import { useCounter } from "../utils/Sweet_state";

const CategoriesForm = () => {
  const [formData, setFormData] = useState(null);
  const [, { setCategories }] = useCounter();
  const { loading, data } = useQuery(getCategoriesQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories(formData);
  };
  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;
    const newFormData = { ...formData };
    newFormData[name] = isChecked;

    setFormData(newFormData);
  };

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <form onSubmit={handleSubmit}>
      {data.categories.map((category) => (
        <CustomInput
          handler={handleChange}
          name={category.name}
          key={category._id}
          id={category._id}
        />
      ))}

      <input type="submit" value="submit" />
    </form>
  );
};
export default CategoriesForm;
