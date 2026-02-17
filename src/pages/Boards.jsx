import { useEffect, useState } from "react";
import axios from "axios";

function Boards() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchBoards = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/boards",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBoards(res.data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const createBoard = async () => {
    await axios.post(
      "http://localhost:5000/api/boards",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    fetchBoards();
  };

  return (
    <div>
      <h2>Boards</h2>

      <input
        type="text"
        placeholder="Board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createBoard}>Create Board</button>

      <ul>
         {boards.map((board) => (
         <li key={board._id}>
             <a href={`/board/${board._id}`}>{board.title}</a>
         </li>
         ))}
      </ul>

    </div>
  );
}

export default Boards;
