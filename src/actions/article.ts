import { axiosInstance } from "@/libs/axios"
import { Article } from "@/types"
import { AxiosError } from "axios"

export const getArticleList = async (): Promise<Article[] | null> => {
    try {
        const { data } = await axiosInstance.get('/articles', {
            params: {
                'pagination[page]': 1,
                'pagination[pageSize]': 8,
                'populate[category]': '*'
            }
        })

        return data.data;
    } catch (error) {
        const isAxiosError = error instanceof AxiosError

        console.log(isAxiosError ? error.message : "Internal Server Error !")
        return null
    }
}