import { useEffect, useState } from "react";
import API from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Dashboard() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
    } catch (err) {
      alert("Unauthorized. Please login again.");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {boards.map((board) => (
        <div key={board._id}>
          {board.title}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
