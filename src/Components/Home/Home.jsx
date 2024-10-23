import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { MdDelete as Mdtrash, MdEdit as Mdedit } from "react-icons/md";

const Home = () => {
  const [publications, setPublications] = useState([]);
  const [editingPublication, setEditingPublication] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const userId = localStorage.getItem("userId");
  const [createPostModal, setCreatePostModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/publications/get").then((response) => {
      setPublications(response.data);
    });
  }, []);

  const createPublication = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;

    try {
      const response = await axios.post(
        "http://localhost:8080/publication/create",
        {
          title,
          content,
          author: userId,
        }
      );

      if (response.status === 201) {
        alert("Publication created");
        setPublications([...publications, response.data]);
      } else {
        console.error("Publication creation failed");
      }
    } catch (error) {
      console.error("Error during publication creation:", error);
    }
  };

  const handleCreatePostModal = () => {
    setCreatePostModal(!createPostModal);
  };

  const deletePublication = async (publicationId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this publication?"
      );
      if (!confirmation) return;

      const response = await axios.delete(
        `http://localhost:8080/publication/delete/${publicationId}`
      );

      if (response.status === 200) {
        alert("Publication deleted");
        setPublications(
          publications.filter(
            (publication) => publication._id !== publicationId
          )
        );
      } else {
        console.error("Publication deletion failed");
      }
    } catch (error) {
      console.error("Error during publication deletion:", error);
    }
  };

  const handleEditClick = (publication) => {
    setEditingPublication(publication._id);
    setEditTitle(publication.title);
    setEditContent(publication.content);
  };

  const updatePublication = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/publication/update/${editingPublication}`,
        {
          title: editTitle,
          content: editContent,
        }
      );

      if (response.status === 200) {
        alert("Publication updated");
        setPublications(
          publications.map((publication) =>
            publication._id === editingPublication
              ? { ...publication, title: editTitle, content: editContent }
              : publication
          )
        );
        setEditingPublication(null); // Réinitialiser l'édition après succès
      } else {
        console.error("Publication update failed");
      }
    } catch (error) {
      console.error("Error during publication update:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenu sur votre fil d'actualité</h1>
        <button onClick={handleCreatePostModal}>Créer une publication</button>
        <ul className="publication-list">
          {publications.map((publication) => (
            <li key={publication._id}>
              <div className="publication-author">
                <p>{publication.author.name}</p>
                <Mdtrash onClick={() => deletePublication(publication._id)} />
                <Mdedit onClick={() => handleEditClick(publication)} />
              </div>
              {editingPublication === publication._id ? (
                <form onSubmit={updatePublication}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    required
                  />
                  <button type="submit">Update Publication</button>
                </form>
              ) : (
                <>
                  <h2>{publication.title}</h2>
                  <p>{publication.content}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {createPostModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Créer une publication</h2>
            <form onSubmit={createPublication}>
              <div className="create-publication">
                <input type="text" name="title" placeholder="Title" required />
                <textarea name="content" placeholder="Content" required />
              </div>
              <button type="submit">Créer la publication</button>
            </form>
            <button onClick={handleCreatePostModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
