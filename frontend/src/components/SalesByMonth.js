import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesByMonth = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/analytics/sales-by-month");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching sales by month:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="component">
      <h2>Sales by Month</h2>
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

export default SalesByMonth;
