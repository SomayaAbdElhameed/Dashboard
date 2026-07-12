import React from 'react'
import { useState } from "react";
const Responsive = () => {
  const [device, setDevice] = useState(null); 
  const setView = (view) => {
  if (device === view) {
    setDevice(null);
    return;
  }

  setDevice(view);

  const frame = document.getElementById("preview-frame");

  if (!frame) return;

  switch (view) {
    case "mobile":
      frame.style.width = "450px";
      break;

    case "tablet":
      frame.style.width = "768px";
      break;

    default:
      frame.style.width = "100%";
  }
};
  return (
    <>
   
<div className="preview-toolbar">
<button   onClick={() => setView('mobile')} ><i className="bi bi-phone nav-icon"></i>
</button>
<button onClick={() => setView('tablet')}><i className="bi bi-tablet nav-icon" ></i>
</button>
<button onClick={() => setView('desktop')}><i className="bi bi-display  nav-icon" ></i></button>
</div>

{device && (
  <div id="preview-container">
    <iframe id="preview-frame" src="/" title="Responsive" />
  </div>
  
)}
    </>
  )
}

export default Responsive
