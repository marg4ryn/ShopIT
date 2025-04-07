import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnnouncement } from '../../api/Announcements';
import BackButton from '../../components/BackButton';

export default function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    header: "",
    content: "",
    color: "",
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!header) newErrors.header = "Header is required";
    if (!content) newErrors.content = "Content is required";
    if (!color) newErrors.color = "Color is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await addAnnouncement(title, header, content, color);
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "#008236",
        header: "Success!",
        content: "Announcement has been successfully created!",
        showCloseButton: false
      }));
    } catch (error) {
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "red",
        header: "Failed to create announcement.",
        content: `${error}` ,
        showCloseButton: true
      }));
      console.error(error);
    } finally {
        navigate(-1);
    }
  };
  
  return (
  <main className="flex flex-col flex-grow">
    <div className="text-center pt-10 mt-26">
      <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
        Add Announcement
      </div>
    </div>

    <div className="flex flex-col items-center mt-10"> 
      <form onSubmit={handleSubmit}>
        <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">    
          <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
            <div className="flex flex-col w-full">
              <label htmlFor="announcementTitle" className="text-white font-lg font-bold mb-2">Title</label>
              <input
                id="announcementTitle"
                type="text"
                placeholder="Enter title..."
                className={`border text-black ${errors.title ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({ ...errors, title: "" });
                }}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="announcementHeader" className="text-white font-lg font-bold mb-2">Header</label>
              <input
                id="announcementHeader"
                type="text"
                placeholder="Enter header..."
                className={`border text-black ${errors.header ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                value={header}
                onChange={(e) => {
                  setHeader(e.target.value);
                  setErrors({ ...errors, header: "" });
                }}
              />
              {errors.header && <p className="text-red-500 text-sm">{errors.header}</p>}
            </div>

            <div className="flex flex-col w-full justify-center items-center">
              <label htmlFor="announcementColor" className="text-white font-lg font-bold mb-2">Color</label>
              <input
                id="announcementColor"
                type="color"
                className={`border text-black ${errors.color ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setErrors({ ...errors, color: "" });
                }}
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
              </div>
          </div>

          <div className="p-4 rounded-md border-0 ">
            <div className="flex-grow container mx-auto mt-4">
                <label htmlFor="announcementContent" className="block text-white font-lg font-bold pb-2">
                  Content
                </label>
                <textarea
                  id="announcementContent"
                  className={`w-180 border ${errors.content ? 'border-red-500' : 'border-gray-300'} bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                  rows="4"
                  placeholder="Enter content..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setErrors({ ...errors, content: "" });
                  }}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                </div>
          </div>

        </div>               
        <div className="flex text-center gap-8 items-center justify-center my-4">
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
