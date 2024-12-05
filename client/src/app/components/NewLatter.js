import Image from 'next/image';
import React from 'react'

import news1 from "../assets/post-01-500x347.jpg";
import news2 from "../assets/post-02-500x347.jpg";
import news3 from "../assets/post-03-500x347.jpg";
import news4 from "../assets/post-04-500x347.jpg";
import Link from 'next/link';

const newsArticles = [
    {
      id: 1,
      category: "Tablet",
      title: "English Breakfast Tea With Tasty Donut Desserts",
      author: "sinan",
      date: "7 Mar 2023",
      image: news1,
    },
    {
      id: 2,
      category: "Smartphone",
      title: "The Problem With Typefaces on the Web",
      author: "sinan",
      date: "7 Mar 2023",
      image: news2,
    },
    {
      id: 3,
      category: "Tablet",
      title: "But I must explain to you how all this mistaken idea",
      author: "sinan",
      date: "7 Mar 2023",
      image: news3,
    },
    {
      id: 4,
      category: "Smartphone",
      title: "On the other hand we provide denounce with righteous",
      author: "sinan",
      date: "6 Mar 2023",
      image: news4,
    },
  ];
  
const NewLatter = () => {
  return (
    <div className='overflow-hidden'>
      <section className="p-2 max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-lg">Our News</h2>
        <Link href="/blog" className=" hover:text-blue-500">
          View All 
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsArticles.map((article) => (
          <Link
          href='/blog/SingleBlog'
            key={article.id}
            className=" rounded-lg overflow-hidden"
          >
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-blue-600 font-medium uppercase">
                {article.category}
              </p>
              <h3 className="text-base font-semibold mt-2 mb-3">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500">
                by {article.author} • {article.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </div>
  )
}

export default NewLatter
