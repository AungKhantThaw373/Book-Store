import React, { useState } from 'react';
import { Textarea } from "flowbite-react";
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Label, Select, TextInput } from "flowbite-react";

const EditBooks = () => {
  const { id } = useParams();
  const data = useLoaderData();

  // Convert `author` and `genre` to arrays if they aren't already
  const [isbn, setIsbn] = useState(data.isbn);
  const [title, setTitle] = useState(data.title);
  const [author, setAuthor] = useState(Array.isArray(data.author) ? data.author : [data.author]);
  const [selectedBookgenre, setSelectedBookgenre] = useState(Array.isArray(data.genre) ? data.genre : [data.genre]);
  const [price, setPrice] = useState(data.price);
  const [imageUrl, setImageUrl] = useState(data.image_url);
  const [description, setDescription] = useState(data.description);

  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction",
    "Fantasy", "Horror", "Biography", "Autobiography", "History",
    "Self-help", "Memoir", "Business", "Children Books", "Adult",
    "Crime", "Travel", "Religion", "Art and Design", "Education"
  ];

  const handleChangeSelectedValue = (event) => {
    setSelectedBookgenre([event.target.value]);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const updateBookObj = {
      isbn,
      title,
      author: Array.isArray(author) ? author : [author], // Ensure it's an array
      genre: selectedBookgenre,
      price,
      image_url: imageUrl,
      description
    };
    console.log(updateBookObj);

    // Update book data
    fetch(`https://bookstore-project-essg.onrender.com/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateBookObj)
    })
      .then(res => res.json())
      .then(data => {
        alert("Book is updated successfully");
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>
      <form onSubmit={handleUpdate} className="flex lg:w-[980px] flex-col flex-wrap gap-4">
        {/* First row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput id="title" name="title" type="text" placeholder="Book Name" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author Name" />
            </div>
            <TextInput id="author" name="author" type="text" placeholder="Author Name" value={author.join(', ')} onChange={e => setAuthor(e.target.value.split(',').map(item => item.trim()))} required />
          </div>
        </div>
        {/* Second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="image_url" value="Book Image URL" />
            </div>
            <TextInput id="image_url" name="image_url" type="text" placeholder="Book Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Genre" />
            </div>
            <Select id="inputState" name="genreName" className="w-full rounded" value={selectedBookgenre[0]} onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/* Third row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="isbn" value="Book ISBN" />
            </div>
            <TextInput id="isbn" name="isbn" type="text" placeholder="ISBN Number" value={isbn} onChange={e => setIsbn(e.target.value)} required />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price" />
            </div>
            <TextInput id="price" name="price" type="number" placeholder="Book Price" value={price} onChange={e => setPrice(e.target.value)} required />
          </div>
        </div>
        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Book Description" />
          </div>
          <Textarea id="description" name="description" placeholder="Describe your book..." className="w-full" value={description} onChange={e => setDescription(e.target.value)} required rows={6} />
        </div>
        <Button type="submit" className="mt-5">Edit Book</Button>
      </form>
    </div>
  );
};

export default EditBooks;
