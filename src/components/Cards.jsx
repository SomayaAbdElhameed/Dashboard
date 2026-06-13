import React from 'react'
import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import Skeleton from './Skeleton';
const Cards = () => {

 
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);

    // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div>
      
        <section className="cards">
          <div className="card">
            <h3>Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$8,420</p>
          </div>
          <div className="card">
            <h3>Orders</h3>
            <p>320</p>
          </div>
          <div className="card">
            <h3>Growth</h3>
            <p>+18%</p>
          </div>
        </section>

    </div>
  )
}

export default Cards
