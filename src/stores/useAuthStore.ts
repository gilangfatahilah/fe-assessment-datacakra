import { create } from "zustand"
import { AxiosError } from "axios"

import { axiosInstance } from "@/libs/axios"
import { User } from "@/types"

interface AuthStore {
    user: User | null,
    isCheckingAuth: boolean,
    checkAuth: () => Promise<void>
    setUser: (userData: User | null) => void
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isCheckingAuth: true,
    setUser: (userData) => set(() => ({ user: userData })),
    checkAuth: async () => {
        try {
            const { data } = await axiosInstance.get("/users/me");

            set({ user: data })
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            console.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error !");

            set({ user: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}))