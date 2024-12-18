import { useActionState, useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import FileUploader from "../ui/FileUploader";
import { useArticleStore } from "@/stores/useArticleStore";
import { TableColumn as ArticleRow } from "@/pages/authenticated/ArticlePage";
import { useCategoryStore } from "@/stores/useCategoryStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: ArticleRow;
};

const ArticleFormDialog = ({ isOpen, onClose, defaultValue }: Props) => {
  const { createArticle, updateArticle } = useArticleStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [state, action, isPending] = useActionState(
    defaultValue ? updateArticle : createArticle,
    undefined
  );

  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  useEffect(() => {
    fetchCategories(true);

    if (state) {
      onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-background rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            {defaultValue ? "Edit Article" : "New Article"}
          </h1>
          <Button
            variant={"ghost"}
            onClick={() => onClose()}
            className="text-muted-foreground"
          >
            &#x2715;
          </Button>
        </div>

        <form
          action={action}
          className="mt-4 w-full flex flex-col gap-6 items-center"
        >
          <div className="w-full space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>

            <Input
              defaultValue={defaultValue?.title}
              type="text"
              id="title"
              name="title"
            />
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>

            <select
              id="category"
              name="category"
              defaultValue={defaultValue?.categoryId}
              className="w-full appearance-none rounded-md border border-border bg-background py-2 px-4 text-sm text-secondary-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>

            <Textarea
              id="description"
              defaultValue={defaultValue?.description}
              name="description"
              className="text-sm"
            />
          </div>

          <div className="w-full space-y-2">
            <label className="block text-sm font-medium">Cover Image</label>

            <FileUploader
              onUploadSuccess={(url) => {
                setCoverImageUrl(url);
              }}
              formName="cover_image"
              defaultValue={defaultValue?.cover_image_url}
            />

            <input
              type="text"
              defaultValue={defaultValue?.cover_image_url}
              value={coverImageUrl}
              name="cover_image_url"
              className="hidden"
              readOnly
            />

            <input
              type="text"
              className="hidden"
              name="documentId"
              defaultValue={defaultValue?.documentId}
              readOnly
            />
          </div>

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Please wait..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormDialog;
