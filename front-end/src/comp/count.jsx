import React, { useEffect, useState } from "react";
import axios from "axios";

const CountDisplay = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the count from the API
    const fetchCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/count');
        setCount(response.data.count);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCount();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="card mt-4 p-3">
      <h3 className="card-title text-center">User Count</h3>
      {error ? (
        <p className="text-danger text-center">Error: {error}</p>
      ) : (
        <p className="text-success text-center">Total Users: {count}</p>
      )}
    </div>
  );
};

export default CountDisplay;
