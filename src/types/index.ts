export type User = {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    locale: string | null;
}

type Comment = {
    id: number;
    documentId: string;
    content: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    locale: string | null;
}

export type Category = {
    id: number;
    documentId: string;
    name: string;
    description: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    locale: string | null;
}

export type Article = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    locale: string | null;
    category: Category;
    comments: Comment[];
    localizations: string[];
}