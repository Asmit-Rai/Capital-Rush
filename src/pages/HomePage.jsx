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
      const response = await axios.get("http://localhost:5000/getAllPosts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
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
    localStorage.removeItem("userId"); // Remove user session
    setIsAuthenticated(false); // Update state
    navigate("/"); // Redirect to home
    window.location.reload(); // Refresh page
  };

  return (
    <div className="flex flex-col h-screen bg-black p-4">
      <div className="flex justify-end gap-4">
        {isAuthenticated ? (
          <>
            <button onClick={handleAuthAction} >
              Dashboard
            </button>
            <button onClick={handleLogout} >
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleAuthAction}>
            Login
          </button>
        )}
      </div>

      <h1 className="text-2xl text-white font-bold text-center my-4">Welcome to the Home Page!</h1>

      <div className="flex flex-1 flex-col justify-center items-center overflow-y-auto bg-black p-4 rounded-[18px] no-scrollbar">
        <div className="flex-1 w-[50%] justify-center overflow-y-auto bg-black p-4 rounded-lg shadow-md">
          {posts.map((post) => (
            <div key={post.id} className="p-4 mb-4 text-left bg-white rounded-lg">
              <h2 className="text-3xl font-bold text-center">{post.title}</h2>
              <p className="text-center">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
