import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { revenueData } from "../data/chartData";

function RevenueChart() {
  return (
    <div className="chart-container">
      <h2>Revenue Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    
  );
}

export default RevenueChart;