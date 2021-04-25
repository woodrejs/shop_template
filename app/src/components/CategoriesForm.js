import React, { useState, useEffect } from "react";
//UTILES
import axios from "axios";

const CategoriesForm = () => {
  const [categories, setCategories] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    (async function () {
      const resp = await axios.post(
        `${process.env.REACT_APP_DB_HOST}/graphql`,
        {
          query: `{
                  categories{                 
                              name 
                              _id               
                            }
                  }`,
        }
      );
      const data = resp.data.data.categories;
      setCategories(data);
      const list = {};
      data.forEach((item) => (list[item.name] = false));
      setCheckedList(list);
    })();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const list = { ...checkedList };
    list[e.target.name] = e.target.checked;
    setCheckedList(list);
  };

  console.log(checkedList);

  return (
    <form>
      <span>Category</span>
      {categories.map((item) => (
        <CategoryInput
          key={item._id}
          item={item}
          handler={handleChange}
          checked={checkedList[item.name]}
        />
      ))}
    </form>
  );
};
export default CategoriesForm;

function CategoryInput({ item, handler, checked }) {
  const { name, _id } = item;
  return (
    <div>
      <label htmlFor={_id}>{name}</label>
      <input
        type="checkbox"
        name={name}
        id={_id}
        onChange={(e) => handler(e)}
        checked={checked || false}
      />
    </div>
  );
}

/*
    <form>
      <span>Category</span>
      {categories.map(({ name, _id }) => (
        <div key={_id}>
          <label htmlFor={_id}>{name}</label>
          <input
            type="checkbox"
            name={name}
            id={_id}
            onChange={(e) => handleChange(e)}
            checked={checkedList[name] || false}
          />
        </div>
      ))}
    </form>
    */
