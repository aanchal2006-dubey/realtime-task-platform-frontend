import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BoardPage() {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchLists = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/lists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLists(res.data);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const createList = async () => {
    await axios.post(
      "http://localhost:5000/api/lists",
      { title, boardId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    fetchLists();
  };

  return (
    <div>
      <h2>Board</h2>

      <input
        type="text"
        placeholder="List title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createList}>Create List</button>

      <div>
          {lists.map((list) => (
          <div key={list._id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <h3>{list.title}</h3>

            <TaskSection listId={list._id} token={token} />
          </div>
          ))}
      </div>
    </div>
  );
}

export default BoardPage;
