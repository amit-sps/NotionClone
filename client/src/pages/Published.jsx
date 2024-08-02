import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dynamic from 'next/dynamic';
import { path } from '@/Api/newtorkPaths';
import { Spin } from 'antd'; // Assuming you're using Ant Design

const Editor = dynamic(() => import('@/components/documents/editor'), { ssr: false });

function Published() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [titleLogo, setTitleLogo] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPublishedContent = async () => {
    try {
      const { data } = await axios(`${path.getPublishPage}/${id}`);
      const page = data?.data?.page;
      if (!page?.content) {
        throw new Error('No content found');
      }
      setContent(page?.content || "");
      setTitle(data?.data?.title || "Untitled");
      setAuthor(data?.data?.adminId?.name || "Anonymous");
      setDate(new Date(data?.data?.createdAt).toLocaleDateString() || "");
      setCoverImage(data?.data?.coverImage || ""); // Assuming the cover image URL is in the response
      setTitleLogo(data?.data?.icon || ""); // Assuming the title logo URL is in the response

      // Fetch related blogs by the same author
      // Simulating related blogs data with dummy content
      setRelatedBlogs([
        {
          _id: '1',
          title: 'Understanding React Hooks',
          description: 'A comprehensive guide to React Hooks and how they simplify state management.',
        },
        {
          _id: '2',
          title: 'Advanced CSS Techniques',
          description: 'Explore advanced CSS techniques to enhance your web design skills.',
        },
        {
          _id: '3',
          title: 'Mastering JavaScript ES6',
          description: 'Learn the new features of JavaScript ES6 and how to use them effectively.',
        },
        {
          _id: '4',
          title: 'Introduction to TypeScript',
          description: 'A beginner’s guide to TypeScript and why it’s useful for large applications.',
        },
      ]);

      setError(false);
    } catch (error) {
      console.log(error);
      setContent("");
      setTitle("Error loading content");
      setAuthor("");
      setDate("");
      setCoverImage("");
      setTitleLogo("");
      setRelatedBlogs([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublishedContent();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 ">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="w-full max-w-4xl p-6 sm:p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Content Not Available</h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-8">The page you're looking for is not published or is private.</p>
        </div>
      ) : (
        <div className="w-full  relative bg-white rounded-lg shadow-lg">
          {coverImage && (
            <div className="relative">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white bg-gradient-to-t from-gray-900 to-transparent rounded-t-lg">
                <div className="flex items-center mb-4">
                  {titleLogo && (
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-gray-700">{titleLogo}</span>
                    </div>
                  )}
                  <h1 className="text-3xl sm:text-5xl font-bold text-shadow-md">{title}</h1>
                </div>
                <p className="text-base sm:text-lg mb-2">By {author}</p>
                <p className="text-sm sm:text-base">{date}</p>
              </div>
            </div>
          )}
          <div className="p-6 sm:p-8">
            <Editor initialContent={content} editable={false} />
          </div>
          {relatedBlogs.length > 0 && (
            <div className="p-6 sm:p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Related Blogs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div key={blog._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600">{blog.description}</p>
                    <a href={`/blogs/${blog._id}`} className="text-blue-500 mt-2 block">Read more</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Published;
