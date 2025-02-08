import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    checkAuth();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get("https://capital-rush-backend.vercel.app/getAllPosts");
      setPosts(response.data);
    } catch (error) {}
  };

  const checkAuth = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate(`/dashboard/${localStorage.getItem("userId")}`);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen bg-black p-4">
      <div className="flex justify-end gap-4">
        {isAuthenticated ? (
          <>
            <button onClick={handleAuthAction} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Dashboard</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
          </>
        ) : (
          <button onClick={handleAuthAction} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Login</button>
        )}
      </div>
      <h1 className="text-2xl text-white font-bold text-center my-4">Welcome to the Capital Rush FAQs!</h1>
      <div className="flex flex-1 flex-col justify-center items-center overflow-y-auto bg-black p-4 rounded-[18px] no-scrollbar w-full max-w-4xl mx-auto">
        <div className="flex-1 w-full sm:w-[75%] md:w-[50%] justify-center overflow-y-auto bg-black p-4 rounded-lg shadow-md">
          {posts.map((post) => (
            <div key={post.id} className="p-4 mb-4 text-left bg-white rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold text-center">{post.title}</h2>
              <p className="text-center text-sm md:text-base">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
