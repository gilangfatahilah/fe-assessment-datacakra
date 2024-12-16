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

export type Article = {
    id: number,
    title: string,
    description: string,
    cover_image_url: string,
    category: string,
}