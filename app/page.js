import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>NodeScribe - Home</title>
        <meta
          name="description"
          content="NodeScribe, a Let's Build a Better Future"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Left Column */}
        <div className="w-1/4 p-4">
          {/* Profile Summary */}
          <div className="mb-4">
            <Image
              src="/path_to_profile_picture.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full"
              width="25"
              height="25"
            />
            <h3 className="text-xl font-bold">Username</h3>
          </div>

          {/* Navigation Links */}
          <nav>
            <Link href="#" className="block mb-2">
              Home
            </Link>
            <Link href="#" className="block mb-2">
              Explore
            </Link>
            <Link href="#" className="block mb-2">
              Notifications
            </Link>
            {/* ... other links */}
          </nav>
        </div>

        {/* Center Column */}
        <div className="w-1/2 p-4">
          {/* Tweet Input Area */}
          <div className="mb-4">
            <textarea
              className="w-full h-[250px] p-2 rounded border"
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
              placeholder="Search X"
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
              <span>Suggested Username</span>
            </div>
            {/* Repeat for more suggestions */}
          </div>
        </div>
      </div>
    </div>
  );
}
