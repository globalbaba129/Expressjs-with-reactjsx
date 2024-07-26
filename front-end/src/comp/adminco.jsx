import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/total-Admin');
                setUserCount(response.data.count);
            } catch (error) {
                console.error('Failed to fetch user count:', error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div >
            <h1 >Total Admin</h1>
            <div >{userCount}</div>
        </div>
    );
}



export default Admin;
