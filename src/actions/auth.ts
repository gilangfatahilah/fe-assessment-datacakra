import { AxiosError } from "axios";
import cookies from "js-cookie"
import { axiosInstance } from "@/libs/axios";

type UserRegisterFormData = {
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}

type UserLoginFormData = {
    identifier: string,
    password: string,
}

export async function register(previousState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as UserRegisterFormData;

    try {
        const { password_confirmation, ...restData } = data;

        if (data.password !== password_confirmation) {
            return {
                data,
                error: "password doesn't match !",
            }
        }

        const response = await axiosInstance.post("/auth/local/register", restData);

        if (response.data) {
            cookies.set('jwt_token', response.data.jwt, { expires: 3 })
            cookies.set('user', JSON.stringify(response.data.user), { expires: 3 })

            return {
                data,
                success: true,
                response: response.data,
                error: null,
            }
        }

    } catch (error) {
        const isAxiosError = error instanceof AxiosError;

        return {
            data,
            error: isAxiosError ? error.response?.data.error.message : "Internal server error !",
        }
    }
}

export async function login(previousState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as UserLoginFormData;

    try {
        const response = await axiosInstance.post("/auth/local", data);

        if (response.data) {
            cookies.set('jwt_token', response.data.jwt, { expires: 3 })

            return {
                data,
                success: true,
                response: response.data,
                error: null,
            }
        }

    } catch (error) {
        const isAxiosError = error instanceof AxiosError;

        return {
            data,
            error: isAxiosError ? error.response?.data.error.message : "Internal server error !",
        }
    }
}