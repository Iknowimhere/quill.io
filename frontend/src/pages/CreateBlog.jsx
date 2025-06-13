import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import axios from "../axios";
import useAuth from "../context/AuthContext";
import Navbar from "../components/Navbar";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    blogImage: null,
  });

  const categories = [
    "Technology",
    "Programming",
    "Web Development",
    "Mobile Development",
    "AI & Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Design & UX",
    "Business",
    "Startups",
    "Health & Wellness",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlog((prev) => ({ ...prev, blogImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editorRef.current) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", editorRef.current.getContent());
      formData.append("category", blog.category);
      formData.append("blogImage", blog.blogImage);

      await axios.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      enqueueSnackbar("Blog created successfully", { variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error creating blog", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Blog</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Cover Image
            </label>
            <div className="mt-1 flex items-center">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded mr-4"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                required
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <Editor
              apiKey="2b8ski3i685gl8r6ahw5lpgeg8nnb03mj0zq7o9mygqb458v" 
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: true, // Enable the menubar for more formatting options
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "hr",
                  "paste", // Add horizontal rule and paste plugins
                ],
                toolbar: [
                  "undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify",
                  "bullist numlist outdent indent | removeformat | hr | help",
                  "forecolor backcolor | fontfamily fontsizeselect",
                ],
                content_style: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #374151;
      }
      h1, h2, h3, h4, h5, h6 { 
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-weight: 600;
      }
      p { margin: 1em 0; }
      hr { 
        border: none;
        border-top: 2px solid #E5E7EB;
        margin: 2em 0;
      }
    `,
                formats: {
                  h1: { block: "h1", classes: "text-3xl font-bold" },
                  h2: { block: "h2", classes: "text-2xl font-bold" },
                  h3: { block: "h3", classes: "text-xl font-bold" },
                },
                paste_preprocess: function (plugin, args) {
                  // Clean up pasted content
                  args.content = args.content.replace(/<p[^>]*>/g, "<p>");
                },
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;