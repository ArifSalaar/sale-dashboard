import React from "react";
import AddSale from "./AddSale";
import SalesByCategory from "./SalesByCategory";
import SalesByMonth from "./SalesByMonth";
import TopProducts from "./TopProducts";
import SalesTrends from "./SalesTrends";

const Dashboard = () => {
  return (
    <div>
      {/* AddSale Component */}
      <div className="add-sale-container">
        <AddSale />
      </div>

      {/* Horizontal Layout for Remaining Components */}
      <div id="dashboard">
        <SalesByCategory />
        <SalesByMonth />
        <TopProducts />
        <SalesTrends />
      </div>
    </div>
  );
};

export default Dashboard;
