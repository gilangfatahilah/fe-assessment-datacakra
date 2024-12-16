import { use, useState } from "react";
import { getArticleList } from "@/actions/article";
import { Article as ArticleType, Category } from "@/types";
import ArticleCard from "@/components/card/Article";
import { getCategoryList } from "@/actions/category";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Search } from "lucide-react";

const articleList = getArticleList();
const categoryList = getCategoryList();

const Article = () => {
  const articles = use(articleList) as ArticleType[];
  const categories = use(categoryList) as Category[];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categorySelectOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const handleSearchCategory = () => {};

  return (
    <section className="container py-24">
      <h1 className="text-center text-4xl md:text-6xl font-bold pb-8 md:pb-16">
        Explore our latest articles
      </h1>

      <div className="w-full flex justify-end items-center gap-2 mb-4">
        <Select
          options={categorySelectOptions}
          value={selectedCategory}
          onOptionSelected={(value) => setSelectedCategory(value as number)}
          placeholder="Select category"
        />

        <Button
          size={"icon"}
          onClick={handleSearchCategory}
          disabled={!selectedCategory}
        >
          <Search />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            className="bg-secondary"
          />
        ))}
      </div>
    </section>
  );
};

export default Article;
