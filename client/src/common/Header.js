import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import history from "../history";

class Header extends Component {

  handleClick = () => {
        console.log("logout value ", localStorage.getItem('user'));
        localStorage.removeItem('user');
        history.push('/login');
    }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">MERN CRUD</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/' })}" >
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
   
            <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/customers' })}">
              <Link className="nav-link" to="/customers">Customer</Link>
            </li>
   
            <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/products' })}">
              <Link className="nav-link" to="/products">File Uploads</Link>
            </li>

            {
                localStorage.getItem('user')?
                <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/dashboard' })}">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li> : null 
            }
   
            {
                localStorage.getItem('user')
               ? 
             <li>
               <div className="nav-link" onClick={this.handleClick}>Logout</div>
             </li>
               : 
            
            <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/login' })}">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
           }
   
          </ul>
        </div>
      </nav>
    )
  }
}



export default Header;