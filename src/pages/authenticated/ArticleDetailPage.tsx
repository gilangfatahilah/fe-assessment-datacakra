import AuthenticatedLayout from "@/layouts/Authenticated";
import React from "react";
import { useParams } from "react-router-dom";

const ArticleDetailPage = () => {
  const { articleId } = useParams();

  return <AuthenticatedLayout>{articleId}</AuthenticatedLayout>;
};

export default ArticleDetailPage;
