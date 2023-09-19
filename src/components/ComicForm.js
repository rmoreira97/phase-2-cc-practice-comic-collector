import React, { useState } from 'react';

function ComicForm({setComics}) {
  const [formData, setFormData] = useState({
    title: '',
    issue: '',
    image_url: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8004/comics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newComic => {
      // Update the comics state to include the new comic
      setComics(prevComics => [...prevComics, newComic]);
    })
    .catch(error => console.error("Error creating comic: ", error));
  };

  return (
    <div> 
    <p>Add Your Own</p>
    <form className="comic-form" onSubmit={handleSubmit}>
      {/* ... (the rest of your code) */}
      <input placeholder="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />

      <input style={{color: "black", backgroundColor: "white"}} placeholder = "Title" name="title" value={formData.title} onChange={handleChange} />
      <input placeholder = "Issue" name="issue" value={formData.issue} onChange={handleChange} />
      <input type="submit" value="Add Comic" />
      {/* ... (the rest of your code) */}
    </form>
    </div>
  )
}


export default ComicForm
