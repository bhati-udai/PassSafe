import React from 'react'

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center">
      <div className='flex'>
        {" "}
        Created with{" "}
        <lord-icon
          src="https://cdn.lordicon.com/ulnswmkk.json"
          trigger="hover"
          colors="primary:#e83a30"
        ></lord-icon>{" "}
        by Udai
      </div>
    </div>
  );
}

export default Footer
