// store/authStore.js
import { create } from 'zustand';
import AuthService from "../service/authService.js";

const useAuthStore = create((set) => ({
    isAuthenticated: AuthService.isAuthenticated(),
    currentUser: AuthService.getCurrentUser(),
    accessToken: AuthService.getToken(),
    refreshToken: AuthService.getRefreshToken(),
    loading: false,

    setLoading: (isLoading) => set({ loading: isLoading }),
    setLoginState: (newState) => set(newState),

    login: async (credentials) => {
        set({ loading: true });
        try {
            const result = await AuthService.login(credentials);
            const { userName, role, fullName, accessToken, refreshToken, userId } = result;

            const userProfile = {
                userId: userId,
                userName: userName,
                role: role,
                fullName: fullName || null
            };

            set({
                isAuthenticated: true,
                currentUser: userProfile,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } catch (error) {
            console.error("Login failed in useAuthStore:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        AuthService.logout(); // clear localStorage
        set({
            isAuthenticated: false,
            currentUser: null,
            accessToken: null,
            refreshToken: null
        });
        return Promise.resolve(); // ✅ allow redirection
    },

    setCurrentUser: (user) => set({ currentUser: user }),

    setTokens: (newAccessToken, newRefreshToken = null) => {
        AuthService.setAccessToken(newAccessToken);
        if (newRefreshToken) {
            AuthService.setRefreshToken(newRefreshToken);
        }
        set({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken || AuthService.getRefreshToken()
        });
    },

    initializeAuth: () => {
        set({
            isAuthenticated: AuthService.isAuthenticated(),
            currentUser: AuthService.getCurrentUser(),
            accessToken: AuthService.getToken(),
            refreshToken: AuthService.getRefreshToken()
        });
    }
}));

export default useAuthStore;
