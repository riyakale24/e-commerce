import React, { useEffect } from 'react'
import { useState } from 'react';
import { useFilter } from './FilterContext';

interface Product {
    category: string;
}

interface FetchResponse{
    products: Product[];
}
const Sidebar = () => {
    const {searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword, } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "Apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt",
    ]);

    useEffect(()=> {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products")
                const data: FetchResponse = await response.json()
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)))
               setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching the product", error)
            }
        }
        fetchCategories();
    },[])

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    }

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category);
    }

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    }

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword("");
    }

  return (
    <div className='p-5 h-screen bg-white sticky top-0 overflow-y-auto'>
    <h1 className='text-2xl font-bold mb-8 text-primary'>React Store</h1>
    <section className='space-y-6'>
      <div>
        <label htmlFor="search" className='block text-sm font-medium text-gray-700 mb-1'>Search</label>
        <input 
          type='text' 
          id="search"
          value={searchQuery}  
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary' 
          placeholder='Search products...'
        />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-semibold text-gray-800'>Price Range</h2>
        <div className='flex items-center space-x-2'>
          <input 
            type='number' 
            className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-primary focus:border-primary' 
            placeholder='Min'
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <span className='text-gray-500'>to</span>
          <input 
            type='number' 
            className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-primary focus:border-primary'
            placeholder='Max'
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

        {/* Categories section */}
        <div className='space-y-3'>
        <h2 className='text-lg font-semibold text-gray-800'>Categories</h2>
        <div className='space-y-2'>
          {categories.map((category, index) => (
            <label key={index} className='flex items-center space-x-2 cursor-pointer'>
              <input 
                type='radio' 
                name="category" 
                value={category} 
                className='h-4 w-4 text-primary focus:ring-primary border-gray-300'
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category} 
              />
              <span className='text-gray-700'>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

        {/* Keywords section */}
        <div className='space-y-3'>
        <h2 className='text-lg font-semibold text-gray-800'>Popular Keywords</h2>
        <div className='flex flex-wrap gap-2'>
          {keywords.map((kw, index) => (
            <button
              key={index} 
              className={`px-3 py-1 rounded-full text-sm ${
                keyword === kw 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
              onClick={() => handleKeywordClick(kw)}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <button 
        className='w-full py-2 text-white bg-black rounded-md hover:bg-primary/90 transition-colors mt-6'
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </section>
  </div>
  )
};

export default Sidebar;
