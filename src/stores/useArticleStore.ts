import { create } from 'zustand';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Article } from '@/types';
import { axiosInstance } from '@/libs/axios';

interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface FilterParams {
    'filters[category]'?: number;
}

interface ArticleStore {
    articles: Article[];
    article: Article | null;
    loading: boolean;
    pagination: PaginationMeta;
    filter: FilterParams;
    fetchArticles: () => Promise<void>;
    getArticleById: (documentId: string) => Promise<void>;
    setPage: (page: number) => void;
    setFilter: (filter: FilterParams) => void;
}


export const useArticleStore = create<ArticleStore>((set, get) => ({
    articles: [],
    article: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        pageSize: 8,
        pageCount: 0,
        total: 0,
    },
    filter: {},


    fetchArticles: async () => {
        const { pagination, filter } = get();
        set({ loading: true });

        try {
            const response = await axiosInstance.get("/articles", {
                params: {
                    'populate[category]': '*',
                    'pagination[page]': pagination.page,
                    'pagination[pageSize]': pagination.pageSize,
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
}));
