import React, { useContext, useRef, useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from '../Asset/logo.png'
import cart_icon from '../Asset/cart_icon.png'
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../Asset/dropdown_icon.png'




const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {gettotalcartitems}=useContext(ShopContext);
    const menuRef=useRef();

    const dropdown_toggle=(e)=>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
        }
  
    return (
      <div className='navbar'>
        <div className='nav-logo'>
          <img src={logo} alt=""/>
          <p>@t_lifestyle</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className='nav-menu'>
          <li onClick={() => { setMenu("shop") }}><Link style={{textDecoration:'none'}}to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("mens") }}><Link style={{textDecoration:'none'}}to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("womens") }}><Link style={{textDecoration:'none'}}to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("kids") }}><Link style={{textDecoration:'none'}}to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
          
          <Link to='/cart'><img src={cart_icon} alt=""/></Link>
          <div className="nav-cart-count">{gettotalcartitems()}</div>
        </div>
      </div>
    );
  }
  
  export default Navbar;
