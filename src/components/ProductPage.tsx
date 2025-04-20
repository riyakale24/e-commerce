import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


interface Product {
    category: string;
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[];
}

const ProductPage = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(()=>{
        if (id) {
            axios.get<Product>(`https://dummyjson.com/products/${id}`)
            .then((response)=>{
                setProduct(response.data);
            })
            .catch((error)=>{
                console.error(`Error fetching product data: ${error}`);
            });
        }
    }, [id]);

    if(!product){
        return <h1>Loading...</h1>
    }

  return (
    <div className='p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-sm'>
    <button
      onClick={() => navigate(-1)}
      className='mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center'
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to products
    </button>
    
    <div className='flex flex-col md:flex-row gap-8'>
      <div className='md:w-1/2'>
        <div className='sticky top-4'>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className='w-full h-auto rounded-lg object-cover shadow-md'
          />
          <div className='grid grid-cols-4 gap-2 mt-4'>
            {product.images.slice(0,4).map((img, index) => (
              <img 
                key={index}
                src={img}
                alt={`${product.title} ${index + 1}`}
                className='w-full h-20 object-cover rounded border border-gray-200 cursor-pointer hover:border-primary transition-colors'
                onClick={() => {/* You can add image gallery functionality here */}}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className='md:w-1/2'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>{product.title}</h1>
        
        <div className='flex items-center mb-6'>
          <div className='flex items-center bg-primary/10 px-3 py-1 rounded-full'>
            <svg className='w-5 h-5 text-primary mr-1' fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className='text-primary font-medium'>{product.rating}</span>
          </div>
          <span className='ml-4 text-gray-500'>SKU: {product.id}</span>
        </div>
        
        <p className='text-2xl font-bold text-gray-900 mb-6'>${product.price.toFixed(2)}</p>
        
        <p className='text-gray-700 mb-8 leading-relaxed'>{product.description}</p>
        
        <div className='flex space-x-4'>
          <button className='px-6 py-3 bg-black text-white rounded-md hover:bg-primary/90 transition-colors flex-1'>
            Add to Cart
          </button>
          <button className='px-4 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-3'>Product Details</h3>
          <div className='space-y-2'>
            <div className='flex'>
              <span className='text-gray-500 w-24'>Brand</span>
              <span className='text-gray-700'>Generic</span>
            </div>
            <div className='flex'>
              <span className='text-gray-500 w-24'>Category</span>
              <span className='text-gray-700 capitalize'>{product.category || 'N/A'}</span>
            </div>
            <div className='flex'>
              <span className='text-gray-500 w-24'>Stock</span>
              <span className='text-gray-700'>In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default ProductPage
