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
    const response = await axios.get(
      `https://battle-rush-backend.vercel.app/getPost/${userId}`
    );
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
    await axios.post("https://battle-rush-backend.vercel.app/createPost", {
      title,
      description,
      userId,
    });
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
    await axios.delete(
      `https://battle-rush-backend.vercel.app/deletePost/${id}/${userId}`
    );
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

    await axios.put(
      `https://battle-rush-backend.vercel.app/editPost/${id}/${userId}`,
      { title: newTitle, description: newDescription }
    );
    getPosts();
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center p-8 overflow-hidden">
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
         <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between h-full">
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
          className="w-full h-[30vh] sm:h-[40vh] p-2 mb-3 border border-black rounded-[18px] focus:outline-none focus:ring-2 focus:ring-black resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="w-ful"
          onClick={createPost}
        >
          Create Post
        </button>
      </div>
        <div className="bg-black rounded-3xl p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[80vh] md:max-h-screen">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 sm:p-6 mb-4 sm:mb-6 rounded-[18px] flex flex-col sm:flex-row justify-between"
            >
              <div className="flex flex-col gap-2 sm:gap-5 mb-4 sm:mb-0">
                <button
                  onClick={() => deletePost(post.id)}
                >
               
                  Delete
                </button>
                <button
                  onClick={() => editPost(post.id)}
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-col w-full sm:w-[80%]">
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
