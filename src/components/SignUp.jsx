import React, { useEffect, useState } from "react";
import InstaLogo from "../Assets/Images/insta-logo.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Alert } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider";
import SignUpLoader from "../Assets/Images/sign-up-loader.svg";

const SignUp = () => {
  const { signUp, googleSignIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    setError("");
    setLoading(true);
    try {
      await googleSignIn();
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setLoading(false);
    }, 4000);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <div className="flex flex-col items-center border border-gray-300 rounded-sm space-y-4  bg-white p-9">
        <Link to="/">
          <img
            className="object-contain w-48 cursor-pointer"
            src={InstaLogo}
            aria-hidden
            alt="InstaLogo"
          />
        </Link>
        <div className="text-center w-72 text-gray-400 text-lg">
          Sign up to see photos and videos from your friends.
        </div>
        <GoogleButton onClick={handleGoogleSignIn} />
        <div className="flex relative">
          <span className="w-20 border-b-2 absolute -left-24 top-3 border-gray-400"></span>{" "}
          OR{" "}
          <span className="w-20 border-b-2 absolute -right-24 top-3 border-gray-400"></span>
        </div>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <form className="flex flex-col space-y-3" onSubmit={handleSignUp}>
          <input
            className="p-3 border border-gray-400 rounded-sm w-72 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-3 border border-gray-400 rounded-sm w-72 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 bg-blue-500 text-white hover:bg-blue-400"
          >
            {loading ? (
              <img
                className="mx-auto w-8"
                src={SignUpLoader}
                alt="Loading..."
              />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="text-center">
          Have an account?{" "}
          <Link to="/">
            <span className="text-blue-500 cursor-pointer hover:text-blue-600 underline">
              Log In{" "}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
