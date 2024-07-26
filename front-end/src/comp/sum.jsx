import "./sum.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalSalary = () => {
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalSalary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/sum');
        setTotalSum(response.data.totalSum);
      } catch (err) {
        setError('Error fetching total salary');
        console.error('Error fetching total salary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSalary();
  }, []);

  return (
    <div className="salary-container">
      <h1>Total Salary</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <h2>${totalSum}</h2>
      )}
    </div>
  );
};

export default TotalSalary;
