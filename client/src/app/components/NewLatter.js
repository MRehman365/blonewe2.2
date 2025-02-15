import Image from 'next/image';
import React, { useEffect } from 'react'

import news1 from "../assets/post-01-500x347.jpg";
import news2 from "../assets/post-02-500x347.jpg";
import news3 from "../assets/post-03-500x347.jpg";
import news4 from "../assets/post-04-500x347.jpg";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/store/reducer/blogsReducer';

  
const NewLatter = () => {
  const { blogsdata } = useSelector((state) => state.blogs)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const data = Array.isArray(blogsdata) ? blogsdata : blogsdata?.blog || [];

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
        {data?.map((article) => (
          <Link
          href={`/blog/SingleBlog/${article._id}`}
            key={article._id}
            className=" rounded-lg overflow-hidden"
          >
            <Image
              src={article?.images[0] || "https://i.ibb.co/PZbkQjRb/image-not-found.jpg"}
              alt={article.title}
              height={400}
              width={400}
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
                by {article.store} • {article.createdAt}
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
