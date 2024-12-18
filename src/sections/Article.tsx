import { useEffect, useState } from "react";
import ArticleCard from "@/components/card/Article";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Search } from "lucide-react";
import { useArticleStore } from "@/stores/useArticleStore";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCategoryStore } from "@/stores/useCategoryStore";

const Article = () => {
  const {
    articles,
    loading,
    pagination,
    fetchArticles,
    setPage,
    setFilter,
    reset,
  } = useArticleStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categorySelectOptions = [
    { label: "All", value: 0 },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];

  useEffect(() => {
    fetchArticles();
    fetchCategories(true);

    return () => reset();
  }, [fetchArticles, reset, fetchCategories]);

  const handleSearchCategory = () => {
    if (Number(selectedCategory) === 0) {
      setFilter({});
    } else {
      setFilter({
        "filters[category]": selectedCategory as number,
      });
    }
  };

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
        {!articles.length && !loading && (
          <p className="col-span-full text-lg font-semibold text-center">
            No result.
          </p>
        )}

        {!loading
          ? articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                className="bg-secondary cursor-pointer"
              />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-[30vh]" />
            ))}
      </div>

      <div className="w-full py-4 flex items-center justify-between">
        <p className="text-md font-semibold">{`Page ${pagination.page} of ${pagination.pageCount}`}</p>

        <div className="flex items-center gap-2">
          <Button
            variant={"secondary"}
            onClick={() => setPage(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>

          <Button
            variant={"secondary"}
            onClick={() => setPage(pagination.page + 1)}
            disabled={pagination.page === pagination.pageCount || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Article;
