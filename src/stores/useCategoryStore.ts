import { axiosInstance } from "@/libs/axios";
import { Category } from "@/types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type PaginationMeta = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

type CategoryFormData = {
    name: string
    documentId: string
}

interface CategoryStore {
    categories: Category[];
    loading: boolean;
    pagination: PaginationMeta;
    fetchCategories: (withoutPaginate?: boolean) => Promise<void>;
    createCategory: (prevState: unknown, formData: FormData) => Promise<{ success: boolean }>;
    updateCategory: (prevState: unknown, formData: FormData) => Promise<{ success: boolean }>;
    deleteCategory: (documentId: string) => Promise<void>;
    setPage: (page: number) => void;
    reset: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    loading: false,
    pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0,
    },

    fetchCategories: async (withoutPaginate) => {
        const { pagination } = get();
        set({ loading: true });

        try {
            const { data } = await axiosInstance.get("/categories", {
                params: withoutPaginate ? {} : {
                    'pagination[page]': pagination.page,
                    'pagination[pageSize]': pagination.pageSize,
                }
            });

            const { data: categoryData, meta } = data;

            set({ categories: categoryData, pagination: meta.pagination })
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
        } finally {
            set({ loading: false })
        }
    },

    createCategory: async (prevState, formData) => {
        set({ loading: false });
        const parsedFormData = Object.fromEntries(formData.entries()) as CategoryFormData;

        try {
            const { data } = await axiosInstance.post('/categories', { data: { name: parsedFormData.name } });

            toast.success("Category created successfully");
            set((state) => ({ categories: [data.data, ...state.categories] }))
            return { success: true }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
            return { success: false }
        } finally {
            set({ loading: false })
        }
    },

    updateCategory: async (prevState, formData) => {
        set({ loading: false });
        const parsedFormData = Object.fromEntries(formData.entries()) as CategoryFormData;

        try {
            const { data } = await axiosInstance.put(`/categories/${parsedFormData.documentId}`, { data: { name: parsedFormData.name } });

            toast.success("Category updated successfully");
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.documentId === parsedFormData.documentId ? data.data : category)
            }))
            return { success: true }
        } catch (error) {
            const isAxiosError = error instanceof AxiosError;
            toast.error(isAxiosError ? (error.response?.data.message ?? error.message) : "Internal server error")
            return { success: false }
        } finally {
            set({ loading: false })
        }
    },

    deleteCategory: async (documentId) => {
        set({ loading: true });

        try {
            const response = await axiosInstance.delete(`/categories/${documentId}`);

            if (response) {
                toast.success("Category deleted successfully")
                set((state) => ({ categories: state.categories.filter((category) => category.documentId !== documentId) }))
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
        get().fetchCategories();
    },

    reset: () => set({ categories: [], loading: false })
}))