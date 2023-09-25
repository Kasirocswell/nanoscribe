import { useState, useRef } from "react";
import supabase from "@/app/supabase";

const prohibitedWords = ["badword1", "badword2"];

const isNameValid = async (name, column) => {
  const { data } = await supabase.from("users").select(column).eq(column, name);

  if (data.length > 0) return false; // Name/Username already exists

  for (let word of prohibitedWords) {
    if (name.includes(word)) return false; // Contains a prohibited word
  }

  return true;
};

const ProfileCompletionModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameRef = useRef();
  const usernameRef = useRef();
  const bioRef = useRef();
  const websiteRef = useRef();
  const locationRef = useRef();
  const birthdateRef = useRef();
  const fileInputRef = useRef();

  const uploadProfilePicture = async () => {
    const file = fileInputRef.current.files[0];
    const filePath = `profiles/${supabase.auth.user().id}/${file.name}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    if (error) {
      throw error;
    }
    return filePath;
  };

  const handleCompleteProfile = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const name = nameRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const bio = bioRef.current.value.trim();
    const website = websiteRef.current.value.trim();
    const location = locationRef.current.value.trim();
    const birthdate = birthdateRef.current.value;

    // Validation
    if (!name || !username || bio.length > 200) {
      setErrorMessage(
        "Please fill all fields correctly. Bio should be under 200 characters."
      );
      setIsLoading(false);
      return;
    }

    const isUsernameValidFlag = await isNameValid(username, "username");
    const isNameValidFlag = await isNameValid(name, "name");

    if (!isUsernameValidFlag || !isNameValidFlag) {
      setErrorMessage("Invalid Name or Username.");
      setIsLoading(false);
      return;
    }

    let profilePicPath;
    if (fileInputRef.current.files.length > 0) {
      try {
        profilePicPath = await uploadProfilePicture();
      } catch (error) {
        setErrorMessage("Error uploading profile picture.");
        setIsLoading(false);
        return;
      }
    }

    const profileData = {
      name,
      username,
      bio,
      website,
      location,
      birthdate,
      pfp: profilePicPath,
    };

    const { error } = await supabase
      .from("users")
      .update(profileData)
      .eq("id", supabase.auth.user().id);
    if (error) {
      setErrorMessage("Error updating profile.");
    } else {
      onClose();
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center">
      <div className="bg-black border p-8 w-96 rounded relative">
        <div className="ml-[35%] text-center mb-6">
          <h2 className="w-[400px] ml-[-75%] text-center font-bold text-xl mb-4 text-white">
            Complete Your Profile
          </h2>
        </div>

        <input
          ref={nameRef}
          placeholder="Name"
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <input
          ref={usernameRef}
          placeholder="Username"
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <textarea
          ref={bioRef}
          maxLength={200}
          placeholder="Bio"
          className="mb-2 p-2 border rounded w-full text-black"
        ></textarea>
        <input
          ref={websiteRef}
          placeholder="Website"
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <input
          ref={locationRef}
          placeholder="Location"
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <input
          ref={birthdateRef}
          type="date"
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="mb-4 p-2 border rounded w-full text-black bg-white"
        />

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}

        <button
          onClick={handleCompleteProfile}
          disabled={isLoading}
          className="mb-2 bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "Saving..." : "Complete Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
