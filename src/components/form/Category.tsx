import { useActionState, useEffect } from "react";
import { useCategoryStore } from "@/stores/useCategoryStore";

import { TableColumn as CategoryRow } from "@/pages/authenticated/CategoryPage";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: CategoryRow;
};

const CategoryFormDialog = ({ isOpen, onClose, defaultValue }: Props) => {
  const { createCategory, updateCategory } = useCategoryStore();
  const [state, action, isPending] = useActionState(
    defaultValue ? updateCategory : createCategory,
    undefined
  );

  useEffect(() => {
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
            {defaultValue ? "Edit Category" : "New Category"}
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
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>

            <Input
              defaultValue={defaultValue?.name}
              type="text"
              id="name"
              name="name"
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

export default CategoryFormDialog;
