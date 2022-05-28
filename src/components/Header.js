import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Link className="link" to={{ pathname: '/' }}>
        <button className="btn">Все котики</button>
      </Link>
      <Link className="link" to={{ pathname: '/liked' }}>
        <button className="btn">Любимые котики</button>
      </Link>
    </div>
  );
}

export default Header;
