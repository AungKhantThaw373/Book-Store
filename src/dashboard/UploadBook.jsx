import React, { useState, useContext } from 'react';
import { Textarea } from "flowbite-react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { UserContext } from '../contects/UserContext';

const UploadBook = () => {
  const { user } = useContext(UserContext);
  console.log(user?.username);
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Adult",
    "Crime",
    "Travel",
    "Religion",
    "Art and Design",
    "Education"
  ];

  const [selectedBookgenre, setSelectedBookgenre] = useState([bookCategories[0]]); // Initialize as an array

  const handleChangeSelectedValue = (event) => {
    setSelectedBookgenre([event.target.value]); // Wrap value in an array
  }

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const isbn = form.isbn.value;
    const title = form.title.value;
    const author = [form.author.value]; // Wrap in an array
    const genre = selectedBookgenre; // Already an array
    const price = form.price.value;
    const image_url = form.image_url.value;
    const description = form.description.value;
    const username = user?.username;

    const bookObj = {
      isbn,
      title,
      author,
      genre,
      price,
      image_url,
      description,
      username
    };
    console.log(bookObj);

    fetch("https://bookstore-project-ues5.onrender.com/api/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      alert("Book uploaded successfully");
    }).catch(error => {
      console.error('Error:', error);
      alert('Failed to upload book.');
    });
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload a Book</h2>
      <form onSubmit={handleBookSubmit} className="flex lg:w-[980px] flex-col flex-wrap gap-4">
        {/* First row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput id="title" name='title' type="text" placeholder="Book Name" required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author Name" />
            </div>
            <TextInput id="author" name='author' type="text" placeholder="Author Name" required />
          </div>
        </div>
        {/* Second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="image_url" value="Book Image URL" />
            </div>
            <TextInput id="image_url" name='image_url' type="text" placeholder="Book Image URL" required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Genre" />
            </div>
            <Select id="inputState" name='genreName' className='w-full rounded' value={selectedBookgenre[0]} onChange={handleChangeSelectedValue}>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>
        </div>
        {/* Third row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="isbn" value="Book ISBN" />
            </div>
            <TextInput id="isbn" name='isbn' type="text" placeholder="ISBN Number" required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price" />
            </div>
            <TextInput id="price" name='price' type="number" placeholder="Book Price" required />
          </div>
        </div>
        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Book Description" />
          </div>
          <Textarea id="description" name='description' placeholder="Describe your book..." className='w-full' required rows={6} />
        </div>
        <Button type="submit" className='mt-5'>Upload Book</Button>
      </form>
    </div>
  )
}

export default UploadBook;
