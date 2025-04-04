import React, { useState } from "react";
import { addAnnouncement } from '../../api/Announcements';
import BackButton from '../../components/BackButton';

export default function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !header || !content || !color) {
      alert("All fields are required");
      return;
    }
  
    try {
      const response = await addAnnouncement(title, header, content, color);
      alert("Announcement added successfully!");
      console.log(response);
    } catch (error) {
      alert("There was an error while adding the announcement.");
      console.error(error);
    }
  };
 
  return (
    <main className="container mx-auto py-10 flex-grow pt-18">
      <div className="flex flex-col space-y-6 place-items-center">
        <div className="text-center mt-4">
            <p className="text-2xl font-bold mb-4 mt-4 text-white">Add new announcement</p>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
            
            <div className="flex items-center justify-center space-x-4 w-full pb-6">
                <label className="text-white font-lg font-bold">Title</label>
                <input
                type="text"
                className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-center space-x-4 w-full pb-6">
                <label className="text-white font-lg font-bold">Header</label>
                <input
                type="text"
                className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-center space-x-4 w-full">
                <label className="text-white font-lg font-bold">Color</label>
                <input
                type="color"
                className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                />
            </div>

            <div className="p-4 rounded-md border-0 ">
              <div className="flex-grow container mx-auto mt-4">
                  <label className="block text-white font-lg font-bold pb-2">
                    Content
                  </label>
                  <textarea
                    className="w-180 border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    rows="4"
                    placeholder="Enter content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
              </div>
          </div>

        </div>               
        <div className="flex text-center gap-8 items-center justify-center mt-4">
        <BackButton />
        <button
            type="submit"
            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-40"
            >
            Add
        </button>
        </div>
        </form>
      </div>
    </main>
  );
}
