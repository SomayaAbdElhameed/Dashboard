import "../styles/dashboard.css";
import ManageUsers from "../components/ManageUsers";
import ChannelMix from "../components/ChannelMix";
import Header from "../components/Header";

import Cards from '../components/Cards'
function Dashboard() {
  return (
    <>

      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
                      <Header />
          <Cards/>
          <ChannelMix />
          <ManageUsers />
        </div>
      </main>
    </>
  );
}

export default Dashboard;


