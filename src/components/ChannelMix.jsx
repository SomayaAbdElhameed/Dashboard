import React, { useMemo } from "react";
import { revenueData } from "../data/chartData";


const ChannelMix = () => {
const salesData = useMemo(() => {
// Separate dataset for the Sales component, derived from shared revenueData.
// Uses the same month labels so UI stays consistent.
return revenueData.map((d) => ({ month: d.month, sales: d.revenue }));
}, []);

// Convert sales values to percentage heights (0-100) for the existing CSS classes.
const maxSales = Math.max(...salesData.map((d) => d.sales));
const salesPercentages = salesData.map((d) =>
maxSales > 0 ? Math.round((d.sales / maxSales) * 100) : 0
);

const barClass = (percent) => {
// Keep compatibility with the existing predefined classes.
if (percent <= 45) return "bar-42";
if (percent <= 55) return "bar-51";
if (percent <= 65) return "bar-58";
if (percent <= 75) return "bar-72";
if (percent <= 78) return "bar-66";
return "bar-83";
};


return (
<>

<main class="dashboard-content">
<div class="container-fluid px-3 px-lg-4 py-4">
<div class="page-heading">
<div class="page-heading-copy">
<span class="page-icon"><i class="bi bi-bar-chart-line" aria-hidden="true"></i></span>
<div>
<p class="eyebrow mb-1">Analytics</p>
<h1 class="h3 mb-1">Charts</h1>
<p class="text-muted mb-0">Visualize revenue, channels, and operating performance.</p>
</div>
</div>

</div>

<section class="row g-3 mt-1">
<div class="col-12 col-xl-8">
<div class="panel h-100">
<div class="panel-header"><div><h2 class="h5 mb-1 section-title"><i class="bi bi-bar-chart-line" aria-hidden="true"></i><span>Revenue Trend</span></h2><p class="text-muted mb-0">Static chart component ready for Chart.js integration.</p></div></div>

  <div className="chart-bars" aria-label="Sales performance chart">
{salesData.map((d, idx) => (
<div
key={d.month}
className={`chart-column ${barClass(salesPercentages[idx])}`}
>
<span></span>
<small>{d.month}</small>

<div className="bar-tooltip" role="tooltip">
<div className="bar-tooltip-month">{d.month}</div>
<div className="bar-tooltip-value">{d.sales.toLocaleString()}</div>
</div>
</div>
))}
</div>
</div>
</div>
<div class="col-12 col-xl-4">
<div class="panel h-100">
<div class="panel-header"><div><h2 class="h5 mb-1 section-title"><i class="bi bi-pie-chart" aria-hidden="true"></i><span>Channel Mix</span></h2><p class="text-muted mb-0">Revenue contribution by source.</p></div></div>
<div class="donut-chart mx-auto"><span>68%</span></div>
<div class="legend-list mt-4"><div><span class="legend-dot bg-primary"></span>Direct sales<strong>42%</strong></div><div><span class="legend-dot bg-success"></span>Marketplace<strong>26%</strong></div><div><span class="legend-dot bg-warning"></span>Partners<strong>18%</strong></div><div><span class="legend-dot bg-danger"></span>Other<strong>14%</strong></div></div>
</div>
</div>
</section>
</div>
</main>

{/* =========================================================================================================== */}



</>
);
}
export default ChannelMix