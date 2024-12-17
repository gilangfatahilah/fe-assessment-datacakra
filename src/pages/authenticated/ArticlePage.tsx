import React, { useEffect, useState } from "react";
import Table, { Column } from "@/components/ui/Table";
import AuthenticatedLayout from "@/layouts/Authenticated";
import Button from "@/components/ui/Button";
import ArticleFormDialog from "@/components/form/Article";
import { useArticleStore } from "@/stores/useArticleStore";
import { formatDate } from "@/libs/formatter";
import { useAuthStore } from "@/stores/useAuthStore";
import Dialog from "@/components/ui/Dialog";
import { useNavigate } from "react-router-dom";

export interface TableColumn {
  title: string;
  categoryName: string;
  categoryId: number;
  description: string;
  cover_image_url: string;
  publishedAt: string;
  documentId: string;
}

const columns: Column<TableColumn>[] = [
  { header: "Title", accessor: "title" },
  { header: "Category", accessor: "categoryName" },
  { header: "Published", accessor: "publishedAt" },
];

const App = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    articles,
    fetchArticles,
    deleteArticle,
    loading,
    setPage,
    pagination,
    reset,
  } = useArticleStore();

  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<TableColumn>();

  const tableData: TableColumn[] = articles.map((article) => ({
    title: article.title,
    description: article.description,
    cover_image_url: article.cover_image_url,
    documentId: article.documentId,
    categoryId: article.category?.id,
    categoryName: article.category?.name ?? "Unknown",
    publishedAt: formatDate(article.publishedAt as string),
  }));

  useEffect(() => {
    fetchArticles(10, user?.id);

    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchArticles, reset]);

  return (
    <>
      <ArticleFormDialog
        isOpen={openFormDialog}
        onClose={() => {
          setSelectedArticle(undefined);
          setOpenFormDialog(false);
        }}
        defaultValue={selectedArticle}
      />

      <Dialog
        title="Are you sure ?"
        confirmText="Yes"
        loading={loading}
        isOpen={openDeleteDialog}
        setIsOpen={(value) => {
          setSelectedArticle(undefined);
          setOpenDeleteDialog(value);
        }}
        onConfirm={async () => {
          if (selectedArticle) await deleteArticle(selectedArticle.documentId);

          setOpenDeleteDialog(false);
          setSelectedArticle(undefined);
        }}
      >
        You want to delete this article ?
      </Dialog>

      <AuthenticatedLayout>
        <h1 className="text-center md:text-start text-2xl font-bold ">
          Manage Article
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
            New article
          </Button>
        </div>

        <Table
          columns={columns}
          data={tableData}
          loading={loading}
          onActionView={(row) => navigate(`/article/${row.documentId}`)}
          onActionEdit={(row) => {
            setSelectedArticle(row);
            setOpenFormDialog(true);
          }}
          onActionDelete={(row) => {
            setSelectedArticle(row);
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
