import { useState } from 'react';

function Comic({ comic, setComics }) {
  const [showDetails, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(comic);
  
  const toggleFavorite = () => {
    const updatedComic = { ...comic, favorite: !comic.favorite };
    fetch(`http://localhost:8004/comics/${comic.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedComic)
    })
    .then(response => response.json())
    .then(updatedComic => {
      setComics(prevComics => prevComics.map(c => c.id === comic.id ? updatedComic : c));
    })
    .catch(error => console.error("Error favoriting comic: ", error));
  };

  const handleEdit = (event) => {
    event.stopPropagation(); // Prevent the click event from reaching the parent div
    setEditing(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8004/comics/${comic.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    })
    .then(response => response.json())
    .then(updatedComic => {
      setComics(prevComics => prevComics.map(c => c.id === comic.id ? updatedComic : c));
      setEditing(false);
    })
    .catch(error => console.error("Error updating comic: ", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:8004/comics/${comic.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setComics(prevComics => prevComics.filter(c => c.id !== comic.id));
      } else {
        console.error("Failed to delete comic");
      }
    })
    .catch(error => console.error("Error deleting comic: ", error));
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    handleDelete();
  };


  

  return (
    <div className="comic-item" onClick={() => setShowDetails(!showDetails)}>
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input 
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
          />
          <input 
            name="issue"
            value={editFormData.issue}
            onChange={handleEditChange}
          />
          <input 
            name="image_url"
            value={editFormData.image_url}
            onChange={handleEditChange}
          />
          <button type="submit">Save</button>
          <button onClick={(e) => { e.stopPropagation(); setEditing(false); }}>Cancel</button>
        </form>
      ) : showDetails ? (
        <>
          <h3>{comic.title}</h3>
          <h4>{comic.issue}</h4>
          <button onClick={handleRemove}>Remove</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      ) : (
        <img src={comic.image_url} alt={`Comic Issue: ${comic.title} #${comic.issue}`} />
      )}
    </div>
  );
}

export default Comic;