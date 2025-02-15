'use client'
import Image from "next/image";
import Link from "next/link";
import img from '../assets/about-image-2.jpg'
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/store/reducer/blogsReducer";
import { useEffect } from "react";

const recentPosts = [
  {
    title: "But I must explain to you how all this mistaken idea",
    date: "March 7, 2023",
    dis: " Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesquesem sed convallis ultricies, ante eros laoreet libero, suscipit lorem turpis sit amet lectus. Quisque egestas lorem umauris ultricies, vitae sollicitudin quam facilisis.",
    image: img,
  },
  {
    title: "The Problem With Typefaces on the Web",
    date: "March 7, 2023",
    dis: " Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesquesem sed convallis ultricies, ante eros laoreet libero, suscipit lorem turpis sit amet lectus. Quisque egestas lorem umauris ultricies, vitae sollicitudin quam facilisis.",

    image: img,
  },
  {
    title: "On the other hand we provide denounce with righteous",
    date: "March 6, 2023",
    dis: "",

    image: img,
  },
  {
    title: "English Breakfast Tea With Tasty Donut Desserts",
    date: "March 7, 2023",

    image: img,
  },
];


export default function BlogPost() {
  const { blogsdata } = useSelector((state) => state.blogs)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const data = Array.isArray(blogsdata) ? blogsdata : blogsdata?.blog || [];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
        {data.map((item, index) => (
          <article key={index} className="mt-4">
        
            <Image
              src={item?.images[0] || "https://i.ibb.co/PZbkQjRb/image-not-found.jpg"}
              height={400}
              width={400}
              alt="Featured"
              className="my-6 h-[400px] w-full rounded-lg object-cover"
            />
                <span className="text-sm font-medium text-blue-600">{item?.category}</span>
            <h1 className="mt-2 text-3xl font-bold">
              {item?.title}
            </h1>
            <time className="mt-2 block text-sm text-gray-500">Publish at : {item?.createdAt.slice(0, 10)}</time>
            <p className="text-gray-500 leading-relaxed">
           {item?.content[0]}
            </p>
            <Link href={`/blog/SingleBlog/${item._id}`} >
            <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300">
              Read More
            </button>
            </Link>
          </article>
        ))}
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-8 lg:h-fit space-y-8">
          <div className="p-4 bg-[#ffffff02] rounded-md">
            <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {data.map((post, index) => (
                <div key={index} className="flex gap-4">
                  <Image
                    src={post?.images[0] || "https://i.ibb.co/PZbkQjRb/image-not-found.jpg"}
                    height={200}
                    width={200}
                    alt="blog"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <Link
                     href={`/blog/SingleBlog/${post._id}`}
                      className="font-medium text-gray-500 hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                    <time className="block text-sm text-gray-500">
                    Publish at : {post.createdAt.slice(0, 10)}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="p-4 bg-[#ffffff02] rounded-md">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Facebook
              </button>
              <button className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500">
                Twitter
              </button>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Pinterest
              </button>
              <button className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
