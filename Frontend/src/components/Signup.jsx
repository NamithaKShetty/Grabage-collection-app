import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Login from "./Login";
import googleLogo from '../assets/google-logo.png'; // Make sure the path to your logo is correct

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfm5WleMGVHqAXrgxMhnV_wB11W6m4Rv4",
  authDomain: "nokasa-cec0e.firebaseapp.com",
  projectId: "nokasa-cec0e",
  storageBucket: "nokasa-cec0e",
  messagingSenderId: "807726036968",
  appId: "1:807726036968:web:73cc145cf111bb3084965d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signup() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      toast.success("Signup with Google Successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Google Signup Failed: " + error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Signup</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-full px-3 py-2 border rounded-md"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <button
              style={{ backgroundColor: "#006600" }}
              className="w-full text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
            >
              Signup
            </button>
            <div className="flex justify-center items-center my-4">
              <span className="text-gray-500">or</span>
            </div>
            <button
              onClick={handleGoogleSignup}
              type="button"
              className="w-full bg-white text-gray-700 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200 mb-4 flex items-center justify-center"
            >
              <img src={googleLogo} alt="Google logo" className="w-6 h-6 mr-2" />
              Signup with Google
            </button>
            <p className="text-xl">
              Have an account?{" "}
              <button
                className="underline text-blue-500 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>{" "}
              <Login />
            </p>
          </form>
        </div>
      </div>
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </>
  );
}

export default Signup;
