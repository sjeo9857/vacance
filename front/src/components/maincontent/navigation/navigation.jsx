import React, {Component} from 'react';
import './navigation.styles.css';
import logo from './travelblogelogowewewe.png';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <nav className= 'navi'>
                <NavLink to ='/home'><img className="nav-logo" src={logo} alt="logo"></img></NavLink>
                {/* <a href="/" onClick={()=>this.props.onRouteSpecialChange('front')}><img className="nav-logo"  src={logo} alt="logo"/> </a> */}
                <ul className="nav-items">
                    <NavLink to ='/home' className="item">Home</NavLink>
                    {/* <a href="/"onClick={()=>this.props.onRouteSpecialChange('front')} className="item">Home</a> */}
                    <NavLink to ='/write' className="item">Write</NavLink>
                    {/* <a href="/"onClick={()=>this.props.onRouteSpecialChange('write')}className="item">Write</a> */}
                    <a href="/"className="item">Sign Out</a>
                    {/* <NavLink to ='/' className="item">Sign Out</NavLink> */}
                    </ul>
            </nav>
        );
    }
}

export default Navigation;