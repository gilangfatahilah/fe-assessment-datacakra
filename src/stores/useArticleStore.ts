import { create } from 'zustand';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Article } from '@/types';
import { axiosInstance } from '@/libs/axios';

type PaginationMeta = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

type FilterParams = {
    'filters[category]'?: number;
}

type ArticleFormData = {
    title: string;
    description: string;
    category: string;
    cover_image_url?: string;
    documentId?: string
}


interface ArticleStore {
    articles: Article[];
    article: Article | null;
    articleChartData: { data: number[], labels: string[] } | null,
    loading: boolean;
    pagination: PaginationMeta;
    filter: FilterParams;
    fetchArticles: (pageSize?: number, user?: number) => Promise<void>;
    getArticleById: (documentId: string) => Promise<void>;
    getArticleChartData: (userId: number) => Promise<void>;
    createArticle: (prevState: unknown, formData: FormData) => Promise<{ success: boolean }>
    updateArticle: (prevState: unknown, formData: FormData) => Promise<{ success: boolean }>
    deleteArticle: (documentId: string) => Promise<void>
    setPage: (page: number) => void;
    setFilter: (filter: FilterParams) => void;
    reset: () => void;
}


export const useArticleStore = create<ArticleStore>((set, get) => ({
    articles: [],
    article: null,
    articleChartData: null,
    loading: false,
    pagination: {
        page: 1,
        pageSize: 8,
        pageCount: 0,
        total: 0,
    },
    filter: {},

    fetchArticles: async (pageSize, user) => {
        const { pagination, filter } = get();
        set({ loading: true });

        try {
            const response = await axiosInstance.get("/articles", {
                params: {
                    'populate[category]': '*',
                    'pagination[page]': pagination.page,
                    'pagination[pageSize]': pageSize ?? pagination.pageSize,
                    'filters[user]': user,
                    ...filter,
                },
            });

            const { data, meta } = response.data;

            set({
                articles: data,
                pagination: meta.pagination,
            });
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
        } finally {
            set({ loading: false })
        }
    },

    getArticleById: async (documentId) => {
        set({ loading: true })
        try {
            const { data } = await axiosInstance.get(`/articles/${documentId}`, {
                params: {
                    'populate[user]': '*',
                    'populate[category]': '*'
                }
            });

            set({ article: data.data })
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
        } finally {
            set({ loading: false })
        }
    },

    getArticleChartData: async (userId) => {
        set({ loading: true })

        try {
            const { data } = await axiosInstance.get('/articles', {
                params: {
                    'populate[comments]': '*',
                    'filters[user]': userId,
                }
            });

            // Sort by most commented articles and take max 10 data 
            const topArticles = data.data
                .sort((a: Article, b: Article) => b.comments.length - a.comments.length)
                .slice(0, 10);

            set({
                articleChartData: {
                    labels: topArticles.map((article: Article) => article.title),
                    data: topArticles.map((article: Article) => article.comments.length),
                },
            });

        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
        } finally {
            set({ loading: false })
        }
    },

    createArticle: async (prevState, formData) => {
        set({ loading: true });

        const parsedFormData = Object.fromEntries(formData.entries()) as ArticleFormData;

        try {
            const dataToSend = {
                title: parsedFormData.title,
                description: parsedFormData.description,
                category: Number(parsedFormData.category),
                cover_image_url: parsedFormData.cover_image_url
            }

            const { data } = await axiosInstance.post('/articles', { data: dataToSend }, {
                params: {
                    "populate[category]": "*"
                }
            });

            toast.success("Article created successfully")
            set((state) => ({ articles: [data.data, ...state.articles] }));
            return { success: true }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error");
            return { success: false }
        } finally {
            set({ loading: false })
        }
    },

    updateArticle: async (prevState, formData) => {
        set({ loading: true });
        const parsedFormData = Object.fromEntries(formData.entries()) as ArticleFormData;

        try {
            const dataToSend = {
                title: parsedFormData.title,
                description: parsedFormData.description,
                category: Number(parsedFormData.category),
                cover_image_url: parsedFormData.cover_image_url
            }
            const { data } = await axiosInstance.put(`/articles/${parsedFormData.documentId}`, { data: dataToSend }, { params: { 'populate[category]': '*' } });

            toast.success("Article updated successfully")
            set((state) => ({
                articles: state.articles.map((article) =>
                    article.documentId === parsedFormData.documentId ? data.data : article)
            }));

            return { success: true }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
            return { success: false }
        } finally {
            set({ loading: false })
        }
    },

    deleteArticle: async (documentId) => {
        set({ loading: true })

        try {
            const response = await axiosInstance.delete(`/articles/${documentId}`);

            if (response) {
                toast.success("Article deleted successfully")
                set((state) => ({
                    articles: state.articles.filter((article) => article.documentId !== documentId)
                }))
            }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
        } finally {
            set({ loading: false })
        }
    },

    setPage: (page) => {
        set((state) => ({
            pagination: { ...state.pagination, page },
        }));
        get().fetchArticles();
    },

    setFilter: (filter) => {
        set({
            filter,
        });
        get().fetchArticles();
    },

    reset: () => [
        set({
            articles: [],
            article: null,
            loading: false,
            pagination: {
                page: 1,
                pageSize: 8,
                pageCount: 0,
                total: 0,
            },
            filter: {},
        })
    ]
}));
