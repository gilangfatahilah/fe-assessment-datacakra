import React from "react";
import { Article } from "@/types";

import Card from "../ui/Card";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <Card>
      <img
        src={article.cover_image_url}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="text-muted mb-4">{article.description}</p>
      <p>{article.category}</p>
    </Card>
  );
};

export default ArticleCard;
