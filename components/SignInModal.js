import { useState } from "react";
import supabase from "@/app/supabase";
import Link from "next/link";
import Image from "next/image";
import ProfileCompletionModal from "./ProfileCompletionModal";

export default function SignInSignUpModal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileCompletionStep, setProfileCompletionStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      onClose();
    }
  };

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMessage(error.message);
    } else {
      // await supabase.from("users").insert([
      //   {
      //     id: user.id,
      //     email: email,
      //   },
      // ]);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setProfileCompletionStep(1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center">
      <div className="bg-black border p-8 w-96 rounded relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          &times;
        </button>
        <div className="ml-[35%] text-center mb-6">
          <Image src="/node.PNG" alt="NodeScribe Logo" width={80} height={80} />
        </div>

        {!isSignUp ? (
          <>
            <h2 className="ml-[40%] font-bold text-xl mb-4 text-white">
              Login
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-1 p-2 border rounded w-full text-black"
            />
            <Link
              href="/forgot-email"
              className="text-sm text-blue-400 mb-4 block"
            >
              Forgot Email?
            </Link>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-1 p-2 border rounded w-full text-black"
            />
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 mb-4 block"
            >
              Forgot Password?
            </Link>
            <button
              onClick={handleLogin}
              className="mb-2 bg-blue-500 text-white p-2 rounded w-full"
            >
              Login
            </button>
            <button onClick={() => setIsSignUp(true)} className="text-blue-500">
              Need an account? Sign up
            </button>
          </>
        ) : profileCompletionStep === 0 ? (
          <>
            <h2 className="ml-[35%] font-bold text-xl mb-4 text-white">
              Sign Up
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border rounded w-full text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border rounded w-full text-black"
            />
            <button
              onClick={handleSignUp}
              className="mb-2 bg-blue-500 text-white p-2 rounded w-full"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className="text-blue-500"
            >
              Already have an account? Login
            </button>
          </>
        ) : (
          <ProfileCompletionModal onClose={onClose} />
        )}

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
