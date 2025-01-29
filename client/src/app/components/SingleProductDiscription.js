'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { FaStar, FaRegStar, FaRegHeart } from 'react-icons/fa'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import prodcut1 from '../assets/image-1-1-1-450x450.png'
import prodcut2 from '../assets/image-1-10-450x450.png'
import prodcut3 from '../assets/image-1-11-450x450.png'
import prodcut4 from '../assets/image-1-13-450x450.png'
import prodcut5 from '../assets/image-1-14-450x450.png'
import prodcut6 from '../assets/image-1-15-450x450.png'
import prodcut7 from '../assets/image-1-16-450x450.png'
import prodcut8 from '../assets/image-1-17-450x450.png'
import prodcut9 from '../assets/image-1-7-450x450.png'
import prodcut10 from '../assets/image-1-17-450x450.png'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '@/store/reducer/productReducer'

const reviews = [
  {
    id: 1,
    author: 'Sinan',
    date: 'August 3, 2023',
    rating: 4,
    content: 'Sed perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  },
  {
    id: 2,
    author: 'Alex',
    date: 'August 5, 2023',
    rating: 4,
    content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
  },
  {
    id: 3,
    author: 'Sam',
    date: 'August 10, 2023',
    rating: 4,
    content: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.'
  }
]


export default function SingleProductDiscription({handleview, id}) {
  const { singleproduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('reviews');
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);
  const product = Array.isArray(singleproduct)
  ? singleproduct
  : singleproduct?.menu || [];

  console.log(product.description, 'id passed');
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const ratingCounts = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i
    return reviews.filter(review => review.rating === rating).length
  })

  return (
    <div className="w-full max-w-7xl mx-auto p-2">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-8">
          {['description', 'reviews', 'more-products'].map(tab => (
            <button
              key={tab}
              className={`relative h-9 rounded-none md:px-4 font-medium text-sm md:text-base ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'reviews'
                ? `Reviews (${reviews.length})`
                : tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                  <p  className="flex items-center gap-2">
                  {product?.description}
                  </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              {reviews.length} reviews for Huawei Watch GT 2 Pro Titanium 47mm
            </h2>

            {/* Average Rating */}
            <div className="flex items-start gap-2 md:gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-5xl font-bold mb-2">{averageRating.toFixed(2)}</div>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < Math.round(averageRating) ? (
                      <FaStar key={i} className="text-primary h-3 w-3 md:w-5 md:h-5 text-yellow-300" />
                    ) : (
                      <FaRegStar key={i} className="text-muted-foreground h-3 w-3 md:w-5 md:h-5" />
                    )
                  )}
                </div>
                <div className="text-[12px] md:text-sm text-muted-foreground">
                  Average of {reviews.length} reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="flex-1 space-y-2">
                {ratingCounts.map((count, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 text-sm text-right ">{5 - i} <span className='text-yellow-300'>★</span></div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-300 "
                        style={{
                          width: `${(count / reviews.length) * 100}%`
                        }}
                      />
                    </div>
                    <div className="w-8 text-sm">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="flex gap-4 py-3 border-t border-gray-300">
                  <div className="h-[80px] w-[80px] rounded-full overflow-hidden bg-primary text-primary-foreground flex items-center justify-center font-medium text-lg">
                   <Image src={prodcut1} alt="profile" className=' object-cover' />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-muted-foreground">—</span>
                      <span className="text-muted-foreground ">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < review.rating ? (
                          <FaStar key={i} className="text-primary w-3 h-3 text-yellow-300" />
                        ) : (
                          <FaRegStar key={i} className="text-muted-foreground w-3 h-3" />
                        )
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'more-products' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden w-full border border-gray-300 flex flex-col"
              >
                <div
                  className="relative aspect-square"
                  onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                >
                <Link href="/product">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  </Link>
                  {product.discount > 0 && (
                    <div className="absolute left-2 bottom-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}%
                    </div>
                  )}
                  <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100" >
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100" onClick={handleview} >
                      <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <FaRegHeart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</div>
              <div className=" text-lg font-bold bg-green-600 px-1 text-white rounded-md">
                ₹{product.originalPrice.toFixed(2)}
              </div>
          </div>
                  <h3 className="text-sm font-medium mt-2 line-clamp-2">{product.name}</h3>
                      <div className="h-[25px] overflow-hidden relative">
        <div className="absolute flex flex-col gap-2 bottom-0 group-hover:-bottom-7 transform transition-all duration-500">
        <div className="text-[12px] "><span className="text-gray-400">Store:</span> Groci</div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center">
          <FaStar className="text-yellow-300" />
          </div>
          <div className="text-sm text-gray-500">
            {product.rating} ({product.reviews} reviews)
          </div>
        </div>
        </div>
        </div>
                  <button className="mt-auto px-3 py-2 bg-[#004798] text-white text-sm font-medium rounded-md hover:bg-[#004798]/80">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
