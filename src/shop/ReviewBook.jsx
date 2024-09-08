import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ReviewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate(); // To programmatically navigate if needed

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://bookstore-project-ues5.onrender.com/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        // Ensure that the author and genre fields are arrays
        if (typeof data.author === 'string') {
          data.author = data.author.split(',').map(author => author.trim());
        }
        if (typeof data.genre === 'string') {
          data.genre = data.genre.split(',').map(genre => genre.trim());
        }
        setBook(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = [...existingCart, { title: book.title, price: book.price }];
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Book added to cart');
  };

  if (!book) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className='bg-teal-100 min-h-screen pt-28 px-4 lg:px-24 flex justify-between'>
      {/* Left division with image */}
      <div className='lg:w-1/4 h-[400px] flex-shrink-0 sticky top-28 rounded-lg p-4 overflow-hidden'>
        <img src={book.image_url} alt={book.title} className='h-48 w-full object-contain rounded' />
        <button onClick={handleAddToCart} className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
          Add to Cart
        </button>
      </div>

      {/* Right division with text */}
      <div
        className='lg:w-3/4 lg:ml-8 border border-gray-300 rounded-lg p-6 bg-white shadow-md'
        style={{
          maxHeight: 'calc(100vh - 112px)',
          overflowY: 'auto',
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        }}
      >
        {/* Hide scrollbar for WebKit-based browsers */}
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className='mb-8'>
          <h2 className='text-4xl font-bold text-gray-800'>{book.title}</h2>

          <div className='mt-4 text-xl'>
            <p className='font-semibold text-gray-600'>Author:</p>
            <div>
              {book.author.map((author, index) => (
                <React.Fragment key={index}>
                  <Link
                    to="/shop"
                    state={{ searchTerm: author }}  // Pass the author to shop via state
                    className='text-blue-500 hover:underline'
                  >
                    {author}
                  </Link>

                  {index < book.author.length - 1 && ', '}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className='mt-4 text-xl'>
            <p className='font-semibold text-gray-600'>Genre:</p>
            <div>
              {book.genre.map((genre, index) => (
                <React.Fragment key={index}>
                  <Link
                    to="/shop"
                    state={{ filter: genre }}  // Pass the genre to shop via state
                    className='text-blue-500 hover:underline'
                  >
                    {genre}
                  </Link>

                  {index < book.genre.length - 1 && ', '}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className='text-2xl font-semibold text-gray-700 mt-4'>Price: Ks.{book.price}</p>
        </div>
        <div className='text-lg leading-relaxed font-light text-gray-700'>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewBook;
