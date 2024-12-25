import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesByCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/analytics/sales-by-category");
        console.log("API response:", response.data);
        setData(response.data.data.result);
      } catch (error) {
        console.error("Error fetching sales by category:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="component">
      <h2>Sales by Category</h2>
      <ul>
        {data.map((item) => (
        <li key={item._id} className="list-item">
        <span className="item-name">{item._id}</span>
        <span className="item-price">${item.totalSales}</span>
      </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesByCategory;
