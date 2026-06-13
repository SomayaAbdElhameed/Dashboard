import { useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";
import { getUsers, addUser, deleteUser, updateUser } from "../api/usersApi";

import Skeleton from "../components/Skeleton";
import RevenueChart from "../components/RevenueChart";
import Navbar from "../components/NavBar";
 import SideBar from "../components/SideBar";
import Cards from "../components/Cards";
import UserForm from "../components/UserForm";
import UsersList from "../components/UsersList";
import Pagination from "../components/Pagination";
import ActivityFeed from "../components/ActivityFeed";
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  // Initial fetch for users
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

  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.name ?? "").toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  useEffect(() => {
    // If search changes and current page becomes invalid, reset.
    setCurrentPage(1);
  }, [search]);

  const currentUsers = useMemo(() => {
    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;
    return filteredUsers.slice(firstUserIndex, lastUserIndex);
  }, [filteredUsers, currentPage]);

  // CRUD form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = (user) => {
    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setEditingId(user.id);
    setIsEditing(true);
  };

  const handleUpdateUser = async () => {
    if (!editingId) return;

    const updatedUser = {
      name,
      email,
      role: "User",
    };

    try {
      const response = await updateUser(editingId, updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === editingId ? response : u)));

      setName("");
      setEmail("");
      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    if (!name || !email) return;

    const newUser = {
      name,
      email,
      role: "User",
    };

    try {
      const createdUser = await addUser(newUser);
      setUsers((prev) => [...prev, createdUser]);

      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  // Fake activity feed
  const [activities, setActivities] = useState(["Dashboard Started"]);
  const fakeActivities = [
    "New User Registered",
    "New Order Created",
    "Product Updated",
    "Revenue Increased",
    "User Profile Updated",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivity = fakeActivities[Math.floor(Math.random() * fakeActivities.length)];
      setActivities((prev) => [randomActivity, ...prev]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
            <Navbar/>

      <SideBar/>
      <Cards />

      <main>
        <section className="users-list">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <UserForm
            name={name}
            email={email}
            isEditing={isEditing}
            onNameChange={setName}
            onEmailChange={setEmail}
            onSubmit={isEditing ? handleUpdateUser : handleAddUser}
          />

          <UsersList
            users={currentUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </section>

        <RevenueChart />
        <ActivityFeed activities={activities} />
      </main>
    </div>
  );
}

export default Dashboard;

