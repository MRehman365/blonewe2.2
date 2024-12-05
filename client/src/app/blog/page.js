import Image from "next/image";
import Link from "next/link";
import img from '../assets/about-image-2.jpg'

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
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
        {[1,2,3,4].map((index) => (
          <article key={index} className="mt-4">
        
            <Image
              src={img}
              alt="Featured"
              className="my-6 h-[400px] w-full rounded-lg object-cover"
            />
                <span className="text-sm font-medium text-blue-600">TABLET</span>
            <h1 className="mt-2 text-3xl font-bold">
              English Breakfast Tea With Tasty Donut Desserts
            </h1>
            <time className="mt-2 block text-sm text-gray-500">March 7, 2023</time>
            <p className="text-gray-500 leading-relaxed">
            Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesquesem sed convallis ultricies, ante eros laoreet libero, suscipit lorem turpis sit amet lectus. Quisque egestas lorem umauris ultricies, vitae sollicitudin quam facilisis.
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300">
              Read More
            </button>
          </article>
        ))}
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-8 lg:h-fit space-y-8">
          <div className="p-4 bg-[#ffffff02] rounded-md">
            <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex gap-4">
                  <Image
                    src={post.image}
                    alt=""
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <Link
                      href="#"
                      className="font-medium text-gray-500 hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                    <time className="block text-sm text-gray-500">
                      {post.date}
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
