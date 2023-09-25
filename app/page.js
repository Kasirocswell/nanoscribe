"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import supabase from "./supabase";
import SignInModal from "../components/SignInModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  const handleProfileClick = async () => {
    if (!user) {
      console.log("No user signed in");
      // If the user is not authenticated, show the sign-in/sign-up modal
      setShowModal(true);
    } else {
      // If the user is authenticated, perform other actions, e.g., show a dropdown menu.
      // For this example, let's simply log the user out.
      await supabase.auth.signOut();
      setUser(null); // Update the user state after logout.
      console.log("User Logged In");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>NodeScribe - Home</title>
        <meta
          name="description"
          content="NodeScribe, Let's Build a Better Future"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Left Column */}
        <div className="w-1/4 p-4">
          {/* NodeSage Logo */}
          <div className="mb-4">
            <Image
              src="/node.PNG"
              alt="NodeSage Logo"
              width={200} // Adjust as needed
              height={200} // Adjust as needed
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col text-2xl">
            <Link className="pb-2" href="#">
              Home
            </Link>
            <Link className="pb-2" href="#">
              Explore
            </Link>
            <Link href="#">Notifications</Link>
            {/* ... other links */}
          </nav>

          {/* Profile Picture */}
          <div className="mt-4">
            <img
              src={user?.user_metadata?.avatar_url || "/defaultpfp.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={handleProfileClick}
            />
          </div>

          {showModal && <SignInModal onClose={() => setShowModal(false)} />}
        </div>

        {/* Center Column */}
        <div className="w-1/2 p-4">
          {/* "Home" Text */}
          <h2 className="text-4xl font-bold mb-4">Home</h2>

          {/* Tweet Input Area */}
          <div className="mb-4">
            <textarea
              className="bg-black border-black text-white w-full h-[250px] p-2 rounded border text-xl"
              placeholder="What's happening?"
            ></textarea>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Tweet
            </button>
          </div>

          {/* List of Tweets */}
          <div>
            {/* Each Tweet */}
            <div className="mb-4 border-b pb-2">
              <h4 className="font-bold">Username</h4>
              <p>Tweet content here...</p>
              {/* Icons for reply, retweet, like, share, etc. */}
            </div>
            {/* Repeat the above block for each tweet */}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/4 p-4">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 rounded border"
              placeholder="Search NanoScribe"
            />
          </div>

          {/* Trends Section */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Trends for you</h3>
            <a href="#" className="block mb-2">
              #TrendingTopic1
            </a>
            <a href="#" className="block mb-2">
              #TrendingTopic2
            </a>
            {/* ... more trending topics */}
          </div>

          {/* Who to Follow */}
          <div>
            <h3 className="font-bold mb-2">Who to follow</h3>
            {/* Each Suggestion */}
            <div className="flex items-center mb-2">
              <img
                src="/path_to_suggested_profile.jpg"
                alt="Suggested Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Suggestions</span>
            </div>
            {/* Repeat for more suggestions */}
          </div>
        </div>
      </div>
    </div>
  );
}
