import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnnouncement, editAnnouncement } from '../../api/Announcements';
import BackButton from '../../components/BackButton';
import UnsavedChangesModal from '../../components/UnsavedChangesModal';

export default function EditAnnouncement() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");
  const [visible, setVisible] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [initialData, setInitialData] = useState({
    title: "",
    header: "",
    content: "",
    color: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    header: "",
    content: "",
    color: "",
  });

  const navigate = useNavigate();

  const isModified =
    title !== initialData.title ||
    header !== initialData.header ||
    color !== initialData.color ||
    content !== initialData.content;

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await getAnnouncement(id);
        setTitle(data.title);
        setHeader(data.header);
        setContent(data.content);
        setColor(data.color);
        setVisible(data.visible);
        setInitialData({
          title: data.title,
          header: data.header,
          content: data.content,
          color: data.color,
        });
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };
  
    fetchAnnouncement();
  }, [id]);
  

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
      await editAnnouncement(id, title, header, content, color, visible);
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "#008236",
        header: "Success!",
        content: "Announcement has been successfully saved!",
        showCloseButton: false
      }));
      setUnsavedChanges(false);
    } catch (error) {
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "red",
        header: "Failed to save announcement.",
        content: `${error}` ,
        showCloseButton: true
      }));
      console.error(error);
    } finally {
        navigate(-1);
    }
  };

  const handleLeave = () => {
    setIsModalOpen(false);
    setUnsavedChanges(false);
    navigate(-1);
  };
  
  const handleStay = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col flex-grow">
      <div className="text-center pt-10 mt-26">
        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
          Edit Announcement
        </div>
      </div>

      <div className="flex flex-col items-center mt-10"> 
      <div 
        className="mb-8 p-6 mx-6 w-200 max-w-4xl h-60 flex items-center justify-center text-center px-4 rounded-xl shadow-lg" 
        style={{ backgroundColor: color || "#000000" }}
      >
        <div>
          <h1 
            className="text-4xl font-bold text-white mb-2"
            dangerouslySetInnerHTML={{ __html: header }}
          >
          </h1>
          <div
            className="text-lg font-medium text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
        <form onSubmit={handleSubmit}>
        <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
           <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
            <div className="flex flex-col w-full">
              <label htmlFor="announcementTitle" className="text-white font-lg font-bold">Title</label>
              <input
                id="announcementTitle"
                type="text"
                maxLength={50}
                className={`border text-black ${errors.title ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({ ...errors, title: "" });
                  setUnsavedChanges(true);
                }}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="announcementHeader" className="text-white font-lg font-bold">Header</label>
              <input
                id="announcementHeader"
                type="text"
                maxLength={50}
                className={`border text-black ${errors.header ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                value={header}
                onChange={(e) => {
                  setHeader(e.target.value);
                  setErrors({ ...errors, header: "" });
                  setUnsavedChanges(true);
                }}
              />
              {errors.header && <p className="text-red-500 text-sm">{errors.header}</p>}
            </div>

            <div className="flex flex-col w-full justify-center items-center">
              <label htmlFor="announcementColor" className="text-white font-lg font-bold">Color</label>
              <input
                id="announcementColor"
                type="color"
                className={`border text-black ${errors.color ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setErrors({ ...errors, color: "" });
                  setUnsavedChanges(true);
                }}
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
            </div>
          </div>

            <div className="p-4 rounded-md border-0">
              <div className="flex-grow container mx-auto mt-4">
                <label htmlFor="announcementContent" className="block text-white font-lg font-bold pb-2">
                  Content
                </label>
                <textarea
                  id="announcementContent"
                  maxLength={200}
                  className={`w-180 border ${errors.content ? 'border-red-500' : 'border-gray-300'} bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                  rows="4"
                  placeholder="Enter content..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setErrors({ ...errors, content: "" });
                    setUnsavedChanges(true);
                  }}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
              </div>
            </div>
          </div>

          <div className="flex text-center gap-8 items-center justify-center my-4">
          <BackButton onClick={() => {
              if (unsavedChanges) {
                setIsModalOpen(true);
              } else {
                navigate(-1);
              }
            }} />
            <button
              type="submit"
              disabled={!isModified}
              className={`p-2 rounded w-40 text-white transition-colors duration-200 ${
                isModified
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-500"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <UnsavedChangesModal 
        isOpen={isModalOpen} 
        onClose={handleStay} 
        onExit={handleLeave} 
      />
    </main>
  );
}
