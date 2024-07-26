import React, { useEffect, useState } from "react";
import axios from "axios";

const MaxSalary = () => {
    const [maxSalary, setMaxSalary] = useState(null);

    useEffect(() => {
        const fetchMaxSalary = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/salary/max');
                setMaxSalary(response.data.maxSalary);
            } catch (error) {
                console.error("There was an error fetching the maximum salary data!", error);
            }
        };
        fetchMaxSalary();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Maximum Salary </h1>
            {maxSalary !== null ? (
                <div>
                    <p><strong>Maximum Salary:</strong> ${maxSalary}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MaxSalary;
