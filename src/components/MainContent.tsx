import React, { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'
import { Tally3 } from 'lucide-react';
import axios from "axios";
import BookCard from './BookCard';

const MainContent = () => {
    const { searchQuery, 
        setSearchQuery, 
        selectedCategory, 
        setSelectedCategory, 
        minPrice, 
        setMinPrice, 
        maxPrice, 
        setMaxPrice, 
        keyword,
    setKeyword,
     } = useFilter()

    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = 'https://dummyjson.com/products';
                let params: any = {
                    limit: itemsPerPage,
                    skip: (currentPage - 1) * itemsPerPage
                };

                const searchTerm = searchQuery || keyword;
                
                if (searchTerm) {
                    url = `${url}/search`;
                    params.q = searchTerm;
                }

                const response = await axios.get(url, { params });
                setProducts(response.data.products);
                setTotalProducts(response.data.total || 0);
                
                if (searchTerm && currentPage !== 1) {
                    setCurrentPage(1);
                }
            } catch (error) {
                console.error("Error fetching the data", error);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery, keyword]); // Added searchQuery to dependencies

    const getFilteredProducts = () => {
    
        let filteredProducts = [...products];

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
        }
        if (minPrice != undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
        }
        if (maxPrice != undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
        }

        switch(filter) {
            case 'Price: High to Low': 
                return filteredProducts.sort((a,b) => b.price - a.price);
            case 'Price: Low to High':
                return filteredProducts.sort((a,b) => a.price - b.price);
            case 'Most Popular':
                return filteredProducts.sort((a,b) => b.rating - a.rating); 
            default:
                return filteredProducts;  
        }
    }

    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationButtons = () => {
        const buttons: number[] = [];
        const maxVisibleButtons = 5;
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxVisibleButtons) {
            const half = Math.floor(maxVisibleButtons / 2);
            startPage = Math.max(1, currentPage - half);
            endPage = Math.min(totalPages, currentPage + half);

            if (currentPage <= half + 1) {
                endPage = maxVisibleButtons;
            } else if (currentPage >= totalPages - half) {
                startPage = totalPages - maxVisibleButtons + 1;
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }
        return buttons;
    };

    return (
        <section className='xl:w-[55rem] lg:w-[55rem] xs:w-[20rem] p-5 bg-light rounded-lg'>
    <div className='mb-8'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-dark mb-4 sm:mb-0'>Our Products</h2>
        <div className='relative'>
          <button 
            onClick={() => setDropDownOpen(!dropDownOpen)}
            className='border border-gray-300 px-4 py-2 rounded-full flex items-center bg-white hover:bg-gray-50 transition-colors'
          >
            <Tally3 className="mr-2 text-gray-600"/>
            <span className='text-gray-700'>
              {filter === 'all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </span>
          </button>

          {dropDownOpen && (
            <div className='absolute bg-white border border-gray-200 rounded-lg mt-2 w-full sm:w-48 shadow-lg z-10'>
              <button 
                onClick={() => { setFilter('Price: Low to High'); setDropDownOpen(false); }}
                className='block px-4 py-2 w-full text-left hover:bg-gray-50 text-gray-700'
              >
                Price: Low to High
              </button>
              <button 
                onClick={() => { setFilter('Price: High to Low'); setDropDownOpen(false); }}
                className='block px-4 py-2 w-full text-left hover:bg-gray-50 text-gray-700'
              >
                Price: High to Low
              </button>
              <button 
                onClick={() => { setFilter('Most Popular'); setDropDownOpen(false); }}
                className='block px-4 py-2 w-full text-left hover:bg-gray-50 text-gray-700'
              >
                Most Popular
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <BookCard 
                key={product.id} 
                id={product.id} 
                title={product.title}
                image={product.thumbnail}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
              <button 
                onClick={() => handlePageChange(currentPage-1)}
                disabled={currentPage === 1}
                className='border border-gray-300 px-4 py-2 mx-2 rounded-full bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                Previous
              </button>

              <div className="flex flex-wrap justify-center my-4 sm:my-0">
                {getPaginationButtons().map(page => (
                  <button 
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`border mx-1 w-10 h-10 rounded-full flex items-center justify-center ${
                      page === currentPage 
                        ? "bg-black text-white border-primary" 
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage+1)}
                disabled={currentPage === totalPages}
                className='border border-gray-300 px-4 py-2 mx-2 rounded-full bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="col-span-full text-center py-16">
          <div className='max-w-md mx-auto'>
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setMinPrice(undefined);
                setMaxPrice(undefined);
                setKeyword("");
                setFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        </div>
      )}
    </div>
  </section>
    )
}

export default MainContent