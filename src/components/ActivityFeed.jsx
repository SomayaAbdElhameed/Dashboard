import React from "react";

export default function ActivityFeed({ activities }) {
  return (
    <div className="activity-feed">
      <h2>Recent Activity</h2>
      {activities.map((activity, index) => (
        <div key={index} className="activity-item">
          {activity}
        </div>
      ))}
    </div>
  );
}

