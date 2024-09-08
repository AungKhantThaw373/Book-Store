import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);
  //HEREEEEEEEEEEEE PUT LINK
  useEffect(() => {
    fetch("https://bookstore-project-ues5.onrender.com/api/books").then(res => res.json()).then(data => {
      console.log(data);
      setBooks(data.slice(0, 6))
    });
  }, [])
  return (
    <div>
      <BookCards books={books} headline="Best Seller Books" />
    </div>
  )
}

export default BestSellerBooks