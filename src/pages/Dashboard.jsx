import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  const getPosts = async () => {
      const response = await axios.get(`http://localhost:5000/getPost/${userId}`);
      setPosts(response.data);
  };

  const createPost = async () => {
    if (!title || !description) {
      toast.error("Title and Description are required!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    const loadingToast = toast.loading("Adding post...");
      await axios.post("http://localhost:5000/createPost", { title, description, userId });
      toast.update(loadingToast, {
        render: "Post Added",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      getPosts();
  };

  const deletePost = async (id) => {
    const loadingToast = toast.loading("Deleting post...");
      await axios.delete(`http://localhost:5000/deletePost/${id}/${userId}`);
      toast.update(loadingToast, {
        render: "Post Deleted",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      getPosts();
    };
  

  const editPost = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    
        await axios.put(`http://localhost:5000/editPost/${id}/${userId}`, { title: newTitle, description: newDescription });
        getPosts();
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center p-6">
    <div className="w-full max-w-screen items-center grid grid-cols-[40%_60%] gap-8">
      <div className="bg-white rounded-3xl p-8 h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-3 border border-black rounded-[18px] focus:outline-none focus:ring-2 focus:ring-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full h-[40vh] p-2 mb-3 border border-black rounded-[18px] focus:outline-none focus:ring-2 focus:ring-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={createPost}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </div>
      <div className="bg-black rounded-3xl p-8 h-[80vh] overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-8 mb-6 rounded-[18px] flex justify-between">
            
            <div className="flex flex-col gap-5">
              <button onClick={() => deletePost(post.id)} >
                Delete
              </button>
              <button onClick={() => editPost(post.id)}>
                Edit
              </button>
            </div>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
              <p className="text-black">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
  
    </div>
  </div>
  
  );
}