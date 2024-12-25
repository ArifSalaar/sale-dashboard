import React, { useEffect, useState } from "react";
import axios from "axios";

const TopProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/analytics/top-products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="component">
      <h2>Top Products</h2>
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

export default TopProducts;
