import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInFunction = async () => {
    if (!email || !password) {
      toast.error("Enter the Email and Password", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      localStorage.setItem("userId", userId);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Unauthorized: Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  const signUpFunction = async () => {
    if (!email || !password) {
      toast.error("Enter the Email and Password", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-12 rounded-3xl w-100">
        <h2 className="text-4xl font-bold text-center mb-8">Login / Sign Up</h2>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-black rounded-[16px] mb-4 focus:outline-none focus:ring-2 focus:ring-white-500"
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-black rounded-[16px] mb-4 focus:outline-none focus:ring-2 focus:ring-white-500"
        />

        <button
          onClick={signInFunction}
          className="w-full text-white p-2 rounded mt-2"
        >
          Sign In
        </button>

        <button
          onClick={signUpFunction}
          className="w-full text-white p-2 rounded mt-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
