import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesTrends = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/analytics/sales-trends");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching sales trends:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="component">
      <h2>Sales Trends</h2>
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

export default SalesTrends;
