// hooks/useUser.js

import axios from 'axios';

export async function useUser(id : string) {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/get-user", { id });
        return response.data.data.user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Rethrow the error to handle it in the component
    }
}
