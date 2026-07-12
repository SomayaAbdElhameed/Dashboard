import "./styles/dashboard.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./components/Users";
import ChannelMix from "./components/ChannelMix";
import Alert from "./components/Alert";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
import Tables from "./components/Tables";
import AddUsers from "./components/AddUser";
import Layout from "./components/Layout";

function App() {
  // Shared fake activity so navbar badges work on every page.
  const [activities, setActivities] = useState([
    {
      id: 1,
      eventType: "user",
      message: "User Signed In",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      eventType: "ticket",
      message: "New Ticket Created",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 3,
      eventType: "revenue",
      message: "Revenue Updated",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 4,
      eventType: "profile",
      message: "Profile Verified",
      time: "10 mins ago",
      read: false,
    },
  ]);

  useEffect(() => {
    const fakeActivities = [
      {
        id: 1,
        eventType: "user",
        message: "User Signed In",
        time: "Just now",
        read: false,
      },
      {
        id: 2,
        eventType: "ticket",
        message: "New Ticket Created",
        time: "Just now",
        read: false,
      },
      {
        id: 3,
        eventType: "revenue",
        message: "Revenue Updated",
        time: "Just now",
        read: false,
      },
      {
        id: 4,
        eventType: "profile",
        message: "Profile Verified",
        time: "Just now",
        read: false,
      },
    ];

    const interval = setInterval(() => {
      const randomActivity =
        fakeActivities[Math.floor(Math.random() * fakeActivities.length)];

      setActivities((prev) => {
        const nextId = (prev?.[0]?.id ?? 0) + 1;
        return [
          { ...randomActivity, id: nextId, time: "Just now", read: false },
          ...(prev ?? []),
        ];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout activities={activities}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/Users"
          element={
            <Layout activities={activities}>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/AddUsers"
          element={
            <Layout activities={activities}>
              <AddUsers />
            </Layout>
          }
        />
        <Route
          path="/Profile"
          element={
            <Layout activities={activities}>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/ChannelMix"
          element={
            <Layout activities={activities}>
              <ChannelMix />
            </Layout>
          }
        />
        <Route
          path="/Forms"
          element={
            <Layout activities={activities}>
              <Forms />
            </Layout>
          }
        />
        <Route
          path="/Tables"
          element={
            <Layout activities={activities}>
              <Tables />
            </Layout>
          }
        />
        <Route
          path="/Alert"
          element={
            <Layout activities={activities}>
              <Alert />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



