import api_instance from "../../../shared/api/axios.js";

export const authApi = {
    SignInWithGoogle: async (token)=>{
        const response = await api_instance.post('/api/auth/signin', {token});
        return response.data;
    },

    signOut: async () => {
        const response = await apiInstance.get("/api/auth/signout");
        return response.data;
    },
};