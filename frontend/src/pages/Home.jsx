import { useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  // Sample data for blogs
  const [recentBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and build your first component...",
      author: "John Doe",
      date: "2025-06-01",
      views: 1200
    },
    {
      id: 2,
      title: "Modern JavaScript Features",
      excerpt: "Explore the latest features in JavaScript ES2025...",
      author: "Jane Smith",
      date: "2025-06-02",
      views: 850
    },
    {
      id: 3,
      title: "CSS Grid Layout Mastery",
      excerpt: "Master CSS Grid layout with practical examples...",
      author: "Mike Johnson",
      date: "2025-06-03",
      views: 950
    }
  ]);

  // Sort blogs by views for popular section
  const popularBlogs = [...recentBlogs].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center">
            Welcome to Quill.io
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500">
            Your platform for meaningful stories and ideas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Blogs Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Blogs</h2>
            <div className="space-y-6">
              {recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{blog.excerpt}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span>{blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                      {blog.views}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Blogs Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Blogs</h2>
            <div className="bg-white shadow rounded-lg divide-y">
              {popularBlogs.map((blog) => (
                <div key={blog.id} className="p-4 hover:bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900">
                    {blog.title}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{blog.author}</span>
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                      {blog.views}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;