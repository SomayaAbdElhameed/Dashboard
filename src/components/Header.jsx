import React from 'react'
import logo from '../img/dash.png';

const Header = () => {
  return (
    <>
      <div className='page-heading  panel0'>
<div className="page-heading-copy">
<span className="page-icon"><i className="bi bi-speedometer2" aria-hidden="true"></i></span>
<div>
<p className="eyebrow mb-1">Overview</p>
<h1 className="h3 mb-1">Dashboard</h1>
<p className="text-muted  mb-0">Monitor performance, sales, users,Check your new badge in your profile</p>
<p className="text-muted  mb-0">Check your new badge in your profile Check your new badge in your profile.</p> <br/>
    <button className="btn btn-danger btn-sm  cobtn" type="button"> Create Report</button>

</div>
</div>


<div className="heading-actions">
   
<img className='logo' src={logo} alt="" />
   
</div>

</div>
    </>
  )
}

export default Header
