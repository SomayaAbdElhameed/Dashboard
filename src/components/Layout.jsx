import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Footer from "../components/Footer";

/**
 * Shared app shell so sidebar/navbar persist across all pages.
 */
const Layout = ({ children, activities = [] }) => {
  return (
    <div className="admin-shell">
      <div className="sidebar-backdrop" data-sidebar-close></div>
      <SideBar />

      <div className="admin-main">
        <NavBar activities={activities} />
        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
   {children}
                        <Footer/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;


