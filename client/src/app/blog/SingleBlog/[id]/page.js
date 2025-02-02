'use client'
import Image from "next/image"
import Link from "next/link"
import { CiShare2 } from "react-icons/ci"
import { FiMessageCircle } from "react-icons/fi"
import img from '../../../assets/about-image-2.jpg'
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs, getBlogById } from "@/store/reducer/blogsReducer"
import { use, useEffect } from "react";

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

export default function BlogPost({ params }) {
const { singleblog, blogsdata } = useSelector((state) => state.blogs)
const myid = use(params)
const id = myid.id

console.log(id, ' id is here')

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getBlogById(id));
}, [dispatch, id]);

const data = Array.isArray(singleblog) ? singleblog : singleblog?.blog || [];

useEffect(() => {
  dispatch(fetchBlogs());
}, [dispatch]);

const recent = Array.isArray(blogsdata) ? blogsdata : blogsdata?.blog || [];


console.log(data, 'published')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <article className="lg:col-span-2 mx-auto md:px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {data.title}
        </h1>
        {/* <div className="text-sm text-gray-500">{data?.createdAt.slice(0, 10)}</div> */}
      </header>
      

      <div className="prose prose-gray max-w-none mb-8">
  {data.content && data.images ? (
    <>
      {data.content.map((paragraph, index) => (
        <div key={index}>
          {/* Display image if it exists at this index */}
          {data.images[index] && (
            <div className="mb-8 w-full overflow-hidden rounded-lg">
              <Image
                src={data?.images[index]}
                alt={`Image ${index + 1}`}
                width={400}
                height={400}
                className="rounded-lg object-cover md:h-[400px]  max-w-[100%] mx-auto md:w-full flex"
              />
            </div>
          )}

          {/* Display content paragraph */}
          <p>{paragraph}</p>
        </div>
      ))}

      {/* Display any remaining images if there are more images than content */}
      {data?.images.length > data?.content.length &&
        data?.images.slice(data?.content.length).map((image, index) => (
          <div key={data?.content.length + index} className="mb-8">
            <Image
              src={image}
              alt={`Image ${data?.content.length + index + 1}`}
              width={100}
              height={100}
              className="rounded-lg h-[400px] w-full flex"
            />
          </div>
        ))}
    </>
  ) : (
    <p>Loading...</p> // Fallback UI while data is being fetched
  )}
</div>

      <div className="flex items-center gap-4 mb-12">
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <CiShare2 className="w-4 h-4 mr-2" />
          Share
        </button>
        {/* <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FiMessageCircle className="w-4 h-4 mr-2" />
          Comment
        </button> */}
      </div>

      {/* <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Leave a Reply</h2>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={6}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-primary focus:ring-primary sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Comment
          </button>
        </form>
      </div> */}
    </article>
        {/* Sidebar */}
        <div className="lg:sticky lg:top-8 lg:h-fit space-y-8">
          <div className="p-4 bg-[#ffffff02] rounded-md">
            <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
            {recent.map((post, index) => (
                <div key={index} className="flex gap-4">
                  <Image
                    src={post?.images[0]}
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
  )
}

