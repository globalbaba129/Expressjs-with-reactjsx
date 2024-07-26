import "./dash.css";
import Admin from "../comp/adminco";
import CountDisplay from "../comp/count";
import MaxSalary from "../comp/maxsal";
import MinSalary from "../comp/minsal";
import React from "react";
import TotalSalary from "../comp/sum";
import UserCount from "../comp/userco";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <div className="dashboard-content">
        <div className="dashboard-item">
          <CountDisplay />
        </div>
        <div className="dashboard-item">
          <TotalSalary />
        </div>
        <div className="dashboard-item">
          <MinSalary />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-item">
          <MaxSalary />
        </div>
       
        <div className="dashboard-item">
          <UserCount />
        </div>
        
        <div className="dashboard-item">
          <Admin />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;