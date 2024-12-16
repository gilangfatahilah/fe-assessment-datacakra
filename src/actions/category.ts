import { axiosInstance } from "@/libs/axios"
import { Category } from "@/types"
import { AxiosError } from "axios"

export const getCategoryList = async (): Promise<Category[] | null> => {
    try {
        const { data } = await axiosInstance.get('/categories')

        return data.data;
    } catch (error) {
        const isAxiosError = error instanceof AxiosError

        console.log(isAxiosError ? error.message : "Internal Server Error !")
        return null
    }
}