import cookies from "js-cookie";
import { create } from "zustand";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/libs/axios";
import { User } from "@/types";

type UserRegisterFormData = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type UserLoginFormData = {
    identifier: string;
    password: string;
};

interface AuthStore {
    user: User | null;
    isCheckingAuth: boolean;
    setUser: (userData: User | null) => void;
    checkAuth: () => Promise<void>;
    register: (prevState: unknown, formData: FormData) =>
        Promise<{ data: UserRegisterFormData, success: boolean } | undefined>;
    login: (preState: unknown, formData: FormData) =>
        Promise<{ data: UserLoginFormData, success: boolean } | undefined>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isCheckingAuth: true,

    setUser: (userData) => set(() => ({ user: userData })),

    checkAuth: async () => {
        try {
            const { data } = await axiosInstance.get("/users/me");
            set({ user: data });
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            console.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error!");
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (prevState, formData: FormData) => {
        const data = Object.fromEntries(formData.entries()) as UserRegisterFormData;

        try {
            const { password_confirmation, ...restData } = data;

            if (data.password !== password_confirmation) {
                throw new Error("Passwords don't match!");
            }

            const response = await axiosInstance.post("/auth/local/register", restData);

            if (response.data) {
                cookies.set("jwt_token", response.data.jwt, { expires: 3 });
                set({ user: response.data.user });

                toast.success("Registration successful!");
                return {
                    data,
                    success: true,
                }
            }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.error.message ?? error.message) : "Internal server error!");
            return {
                data,
                success: false
            }
        }
    },

    login: async (prevState, formData: FormData) => {
        const data = Object.fromEntries(formData.entries()) as UserLoginFormData;

        try {
            const response = await axiosInstance.post("/auth/local", data);

            if (response.data) {
                cookies.set("jwt_token", response.data.jwt, { expires: 3 });
                set({ user: response.data.user });

                toast.success("Login successful!");
                return {
                    data,
                    success: true,
                }
            }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.error.message ?? error.message) : "Internal server error!");
            return {
                data,
                success: false,
            }
        }
    },
}));
