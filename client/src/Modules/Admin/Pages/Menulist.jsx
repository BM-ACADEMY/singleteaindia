import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all menus
  const fetchMenus = async () => {
    try {
      const response = await axiosInstance.get("/menus");
      setMenus(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch menus");
    }
  };

  // Delete menu
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/menus/${id}`);
      setMenus(menus.filter((menu) => menu._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete menu");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Menu List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {menus.map((menu) => (
          <li key={menu._id} className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-bold">{menu.title}</h3>
            {menu.image_url && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${menu.image_url}`}
                alt={menu.title}
                className="w-32 h-32 object-cover my-2"
              />
            )}
            <ul className="list-disc ml-6">
              {menu.content_text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button
              onClick={() => handleDelete(menu._id)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;