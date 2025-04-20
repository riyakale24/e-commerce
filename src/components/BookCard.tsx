import React from 'react'
import {Link} from "react-router-dom"

interface BookCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    rating?: number;
}


const BookCard : React.FC<BookCardProps> = ({id, title, image, price, rating}) => {
  return (
    <div className='border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
    <Link to={`/product/${id}`} className='block'>
      <div className='relative pb-[100%] mb-3 overflow-hidden rounded-lg'>
        <img 
          src={image} 
          alt={title} 
          className='absolute w-full h-full object-cover hover:scale-105 transition-transform duration-300'
        />
      </div>
      <h2 className='font-semibold text-gray-800 line-clamp-2 mb-1'>{title}</h2>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold text-primary'>${price.toFixed(2)}</p>
        {rating && (
          <div className='flex items-center bg-accent/10 px-2 py-1 rounded'>
            <span className='text-accent text-sm font-medium'>{rating.toFixed(1)}</span>
            <svg className='w-4 h-4 ml-1 text-accent' fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  </div>
  )
}

export default BookCard;
