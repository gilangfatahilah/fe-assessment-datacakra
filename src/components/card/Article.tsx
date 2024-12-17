import { HtmlHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/libs/formatter";
import { useAuthStore } from "@/stores/useAuthStore";
import { Article } from "@/types";

import Card from "../ui/Card";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard = ({ article, className }: Props) => {
  const { user } = useAuthStore();

  return (
    <Card className={className}>
      <Link to={user ? `/article/${article.documentId}` : "/login"}>
        <img
          src={
            article.cover_image_url.length
              ? article.cover_image_url
              : "https://fakeimg.pl/600x400?text=No+image"
          }
          alt={article.title}
          className="w-full h-48 object-cover rounded-md"
        />

        <p className="text-sm text-muted-foreground mt-2">
          {formatDate(article.publishedAt as string)}
        </p>

        <h2 className="text-xl font-bold py-2">{article.title}</h2>

        <span className="bg-primary/80 text-primary-foreground text-sm px-2 font-semibold py-[2px] rounded-full">
          {article.category?.name ?? "Unknown"}
        </span>

        <p className="text-muted-foreground py-2 text-sm line-clamp-3">
          {article.description}
        </p>
      </Link>
    </Card>
  );
};

export default ArticleCard;
