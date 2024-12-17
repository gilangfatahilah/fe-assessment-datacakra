import { create } from "zustand";
import { Comment } from "@/types";
import { axiosInstance } from "@/libs/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CommentState {
    comments: Comment[];
    loading: boolean;
    page: number;
    total: number;
    hasMore: boolean;
    fetchComments: (articleId: number, page?: number) => Promise<void>;
    addComment: ({ data }: { data: { article: number; content: string } }) => Promise<void>;
    reset: () => void;
}

export const useCommentStore = create<CommentState>((set) => ({
    comments: [],
    loading: false,
    page: 1,
    total: 0,
    hasMore: true,

    fetchComments: async (articleId, page = 1) => {
        set({ loading: true });
        try {
            const { data } = await axiosInstance.get("/comments", {
                params: {
                    "filters[article]": articleId,
                    "sort[publishedAt]": "desc",
                    "populate[user]": "*",
                    "pagination[page]": page,
                    "pagination[pageSize]": 10,
                },
            });

            set((state) => ({
                comments: page === 1 ? data.data : [...state.comments, ...data.data],
                page,
                total: data.meta.pagination.total,
                hasMore: data.meta.pagination.page < data.meta.pagination.pageCount,
            }));
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error");
        } finally {
            set({ loading: false });
        }
    },

    addComment: async (newComment) => {
        set({ loading: true });
        try {
            const { data } = await axiosInstance.post("/comments", newComment, { params: { "populate[user]": "*" } });

            set((state) => ({ comments: [data.data, ...state.comments], total: state.total += 1 }));
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error");
        } finally {
            set({ loading: false });
        }
    },

    reset: () => {
        set({ comments: [], loading: false, page: 1, hasMore: true });
    },
}));
