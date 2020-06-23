import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">
        <Link to='/'>Text Analysis Dashboard</Link>
      </div>
      
      <ul className="navbar-nav ml-auto">
      	<li className="nav-item">
      		<Link to='/analysis'>Analysis</Link>
      	</li>
      </ul>
    </nav>
  )
}

export default Navbar
