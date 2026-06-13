import React from 'react'

const Navbar = () => {
  return (
    <div>
       <header className="navbar">
      <div className="profile">
        <img src={require("../me.jpg")} alt="profile" />
        <span>Somaya</span>
      </div>
    </header>
    </div>
  )
}

export default Navbar
