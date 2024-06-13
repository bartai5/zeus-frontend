import DropDown from "../form/DropDown";
import InputField from "../form/InputField";
// import AxiosInstance from "../../utils/AxiosInstance";
import "./Filter.css";
import { useState } from "react";
const Filter = () => {
  const initialFormData = {
    rental_type: "",
    minimum_price: "",
    maximum_price: "",
    bedroom_quantity: "",
    bathroom_quantity: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClearSelection = () => {
    setFormData(initialFormData);
  }
  const handleFilterData = (e) =>{
    e.preventDefault()
    console.log('====================================');
    console.log(formData);
    console.log('====================================');
  }
  return (
    <div className="property-filter">
      <h3 className="filter-title">Filter Property</h3>
      <form className="filter-properties" onSubmit={handleFilterData}>
        <DropDown
          labelName={"Rental Type"}
          inputName={"rental_type"}
          onChange={handleChange}
          value={formData.rental_type}
        />
        <div className="filter-control">
          <label>Price Range</label>
          <div className="price-range-input">
            <input
              type="number"
              placeholder="Min"
              name="minimum_price"
              className="price-range"
              onChange={handleChange}
              value={formData.minimum_price}
            />
            <label>To</label>
            <input
              type="number"
              placeholder="Max"
              name="maximum_price"
              className="price-range"
              onChange={handleChange}
              value={formData.maximum_price}
            />
          </div>
        </div>
        <InputField
          labelName={"No of Bedrooms"}
          inputName={"bedroom_quantity"}
          placeholder={"Number of Bedrooms"}
          onChange={handleChange}
          value={formData.bedroom_quantity}
        />
        <InputField
          labelName={"No of Bathrooms"}
          inputName={"bathroom_quantity"}
          placeholder={"Number of Bathrooms"}
          onChange={handleChange}
          value={formData.bathroom_quantity}
        />
        <div className="filter-btns">
          <button className="filter-button clear-select" onClick={handleClearSelection}>
            Clear Selections
          </button>
          <button className="filter-button apply-filter">Apply Filter</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
