import React from "react";

import AuthenticatedLayout from "@/layouts/Authenticated";
import ArticleCard from "@/components/card/Article";

const ArticlePage = () => {
  return (
    <AuthenticatedLayout>
      <h1 className="text-2xl text-center pb-4 font-bold">
        Find your destination
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {articles.map((article) => (
          <ArticleCard article={article} />
        ))} */}
      </div>
    </AuthenticatedLayout>
  );
};

export default ArticlePage;
