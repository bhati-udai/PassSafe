import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white">
          <span className="text-green-700"> &lt;</span>PassSAFE
          <span className="text-green-700">/ &gt;</span>
        </div>
        <ul>
          <li className="flex gap-4 text-white">
            <a className="hover:font-bold" href="/">
              GITHUB
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar
