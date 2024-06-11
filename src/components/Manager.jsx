import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    } else {
      setPasswordArray([]);
    }
  }, []);

  const showPassword = () => {
    alert("Show Password");
  };

  const savePassword = () => {
    if (isEditing) {
      const updatedPasswords = passwordArray.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setIsEditing(false);
      setEditId(null);
    } else {
      const newPasswords = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(newPasswords);
      localStorage.setItem("passwords", JSON.stringify(newPasswords));
    }
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
    setIsEditing(true);
    setEditId(id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-700 opacity-20 blur-[100px]"></div>
      </div>
      <div className="max-w-4xl mx-auto my-8 p-4">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt;</span>PassSAFE
          <span className="text-green-700">/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8">
          <input
            className="border border-green-500 p-4 py-1"
            type="text"
            name="site"
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="border border-green-500 p-4 py-1 flex-grow"
              type="text"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              name="username"
            />
            <div className="relative flex-grow">
              <input
                className="border border-green-500 p-4 py-1 w-full"
                type="text"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
              <span
                className="absolute right-2 top-2 p-1 cursor-pointer"
                onClick={showPassword}
              >
                Show
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="border border-green-900 gap-2 flex justify-center items-center bg-green-500 rounded-full px-4 py-2 self-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            {isEditing ? "Update Password" : "Save Password"}
          </button>
        </div>
        <div className="passwords mt-8">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((password) => (
                  <tr key={password.id}>
                    <td className="py-2 text-center w-32">
                      <a
                        href={password.site}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {password.site}
                      </a>
                    </td>
                    <td className="py-2 text-center w-32">
                      {password.username}
                    </td>
                    <td className="py-2 text-center w-32">
                      {password.password}
                    </td>
                    <td className="py-2 text-center w-32">
                      <span
                        className="cursor-pointer mr-2"
                        onClick={() => deletePassword(password.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => editPassword(password.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/oqaajvyl.json"
                          trigger="hover"
                          colors="primary:#000000,secondary:#16c72e"
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
