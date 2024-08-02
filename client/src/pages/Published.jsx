import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dynamic from "next/dynamic";
import { path } from "@/Api/newtorkPaths";
import { Spin } from "antd";

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

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/documents/editor"), { ssr: false }),
    [content]
  );

  const getRelatedPublishedContent = async (publisherId) => {
    try {
      const { data } = await axios(
        `${path.getRelatedPublishPage}/${publisherId}?currentPage=${id}`
      );
      const relatedPages = data?.data || [];
      setRelatedBlogs(relatedPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getPublishedContent = async () => {
    try {
      const { data } = await axios(`${path.getPublishPage}/${id}`);
      const page = data?.data?.page;
      if (data?.data?.adminId?._id) {
        getRelatedPublishedContent(data?.data?.adminId?._id);
      }
      if (
        !page?.content ||
        (JSON.parse(page?.content)[0].type === "paragraph" &&
          JSON.parse(page?.content)[0].content.length === 0)
      ) {
        throw new Error("No content found");
      }

      setContent(page?.content || "");
      setTitle(data?.data?.title || "Untitled");
      setAuthor(data?.data?.adminId?.name || "Anonymous");
      setDate(new Date(data?.data?.createdAt).toLocaleDateString() || "");
      setCoverImage(data?.data?.coverImage || "default-cover-image.jpg");
      setTitleLogo(data?.data?.icon || "");

      setError(false);
    } catch (error) {
      console.log(error);
      setContent("");
      setTitle("Error loading content");
      setAuthor("");
      setDate("");
      setCoverImage("default-cover-image.jpg");
      setTitleLogo("");
      setRelatedBlogs([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublishedContent();
  }, [id]); 

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full relative bg-white rounded-lg shadow-lg">
          {error ? (
            <div className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg text-center">
              <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">
                Page Not Available
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 mb-8">
                The page you're looking for is not published or is private.
              </p>
              <img
                src="/images/not-found.svg"
                alt="Not Found"
                className="w-48 mx-auto"
              />
            </div>
          ) : (
            <div>
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
                          <span className="text-2xl font-bold text-gray-700">
                            {titleLogo}
                          </span>
                        </div>
                      )}
                      <h1 className="text-3xl sm:text-5xl font-bold text-shadow-md">
                        {title}
                      </h1>
                    </div>
                    <p className="text-base sm:text-lg mb-2">By {author}</p>
                    <p className="text-sm sm:text-base">{date}</p>
                  </div>
                </div>
              )}
              <div className="p-6 sm:p-8">
                <Editor initialContent={content} editable={false} />
              </div>
            </div>
          )}

          {relatedBlogs.length > 0 && (
            <div className="p-6 sm:p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Related Pages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {relatedBlogs.map((page) => (
                  <div
                    key={page._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          page.coverImage ||
                          "https://images.pexels.com/photos/159435/instagram-tablet-device-technology-159435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {page.icon && page.icon}
                          {page.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <p className="text-sm text-gray-600">
                          <strong>Published on</strong>{" "}
                          {new Date(page.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to={`/published/page/${page._id}`}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      >
                        Read more
                      </Link>
                    </div>
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
