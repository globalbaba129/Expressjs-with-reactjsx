import React, { useEffect, useState } from "react";
import axios from "axios";

const MinSalary = () => {
    const [minSalary, setMinSalary] = useState(null);

    useEffect(() => {
        const fetchMinSalary = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/salary/min');
                setMinSalary(response.data.minSalary);
            } catch (error) {
                console.error("There was an error fetching the minimum salary data!", error);
            }
        };
        fetchMinSalary();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Minimum Salary </h1>
            {minSalary !== null ? (
                <div>
                    <p><strong>Minimum Salary:</strong> ${minSalary}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MinSalary;
