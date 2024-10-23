import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [publications, setPublications] = useState([]);
  const userId = localStorage.getItem("userId");

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

  return (
    <div>
      <p>Welcome sur mon réseau social</p>
      <h1>Publications</h1>
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>
            <p>{publication.author.name}</p>
            <h2>{publication.title}</h2>
            <p>{publication.content}</p>
          </li>
        ))}
      </ul>
      {/* <form onSubmit={createPublication}>
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Content" required />
        <button type="submit">Create publication</button>
      </form> */}
    </div>
  );
};

export default Home;
