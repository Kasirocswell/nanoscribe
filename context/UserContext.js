// // context/UserContext.js
// import { createContext, useContext, useState, useEffect } from "react";
// import supabase from "../app/supabase";

// const UserContext = createContext();

// export function useUser() {
//   return useContext(UserContext);
// }

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check for an active user session on mount
//     const sessionUser = supabase.auth.user();
//     if (sessionUser) setUser(sessionUser);

//     // Set up a session listener to handle user state changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (event === "SIGNED_IN") {
//           setUser(session.user);
//         } else if (event === "SIGNED_OUT") {
//           setUser(null);
//         }
//       }
//     );

//     // Cleanup listener on unmount
//     return () => {
//       listener?.unsubscribe();
//     };
//   }, []);

//   const value = {
//     user,
//     setUser,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }
