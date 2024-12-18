import { useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { formatDate } from "@/libs/formatter";

import AuthenticatedLayout from "@/layouts/Authenticated";
import CategoryFormDialog from "@/components/form/Category";
import Table, { Column } from "@/components/ui/Table";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

export interface TableColumn {
  name: string;
  publishedAt: string;
  documentId: string;
}

const columns: Column<TableColumn>[] = [
  { header: "Name", accessor: "name" },
  { header: "Published", accessor: "publishedAt" },
];

const App = () => {
  const {
    categories,
    fetchCategories,
    deleteCategory,
    loading,
    pagination,
    setPage,
    reset,
  } = useCategoryStore();

  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<TableColumn>();

  const tableData: TableColumn[] = categories.map((category) => ({
    name: category.name,
    documentId: category.documentId,
    publishedAt: formatDate(category.publishedAt as string),
  }));

  useEffect(() => {
    fetchCategories();

    return () => reset();
  }, [fetchCategories, reset]);

  return (
    <>
      <CategoryFormDialog
        isOpen={openFormDialog}
        onClose={() => {
          setSelectedCategory(undefined);
          setOpenFormDialog(false);
        }}
        defaultValue={selectedCategory}
      />

      <Dialog
        title="Are you sure ?"
        confirmText="Yes"
        loading={loading}
        isOpen={openDeleteDialog}
        setIsOpen={(value) => {
          setSelectedCategory(undefined);
          setOpenDeleteDialog(value);
        }}
        onConfirm={async () => {
          if (selectedCategory)
            await deleteCategory(selectedCategory.documentId);

          setOpenDeleteDialog(false);
          setSelectedCategory(undefined);
        }}
      >
        You want to delete this article ?
      </Dialog>

      <AuthenticatedLayout>
        <h1 className="text-center md:text-start text-2xl font-bold ">
          Manage Category
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque tenetur
          aspernatur corporis.
        </p>

        <div className="flex justify-end mb-4">
          <Button
            size={"sm"}
            className="rounded-md text-sm"
            onClick={() => setOpenFormDialog(true)}
          >
            New category
          </Button>
        </div>

        <Table
          columns={columns}
          data={tableData}
          loading={loading}
          onActionEdit={(row) => {
            setSelectedCategory(row);
            setOpenFormDialog(true);
          }}
          onActionDelete={(row) => {
            setSelectedCategory(row);
            setOpenDeleteDialog(true);
          }}
        />

        <div className="w-full py-2 md:py-4 flex items-center justify-between">
          <p className="text-sm md:text-md text-muted-foreground font-medium md:font-semibold">
            {`Page ${pagination.page} of ${pagination.pageCount}`}
          </p>

          <div className="flex items-center gap-2">
            <Button
              size={"sm"}
              className="text-sm md:text-md rounded-md"
              onClick={() => setPage(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              Previous
            </Button>

            <Button
              size={"sm"}
              className="text-sm md:text-md rounded-md"
              onClick={() => setPage(pagination.page + 1)}
              disabled={pagination.page === pagination.pageCount || loading}
            >
              Next
            </Button>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default App;
