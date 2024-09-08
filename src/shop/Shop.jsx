import React, { useState, useEffect } from 'react';
import { TextInput, Select } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');  // Default to 'all' genres
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 25;
  const location = useLocation();  // Capture location state

  useEffect(() => {
    // Fetch books data once
    fetch("https://bookstore-project-ues5.onrender.com/api/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  useEffect(() => {
    console.log('Location state:', location.state);  // Debugging line

    // Check if state is passed from another component (e.g., ReviewPage)
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }

    if (location.state?.filter) {
      setFilter(location.state.filter);  // Set the genre filter from the state
    }

    window.scrollTo(0, 0);  // Scroll to top when page loads
  }, [location.state]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleAddToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${book.title} has been added to your cart.`);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearchTerm =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      filter === 'all' || book.genre.toLowerCase().includes(filter.toLowerCase());

    return matchesSearchTerm && matchesGenre;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className='text-4xl font-bold text-center mb-8'>All Books</h2>

      <div className="flex justify-between my-12">
        {/* Search Input */}
        <TextInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title or author"
          className="w-full sm:w-2/3"
        />

        {/* Genre Filter Dropdown */}
        <Select
          className="ml-4 w-full sm:w-1/3 lg:w-1/4"
          value={filter}  // Set the dropdown value to current filter
          onChange={handleFilter}
        >
          <option value="all">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
          <option value="mystery">Mystery</option>
          <option value="fantasy">Fantasy</option>
          <option value="comedy">Comedy</option>
          <option value="romance">Romance</option>
          <option value="horror">Horror</option>
          <option value="adventure">Adventure</option>
        </Select>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentBooks.map(book => (
          <div
            key={book.id}
            className="flex flex-col justify-between border-b pb-4 mb-4 h-[450px]"  // Adjusted container height
          >
            <Link to={`/reviewbook/${book.id}`}>
              <img
                src={book.image_url}
                alt={book.title}
                className="w-full h-[250px] object-contain mb-2"  // Ensured image scales and maintains aspect ratio
              />
            </Link>
            <div className="text-center mt-2">
              <h5 className="text-xl font-semibold text-gray-900">
                {book.title}
              </h5>
              <p className="text-sm text-gray-700">{book.author}</p>
            </div>
            <button
              className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => handleAddToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 my-4 py-2 px-4 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Shop;
