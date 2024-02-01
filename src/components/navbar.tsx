import React from 'react';
import Image from 'next/image';
import myEfrei from '../assets/myEfrei.png';
import userProfile from '../assets/userProfile.png';

const Navbar = ({ currentUser }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Image src={myEfrei} alt="Website Logo" width={99} height={38}/>
      </div>
      <div className="user-name">
        {/* <span>{currentUser.name}</span> */}
         <span>Daniel Antoine</span>
      </div>
    </nav>
  );
};

export default Navbar;