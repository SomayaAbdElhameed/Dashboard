import React from "react";

const ActivityFeed = ({ activities = [] }) => {
  const latest = (activities ?? [])[0];

  return (
    <div className="dropdown-header fw-bold text-body">
      <h2>Recent Activity</h2>
      <div>
        {latest ? (
          <>
            <h4 className="notification-title">{latest.message}</h4>
            <span className="notification-time">{latest.time}</span>
          </>
        ) : (
          <h4 className="notification-title">No activity yet</h4>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;

