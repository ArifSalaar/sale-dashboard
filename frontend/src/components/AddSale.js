import React, { useState } from "react";
import axios from "axios";

const AddSale = () => {
  const [formData, setFormData] = useState({
    product: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/sales", formData);
      alert("Sale added successfully!");
    } catch (error) {
      console.error("Error adding sale:", error);
      alert("Failed to add sale.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-sale-form" >
      <h2>Add Sale</h2>
      <input
        type="text"
        name="product"
        placeholder="Product"
        value={formData.product}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Sale</button>
    </form>
  );
};

export default AddSale;
