import { MessageCircle, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'

const PopularBlogs = () => {
    const [showAll, setShowAll] = useState(false)
    const blogs = [
        {
            title: "Shop Our Favorite Home Essentials",
            author: "Jordan",
            likes: 142,
            comments: 44,
        },
        {
            title: "5 Ways to Spruce Up Your Spac",
            author: "Amy",
            likes: 81,
            comments: 32,
        },
        {
            title: "How to Shop for Designer Handbags on a Budget",
            author: "Meredith",
            likes: 162,
            comments: 54,
        },
        {
            title: "Best Cyber Monday Deals for 2025: Don't Miss Out",
            author: "Amy",
            likes: 81,
            comments: 32,
        },
        {
            title: "Back-to-School Shopping: Must-Have Items for Students",
            author: "Meredith",
            likes: 162,
            comments: 54,
        }
    ]

    const displayedBlogs = showAll ? blogs : blogs.slice(0, 3)

  return (
    <div className='bg-white p-6 mb-5 mx-5 border w-[23rem] border-gray-200 rounded-lg shadow-sm'>
    <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
      <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      Popular Blogs
    </h2>
    <ul className='space-y-4'>
      {displayedBlogs.map((blog, index) => (
        <li key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
          <div className="flex justify-between items-start">
            <span className='font-bold text-gray-800 hover:text-primary transition-colors cursor-pointer'>
              {blog.title}
            </span>
          </div>
          <span className='text-sm text-gray-500'>By {blog.author}</span>
          <div className='flex items-center mt-2 text-sm'>
            <div className='flex items-center mr-4'>
              <ThumbsUp size={16} className="text-gray-400" />
              <span className='text-gray-500 ml-1'>{blog.likes}</span>
            </div>
            <div className='flex items-center'>
              <MessageCircle size={16} className="text-gray-400" />
              <span className="text-gray-500 ml-1">{blog.comments}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
    {blogs.length > 3 && (
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className='mt-6 w-full py-2 text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors'
                >
                    {showAll ? 'Show Less' : 'View All Blogs'}
                </button>
            )}
  </div>
  )
}

export default PopularBlogs
