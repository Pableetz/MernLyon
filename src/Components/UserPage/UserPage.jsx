import React from "react";

const UserPage = () => {
  const [publicationByUserId, setPublicationByUserId] = useState([]);
  const userId = localStorage.getItem("userId");

  const getPublicationByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/publications/get/${userId}`
      );

      if (response.status === 200) {
        setPublicationByUserId(response.data);
      } else {
        console.error("Error getting publications by user id");
      }
    } catch (error) {
      console.error("Error getting publications by user id:", error);
    }
  };

  return <div></div>;
};

export default UserPage;
