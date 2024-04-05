// import axios from "axios";
// import { useAppContext } from "@/context/ChatBotContext";

// export const useCreateUser = async () => {
//   const { user } = useAppContext(); // Assuming useAppContext is AppContext
// };

// const createUser = async () => {
//   if (!user) {
//     console.error("User details not found");
//     return;
//   }

//   const { email, name: username } = user;

//   try {
//     const response = await axios.post(
//       "http://127.0.0.1:8001/ai/user/",
//       { email, username },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           // Add your cookies or other headers here if needed
//         },
//       }
//     );

//     console.log("User created:", response.data);
//     // Handle response
//   } catch (error) {
//     console.error("Error creating user:", error);
//     // Handle error
//   }
// };

// createUser();
